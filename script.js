const quizData = [
    {
        question: "What do you start with in Rust when you spawn on the beach?",
        answers: {
            a: "A gun and armor",
            b: "A rock and a torch",
            c: "A full base",
            d: "RedGamer's blessing"
        },
        correct: "b"
    },
    {
        question: "What is RedGamer's favorite time to raid your base?",
        answers: {
            a: "During the day when you're online",
            b: "Never, he's a nice guy",
            c: "3AM when you're sleeping (peak brainrot hours)",
            d: "He doesn't raid, he asks permission first"
        },
        correct: "c"
    },
    {
        question: "What does 'door camping' mean in Rust?",
        answers: {
            a: "Decorating your door with lights",
            b: "Sitting outside someone's door waiting to kill them (RedGamer's specialty)",
            c: "A peaceful camping trip",
            d: "Building a tent by your door"
        },
        correct: "b"
    },
    {
        question: "What is the main resource you need to raid bases in Rust?",
        answers: {
            a: "Friendship and kindness",
            b: "Explosives, sulfur, and pure hatred",
            c: "Magic spells",
            d: "Permission from the server admin"
        },
        correct: "b"
    },
    {
        question: "How does RedGamer typically communicate in proximity chat?",
        answers: {
            a: "Polite conversation and tactical callouts",
            b: "Complete silence",
            c: "Screaming brainrot memes and trash talk",
            d: "Shakespeare quotes"
        },
        correct: "c"
    },
    {
        question: "What happens when you trust someone in Rust?",
        answers: {
            a: "You make a lifelong friend",
            b: "They help you build a beautiful base",
            c: "They inside-raid you and take everything (RedGamer move)",
            d: "You win the game together"
        },
        correct: "c"
    },
    {
        question: "What is a 'naked' in Rust?",
        answers: {
            a: "Someone wearing full metal armor",
            b: "A player with no gear (but somehow still dangerous if it's RedGamer)",
            c: "A friendly NPC",
            d: "A server moderator"
        },
        correct: "b"
    },
    {
        question: "What does 'GG EZ' mean in RedGamer's vocabulary?",
        answers: {
            a: "Good game, that was challenging",
            b: "I respect your skills",
            c: "I just destroyed you and stole everything, cry about it",
            d: "Let's be friends"
        },
        correct: "c"
    },
    {
        question: "What should you do if you see RedGamer on your server?",
        answers: {
            a: "Say hello and invite him to your base",
            b: "Hide your loot, reinforce your base, and prepare for psychological warfare",
            c: "Share your base codes with him",
            d: "Leave all your stuff outside as a gift"
        },
        correct: "b"
    },
    {
        question: "What is RedGamer's philosophy on Rust?",
        answers: {
            a: "Build friendships and communities",
            b: "Help new players learn the game",
            c: "Steal everything, trust nobody, maximum brainrot",
            d: "Play peacefully and avoid conflict"
        },
        correct: "c"
    }
];

let currentQuiz = 0;
let score = 0;
let userName = '';

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

function generateDocumentId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `REDRUST-${timestamp}-${random}`;
}

function startQuiz() {
    userName = prompt("Enter your gamer tag:");
    if (!userName || userName.trim() === '') {
        userName = "Anonymous Chad";
    }
    loadQuiz();
}

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    
    let answersHTML = '';
    for (let letter in currentQuizData.answers) {
        answersHTML += `
            <label class="answer">
                <input type="radio" name="answer" value="${letter}">
                ${letter}: ${currentQuizData.answers[letter]}
            </label>
        `;
    }
    
    quizContainer.innerHTML = `
        <div class="question">Question ${currentQuiz + 1}/${quizData.length}: ${currentQuizData.question}</div>
        <div class="answers">${answersHTML}</div>
    `;
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let selected = undefined;
    
    answers.forEach(answer => {
        if (answer.checked) {
            selected = answer.value;
        }
    });
    
    return selected;
}

function generatePDF(documentId) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Background color
    doc.setFillColor(255, 240, 240);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Red border
    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);
    
    // Title
    doc.setFontSize(28);
    doc.setTextColor(139, 0, 0);
    doc.text("RED + RUST QUIZ", 105, 40, { align: "center"});
    
    doc.setFontSize(20);
    doc.text("CERTIFIED GAMER", 105, 55, { align: "center"});
    
    // Body
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("This certifies that", 105, 80, { align: "center" });
    
    doc.setFontSize(22);
    doc.setTextColor(255, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(userName, 105, 100, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text("has completed the Red + Rust Quiz", 105, 120, { align: "center" });
    doc.text("demonstrating knowledge of Rust gameplay", 105, 130, { align: "center" });
    doc.text("and RedGamer's legendary brainrot tactics", 105, 140, { align: "center" });
    
    // Score
    doc.setFontSize(32);
    doc.setTextColor(255, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(`${score}/${quizData.length}`, 105, 165, { align: "center" });
    
    // Rating
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    let rating = "";
    if (score === quizData.length) {
        rating = "ABSOLUTE CHAD - RedGamer Level Brainrot 🔴";
    } else if (score >= 8) {
        rating = "RAID MASTER - You're Ready to Door Camp 🚪";
    } else if (score >= 6) {
        rating = "DECENT GAMER - Still Learning the Brainrot Ways 🎮";
    } else {
        rating = "BEACH BOB - Keep Grinding, Naked 🏖️";
    }
    doc.text(rating, 105, 185, { align: "center" });
    
    // Document ID
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Document ID: ${documentId}`, 105, 210, { align: "center" });
    
    const date = new Date().toLocaleDateString();
    doc.text(`Issue Date: ${date}`, 105, 220, { align: "center" });
    
    // Footer
    doc.setFontSize(12);
    doc.setTextColor(139, 0, 0);
    doc.text("RedGamer's Rust Hub", 105, 250, { align: "center" });
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("No Loot Is Safe | Peak Brainrot Gaming", 105, 260, { align: "center" });
    
    doc.save(`RedRust_Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
}

submitButton.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        
        currentQuiz++;
        
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            const documentId = generateDocumentId();
            
            let resultMessage = '';
            let resultClass = '';
            
            if (score === quizData.length) {
                resultMessage = "🔴 ABSOLUTE CHAD! You're basically RedGamer's apprentice. Your brainrot level is off the charts!";
                resultClass = 'perfect';
            } else if (score >= 8) {
                resultMessage = "🎮 RAID MASTER! You understand the brainrot. RedGamer would be proud (but still raid you).";
                resultClass = 'good';
            } else if (score >= 6) {
                resultMessage = "⚔️ DECENT GAMER! You know some things, but you'd still get door camped by RedGamer.";
                resultClass = 'okay';
            } else {
                resultMessage = "🏖️ BEACH BOB DETECTED! RedGamer would steal your rock and torch. Time to git gud!";
                resultClass = 'bad';
            }
            
            quizContainer.innerHTML = '';
            submitButton.style.display = 'none';
            resultsContainer.innerHTML = `
                <h2>Quiz Complete, ${userName}!</h2>
                <h3>Final Score: ${score}/${quizData.length}</h3>
                <p class="${resultClass}">${resultMessage}</p>
                <p style="margin-top: 1rem;"><strong>Document ID:</strong> ${documentId}</p>
                <button id="downloadPDF">📄 Download Your Certificate</button>
                <button onclick="location.reload()">🔄 Retake Quiz</button>
            `;
            
            document.getElementById('downloadPDF').addEventListener('click', () => {
                generatePDF(documentId);
            });
        }
    } else {
        alert('Select an answer, you beach bob! 🏖️');
    }
});

startQuiz();
