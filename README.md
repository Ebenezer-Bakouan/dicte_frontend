# Application de Dictée

Une application web moderne pour pratiquer la dictée en français, utilisant la reconnaissance vocale et l'IA pour la correction.

## Fonctionnalités

- Génération de dictées personnalisées
- Reconnaissance vocale en temps réel
- Correction automatique avec IA (Gemini)
- Interface utilisateur moderne et intuitive
- Support multilingue

## Technologies utilisées

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Web Speech API

### Backend
- Django
- Django REST Framework
- Google Gemini AI
- gTTS (Google Text-to-Speech)

## Installation

### Prérequis
- Python 3.8+
- Node.js 18+
- npm ou yarn

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Configuration

1. Créez un fichier `.env` dans le dossier backend avec :
```
GEMINI_API_KEY=votre_clé_api
```

2. Créez un fichier `.env.local` dans le dossier frontend avec :
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Utilisation

1. Lancez le backend et le frontend
2. Accédez à `http://localhost:3000`
3. Commencez une nouvelle dictée
4. Parlez ou écrivez votre réponse
5. Obtenez une correction détaillée

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT 