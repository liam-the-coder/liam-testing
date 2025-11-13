const quizData = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Rome"
        },
        correct: "c"
    },
    {
        question: "What is 2 + 2?",
        answers: {
            a: "3",
            b: "4",
            c: "5",
            d: "22"
        },
        correct: "b"
    },
    {
        question: "What color is the sky?",
        answers: {
            a: "Green",
            b: "Blue",
            c: "Red",
            d: "Yellow"
        },
        correct: "b"
    },
    {
        question: "How many continents are there?",
        answers: {
            a: "5",
            b: "6",
            c: "7",
            d: "8"
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

// Generate unique document ID
function generateDocumentId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `QUIZ-${timestamp}-${random}`;
}

// Start quiz with name prompt
function startQuiz() {
    userName = prompt("Please enter your name:");
    if (!userName || userName.trim() === '') {
        userName = "Anonymous";
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
        <div class="question">${currentQuiz + 1}. ${currentQuizData.question}</div>
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
    
    // Add content to PDF
    doc.setFontSize(22);
    doc.text("Quiz Certificate", 105, 30, { align: "center" });
    
    doc.setFontSize(14);
    doc.text("This certifies that", 105, 60, { align: "center" });
    
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(userName, 105, 80, { align: "center" });
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text(`has completed the quiz with a score of`, 105, 100, { align: "center" });
    
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text(`${score}/${quizData.length}`, 105, 120, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Document ID: ${documentId}`, 105, 150, { align: "center" });
    
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 105, 165, { align: "center" });
    
    // Add border
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);
    
    // Save PDF
    doc.save(`Quiz_Certificate_${userName.replace(/\s+/g, '_')}.pdf`);
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
            
            quizContainer.innerHTML = '';
            submitButton.style.display = 'none';
            resultsContainer.innerHTML = `
                <h2>Congratulations, ${userName}!</h2>
                <h3>You scored ${score}/${quizData.length}</h3>
                <p>${score === quizData.length ? 'Perfect! 🎉' : 
                   score >= quizData.length/2 ? 'Good job! 👍' : 
                   'Keep practicing! 💪'}</p>
                <p><strong>Document ID:</strong> ${documentId}</p>
                <button id="downloadPDF">Download Certificate (PDF)</button>
                <button onclick="location.reload()">Restart Quiz</button>
            `;
            
            // Add event listener for PDF download
            document.getElementById('downloadPDF').addEventListener('click', () => {
                generatePDF(documentId);
            });
        }
    } else {
        alert('Please select an answer!');
    }
});

// Start the quiz
startQuiz();