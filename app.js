// SM-2 Algorithm Implementation
const sm2 = (card, performanceRating) => {
    let { easeFactor, interval, repetitions } = card;
    
    if (performanceRating >= 3) {
        // Correct response
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        
        repetitions += 1;
        easeFactor = Math.max(1.3, easeFactor + (0.1 - (3 - performanceRating) * (0.08 + (3 - performanceRating) * 0.02)));
    } else {
        // Incorrect response
        repetitions = 0;
        interval = 1;
    }
    
    const now = new Date();
    const nextReview = new Date(now);
    nextReview.setDate(now.getDate() + interval);
    
    return {
        ...card,
        easeFactor,
        interval,
        repetitions,
        nextReview: nextReview.toISOString(),
        lastReviewed: now.toISOString()
    };
};

// DOM Elements
const homeScreen = document.getElementById('home-screen');
const studyScreen = document.getElementById('study-screen');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressIndicator = document.getElementById('progress-indicator');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const showAnswerBtn = document.getElementById('show-answer');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const backToHomeBtn = document.getElementById('back-to-home');
const themeToggleBtn = document.getElementById('theme-toggle');

// State
let currentDeck = [];
let currentCardIndex = 0;
let cardsForToday = [];
let currentSpecialty = '';

// Initialize the app
function init() {
    loadDecks();
    setupEventListeners();
    loadTheme();
    updateProgress();
}

// Load decks from data.js
function loadDecks() {
    // This will be populated from your data.js file
    // For now, we'll use sample data
    if (!localStorage.getItem('decks')) {
        // Initialize with sample data if none exists
        const sampleData = {
            medicina: sampleCards.medicina,
            cirugia: sampleCards.cirugia,
            pediatria: sampleCards.pediatria,
            ginecologia: sampleCards.ginecologia,
            atls: sampleCards.atls,
            acls: sampleCards.acls
        };
        localStorage.setItem('decks', JSON.stringify(sampleData));
    }
}

// Set up event listeners
function setupEventListeners() {
    // Specialty buttons
    document.querySelectorAll('.specialty-btn').forEach(btn => {
        btn.addEventListener('click', () => startStudySession(btn.dataset.specialty));
    });
    
    // Show answer button
    showAnswerBtn.addEventListener('click', showAnswer);
    
    // Difficulty buttons
    difficultyButtons.forEach(btn => {
        btn.addEventListener('click', () => rateCard(parseInt(btn.dataset.difficulty)));
    });
    
    // Back to home button
    backToHomeBtn.addEventListener('click', showHomeScreen);

    // Theme toggle button
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Start a study session for a specific specialty
function startStudySession(specialty) {
    currentSpecialty = specialty;
    const decks = JSON.parse(localStorage.getItem('decks') || '{}');
    currentDeck = decks[specialty] || [];
    
    // Filter cards that are due for review
    const now = new Date();
    cardsForToday = currentDeck.filter(card => {
        return !card.nextReview || new Date(card.nextReview) <= now;
    });
    
    if (cardsForToday.length === 0) {
        alert('¡No hay tarjetas para repasar hoy!');
        return;
    }
    
    // Shuffle the deck
    shuffleArray(cardsForToday);
    currentCardIndex = 0;
    
    // Update UI
    updateProgress();
    showStudyScreen();
    showNextCard();
}

// Show the next card in the deck
function showNextCard() {
    if (currentCardIndex >= cardsForToday.length) {
        // Session complete
        showHomeScreen();
        updateProgress();
        return;
    }
    
    const card = cardsForToday[currentCardIndex];
    questionElement.textContent = card.question;
    answerElement.textContent = card.answer;
    answerElement.classList.add('hidden');
    showAnswerBtn.style.display = 'block';
    document.getElementById('difficulty-buttons').classList.add('hidden');
    
    // Update progress indicator
    progressIndicator.textContent = `${currentCardIndex + 1}/${cardsForToday.length}`;
}

// Show the answer to the current card
function showAnswer() {
    answerElement.classList.remove('hidden');
    showAnswerBtn.style.display = 'none';
    document.getElementById('difficulty-buttons').classList.remove('hidden');
}

// Rate the current card and show the next one
function rateCard(rating) {
    const card = cardsForToday[currentCardIndex];
    
    // Update card with SM-2 algorithm
    const updatedCard = sm2(card, rating);
    
    // Save the updated card
    const decks = JSON.parse(localStorage.getItem('decks') || '{}');
    const cardIndex = decks[currentSpecialty].findIndex(c => c.id === card.id);
    if (cardIndex !== -1) {
        decks[currentSpecialty][cardIndex] = updatedCard;
        localStorage.setItem('decks', JSON.stringify(decks));
    }
    
    // Move to the next card
    currentCardIndex++;
    showNextCard();
}

// Show the home screen
function showHomeScreen() {
    homeScreen.classList.remove('hidden');
    studyScreen.classList.add('hidden');
    updateProgress();
}

// Show the study screen
function showStudyScreen() {
    homeScreen.classList.add('hidden');
    studyScreen.classList.remove('hidden');
}

// Update the progress bar and text
function updateProgress() {
    const now = new Date();
    const decks = JSON.parse(localStorage.getItem('decks') || '{}');
    
    // Count total cards and cards due today
    let totalCards = 0;
    let dueCards = 0;
    
    Object.values(decks).forEach(deck => {
        deck.forEach(card => {
            totalCards++;
            if (!card.nextReview || new Date(card.nextReview) <= now) {
                dueCards++;
            }
        });
    });
    
    // Update progress bar
    const progress = totalCards > 0 ? ((totalCards - dueCards) / totalCards) * 100 : 0;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${dueCards} tarjeta${dueCards !== 1 ? 's' : ''} por repasar hoy`;
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Theme handling
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggleBtn.querySelector('i').classList.toggle('fa-sun', isDark);
    themeToggleBtn.querySelector('i').classList.toggle('fa-moon', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Sample data (you'll replace this with your actual data)
const sampleCards = {
    medicina: [
        { id: 'm1', question: '¿Cuál es el tratamiento de primera línea para la hipertensión arterial?', answer: 'Inhibidores de la ECA o ARA II', easeFactor: 2.5, interval: 1, repetitions: 0 },
        { id: 'm2', question: '¿Cuáles son los criterios diagnósticos de DM2?', answer: 'HbA1c ≥6.5% o GPC ≥126 mg/dl en ayunas o G ≥200 mg/dl a las 2h de SOG o síntomas de hiperglucemia más GPC al azar ≥200 mg/dl', easeFactor: 2.5, interval: 1, repetitions: 0 },
    ],
    cirugia: [
        { id: 'c1', question: '¿Cuáles son los signos de alarma de una hemorragia digestiva alta?', answer: 'Hematemesis, melenas, inestabilidad hemodinámica', easeFactor: 2.5, interval: 1, repetitions: 0 },
        { id: 'c2', question: '¿Cuáles son los criterios de manejo quirúrgico en colecistitis aguda?', answer: 'Datos de peritonitis, empiema, gangrena, perforación o empiema vesicular', easeFactor: 2.5, interval: 1, repetitions: 0 },
    ],
    pediatria: [
        { id: 'p1', question: '¿Cuál es la dosis de paracetamol en niños?', answer: '10-15 mg/kg/dosis cada 4-6 horas (máximo 5 dosis en 24h)', easeFactor: 2.5, interval: 1, repetitions: 0 },
        { id: 'p2', question: '¿Cuáles son los signos de deshidratación en niños?', answer: 'Ojeras, mucosas secas, llanto sin lágrimas, fontanela hundida, disminución de la diuresis, letargo', easeFactor: 2.5, interval: 1, repetitions: 0 },
    ],
    ginecologia: [
        { id: 'g1', question: '¿Cuáles son los criterios diagnósticos de síndrome de ovario poliquístico?', answer: 'Al menos 2 de 3: 1) Oligo-ovulación o anovulación, 2) Hiperandrogenismo clínico o bioquímico, 3) Ovarios poliquísticos en ecografía', easeFactor: 2.5, interval: 1, repetitions: 0 },
        { id: 'g2', question: '¿Cuál es el manejo inicial de la preeclampsia severa?', answer: 'Sulfato de magnesio como neuroprotector, control de presión arterial con labetalol o hidralazina, y terminación del embarazo', easeFactor: 2.5, interval: 1, repetitions: 0 },
    ],
    atls: [
        { id: 'a1', question: '¿Cuál es la secuencia ABCDE en el manejo inicial del trauma?', answer: 'A: Vía aérea con control cervical, B: Ventilación, C: Circulación, D: Discapacidad (estado neurológico), E: Exposición/control ambiental', easeFactor: 2.5, interval: 1, repetitions: 0 },
        { id: 'a2', question: '¿Cuáles son los signos de neumotórax a tensión?', answer: 'Hipersonoridad, desviación traqueal, distensión venosa yugular, taquicardia, hipotensión, disminución de ruidos respiratorios', easeFactor: 2.5, interval: 1, repetitions: 0 },
    ],
    acls: [
        { id: 'ac1', question: '¿Cuál es la dosis de adrenalina en una parada cardiorrespiratoria?', answer: '1 mg cada 3-5 minutos (0.01 mg/kg en niños)', easeFactor: 2.5, interval: 1, repetitions: 0 },
        { id: 'ac2', question: '¿Cuál es el ritmo desfibrilable?', answer: 'Fibrilación ventricular (FV) y taquicardia ventricular sin pulso (TVSP)', easeFactor: 2.5, interval: 1, repetitions: 0 },
    ]
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
