import os
import logging
import google.generativeai as genai
from datetime import datetime
from gtts import gTTS
import json
import cloudinary
import cloudinary.uploader
import cloudinary.api
from django.conf import settings

# Configuration du logging
logger = logging.getLogger(__name__)

# Configuration de Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
    api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
    api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
)

def configure_gemini_api():
    """Configure l'API Gemini avec la clé API."""
    try:
        genai.configure(api_key='AIzaSyDyCb6Lp9S-sOlMUMVrhwAHfeAiG6poQGI')
        logger.info("Configuration de l'API Gemini réussie")
    except Exception as e:
        logger.error(f"Erreur lors de la configuration de l'API Gemini : {str(e)}")
        raise

def generate_audio_from_text(text, output_path):
    """
    Génère un fichier audio à partir du texte de la dictée en utilisant gTTS.
    
    Args:
        text (str): Le texte à convertir en audio
        output_path (str): Le chemin complet où sauvegarder le fichier audio
        
    Returns:
        str: L'URL Cloudinary du fichier audio
    """
    try:
        # S'assurer que le répertoire parent existe
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Convertir le texte en audio avec gTTS
        tts = gTTS(text=text, lang='fr', slow=True)
        tts.save(output_path)
        
        logger.info(f"Audio généré localement : {output_path}")
        
        # Upload sur Cloudinary
        cloudinary_response = cloudinary.uploader.upload(
            output_path,
            resource_type="video",
            folder="dictations",
            public_id=os.path.basename(output_path).replace('.mp3', '')
        )
        
        # Supprimer le fichier local
        if os.path.exists(output_path):
            os.remove(output_path)
        
        logger.info(f"Audio uploadé sur Cloudinary : {cloudinary_response['secure_url']}")
        return cloudinary_response['secure_url']
        
    except Exception as e:
        logger.error(f"Erreur lors de la génération de l'audio : {str(e)}")
        raise

def generate_dictation(params):
    """
    Génère une dictée personnalisée en fonction des paramètres fournis.
    
    Args:
        params (dict): Dictionnaire contenant les paramètres de génération
        
    Returns:
        dict: Dictionnaire contenant le texte de la dictée et le chemin du fichier audio
    """
    try:
        # Configuration de l'API Gemini
        configure_gemini_api()
        
        # Extraction des paramètres
        age = params.get('age', '12')
        niveau_scolaire = params.get('niveauScolaire', 'Étudiant')
        objectif = params.get('objectifApprentissage', 'orthographe')
        difficultes = params.get('difficultesSpecifiques', '')
        temps = params.get('tempsDisponible', '10')
        
        # Construction du prompt pour Gemini
        prompt = f"""
        Tu es un professeur de français qui crée des dictées. Réponds UNIQUEMENT avec un objet JSON valide, sans aucun autre texte.

        Crée une dictée avec ces critères :
        - Âge de l'élève : {age} ans
        - Niveau scolaire : {niveau_scolaire}
        - Objectif d'apprentissage : {objectif}
        - Difficultés spécifiques : {difficultes}
        - Durée estimée : {temps} minutes

        Règles pour le texte :
        1. Texte COHÉRENT et NATUREL
        2. AUCUN marqueur de formatage
        3. Phrases longues (>10 mots) répétées 3 fois
        4. Phrases courtes (≤10 mots) répétées 2 fois
        5. Vocabulaire adapté au niveau
        6. Phrases simples et claires

        Format de réponse OBLIGATOIRE (réponds UNIQUEMENT avec ce JSON) :
        {{
            "text": "Le texte de la dictée avec les répétitions. Exemple : 'Le chat dort. Le chat dort. La souris mange du fromage. La souris mange du fromage.'",
            "title": "Titre court et descriptif",
            "difficulty": "facile"
        }}
        """
        
        # Génération de la dictée avec Gemini
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        
        # Validation et parsing de la réponse JSON
        try:
            # Nettoyage de la réponse pour s'assurer qu'elle est un JSON valide
            response_text = response.text.strip()
            if not response_text.startswith('{'):
                response_text = response_text[response_text.find('{'):]
            if not response_text.endswith('}'):
                response_text = response_text[:response_text.rfind('}')+1]
            
            result = json.loads(response_text)
            
            # Validation des champs requis
            required_fields = ['text', 'title', 'difficulty']
            if not all(field in result for field in required_fields):
                raise ValueError("Réponse JSON incomplète")
                
        except json.JSONDecodeError as e:
            logger.error(f"Erreur de parsing JSON : {str(e)}")
            logger.error(f"Réponse brute de Gemini : {response.text}")
            return {"error": "Erreur de génération de la dictée"}
        except Exception as e:
            logger.error(f"Erreur lors du traitement de la réponse : {str(e)}")
            return {"error": str(e)}
        
        # Création du dossier pour les dictées s'il n'existe pas
        dictations_dir = os.path.join(settings.MEDIA_ROOT, 'dictations')
        os.makedirs(dictations_dir, exist_ok=True)
        
        # Sauvegarde du texte dans un fichier JSON
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        json_path = os.path.join(dictations_dir, f'dictation_{timestamp}.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        
        # Génération de l'audio avec le chemin complet
        audio_path = os.path.join(dictations_dir, f'dictation_{timestamp}.mp3')
        audio_url = generate_audio_from_text(result['text'], audio_path)
        
        return {
            'id': 14,  # ID temporaire
            'text': result['text'],
            'audio_url': audio_url,
            'title': result['title'],
            'difficulty': result['difficulty']
        }
        
    except Exception as e:
        logger.error(f"Erreur lors de la génération de la dictée : {str(e)}")
        return {"error": str(e)}

def correct_dictation(user_text: str, dictation_id: int) -> dict:
    """
    Corrige la dictée de l'utilisateur en utilisant Gemini.
    Retourne un dictionnaire contenant la note, les erreurs et la correction.
    """
    try:
        # Log pour déboguer
        logger.info(f"Texte reçu dans correct_dictation : {user_text}")
        logger.info(f"Type du texte : {type(user_text)}")
        logger.info(f"Longueur du texte : {len(user_text)}")
        
        # Récupérer la dictée originale
        from .models import Dictation, DictationAttempt
        try:
            dictation = Dictation.objects.get(id=dictation_id)
        except Dictation.DoesNotExist:
            logger.error(f"Dictée {dictation_id} non trouvée")
            raise
        
        # Vérification STRICTE du texte vide
        if not user_text or not user_text.strip():
            logger.warning("Texte vide détecté")
            result = {
                'score': 0,
                'errors': ['Le texte est vide. Veuillez écrire la dictée.'],
                'correction': dictation.text,
                'total_words': len(dictation.text.split()),
                'error_count': len(dictation.text.split())
            }
            
            # Créer une tentative avec le texte vide
            attempt = DictationAttempt.objects.create(
                dictation=dictation,
                user_text=user_text,
                corrected_text=dictation.text,
                score=0,
                feedback="Le texte est vide. Veuillez écrire la dictée."
            )
            
            return result
        
        # Configuration de l'API Gemini
        configure_gemini_api()
        
        # Construction du prompt pour la correction
        prompt = f"""
        Tu es un professeur de français qui corrige des dictées. Réponds UNIQUEMENT avec un objet JSON valide, sans aucun autre texte.

        Texte original : {dictation.text}
        Texte de l'élève : {user_text}

        Analyse le texte de l'élève et fournis :
        1. Un score sur 100
        2. Une liste des erreurs trouvées
        3. Le texte corrigé

        Format de réponse OBLIGATOIRE (réponds UNIQUEMENT avec ce JSON) :
        {{
            "score": 85,
            "errors": [
                "Erreur 1 : ...",
                "Erreur 2 : ..."
            ],
            "correction": "Le texte corrigé avec les erreurs corrigées"
        }}
        """
        
        # Génération de la correction avec Gemini
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        
        # Validation et parsing de la réponse JSON
        try:
            # Nettoyage de la réponse pour s'assurer qu'elle est un JSON valide
            response_text = response.text.strip()
            if not response_text.startswith('{'):
                response_text = response_text[response_text.find('{'):]
            if not response_text.endswith('}'):
                response_text = response_text[:response_text.rfind('}')+1]
            
            result = json.loads(response_text)
            
            # Validation des champs requis
            required_fields = ['score', 'errors', 'correction']
            if not all(field in result for field in required_fields):
                raise ValueError("Réponse JSON incomplète")
                
        except json.JSONDecodeError as e:
            logger.error(f"Erreur de parsing JSON : {str(e)}")
            logger.error(f"Réponse brute de Gemini : {response.text}")
            return {"error": "Erreur de correction de la dictée"}
        except Exception as e:
            logger.error(f"Erreur lors du traitement de la réponse : {str(e)}")
            return {"error": str(e)}
        
        # Créer une tentative avec la correction
        attempt = DictationAttempt.objects.create(
            dictation=dictation,
            user_text=user_text,
            corrected_text=result['correction'],
            score=result['score'],
            feedback="\n".join(result['errors'])
        )
        
        return {
            'score': result['score'],
            'errors': result['errors'],
            'correction': result['correction'],
            'total_words': len(dictation.text.split()),
            'error_count': len(result['errors'])
        }
        
    except Exception as e:
        logger.error(f"Erreur lors de la correction de la dictée : {str(e)}")
        return {"error": str(e)} 