# 🇮🇳 TravelBharat

**TravelBharat** is a modern tourism and travel platform designed to explore the beauty, culture, food, festivals, destinations, and travel guides of India.

The project provides an easy-to-use interface where users can discover different Indian states and destinations, explore local food and culture, save their favourite places, and get travel assistance through an AI-powered travel assistant.

## ✨ Features

* 🏛️ Explore Indian destinations
* 🗺️ State-wise tourism information
* 🍛 Discover Indian food
* 🎭 Explore Indian culture
* 🎉 Indian festivals
* 📸 Travel gallery
* 🧭 Travel guides
* ❤️ Favourite destinations
* 👤 User registration and login
* 👤 User profile
* 🤖 AI Travel Assistant
* 📱 Responsive design
* 🔐 Authentication system
* 🌐 REST API backend
* 🗄️ MongoDB database

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Other Technologies

* Git
* GitHub
* JWT Authentication
* OpenAI API / AI Integration

## 📁 Project Structure

```text
TravelBharat/
│
├── index.html
├── about.html
├── contact.html
├── culture.html
├── destination.html
├── destinations.html
├── favorites.html
├── festivals.html
├── food.html
├── gallery.html
├── login.html
├── register.html
├── states.html
├── travel-guide.html
├── profile.html
├── guide-details.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   ├── navbar.css
│   ├── footer.css
│   ├── cards.css
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── uploads/
│
├── data/
│   ├── culture.json
│   ├── destinations.json
│   ├── festivals.json
│   ├── food.json
│   ├── travel-guide.json
│   └── guide-details.json
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd TravelBharat
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_api_key
```

## ▶️ Run the Project

Start the backend server:

```bash
node backend/server.js
```

The application will run at:

```text
http://localhost:5000
```

API health check:

```text
http://localhost:5000/api/health
```

## 🔌 API Modules

The backend provides APIs for:

* Authentication
* Favorites
* Destinations
* Culture
* Festivals
* Food
* Gallery
* States
* Travel Guides
* AI Assistant

## 🤖 AI Travel Assistant

TravelBharat includes an AI-powered travel assistant that can help users with:

* Trip planning
* Indian destinations
* Food recommendations
* Culture
* Festivals
* Budget travel
* Transportation
* Packing tips
* Travel safety

The assistant can respond in English, Hindi, and Hinglish.

## 🔐 Security

Sensitive environment variables such as database credentials and API keys are stored in `.env`.

The `.env` file should **never be uploaded to GitHub**.

## 📱 Responsive Design

TravelBharat is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

## 🌱 Future Scope

Future improvements may include:

* Online hotel booking
* Flight and train integration
* Real-time weather information
* Google Maps integration
* Personalized AI itineraries
* Multilingual support
* User reviews and ratings
* Travel community
* Online booking system
* Advanced recommendation system

## 👨‍💻 Developer

**Mohd Sartaj Hashmi**

BCA Student | Frontend Developer

TravelBharat is developed as an internship/project-based tourism platform.

## 📄 License

This project is developed for educational and internship purposes.
