
let timerInterval;

function syncQuestions() {
    db.collection("quizzes").orderBy("createdAt", "asc").onSnapshot((snapshot) => {
        onlineQuestions = [];
        snapshot.forEach((doc) => {
            onlineQuestions.push(doc.data());
        });
        const countSpan = document.getElementById('totalQuestionsCount');
        if(countSpan) countSpan.innerText = onlineQuestions.length;
        console.log("Questions Loaded: ", onlineQuestions.length);
    });
}
// ৩. প্রশ্ন যোগ করা (Admin)
function addQuestion() {
    const qText = document.getElementById('quizQuestion').value;
    const o1 = document.getElementById('opt1').value;
    const o2 = document.getElementById('opt2').value;
    const o3 = document.getElementById('opt3').value;
    const o4 = document.getElementById('opt4').value;
    const correct = parseInt(document.getElementById('correctOpt').value);

    if(!qText || !o1 || !o2 || !o3 || !o4 || !correct) {
        alert("Please fill out all fields completely!");
        return;
    }

    db.collection("quizzes").add({
        q: qText,
        os: [o1, o2, o3, o4],
        a: correct,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Question successfully saved!");
        // ইনপুট ফিল্ড খালি করা
        document.getElementById('quizQuestion').value = "";
        document.getElementById('opt1').value = "";
        document.getElementById('opt2').value = "";
        document.getElementById('opt3').value = "";
        document.getElementById('opt4').value = "";
        document.getElementById('correctOpt').value = "";
    })
    .catch((error) => console.error("Error adding question: ", error));
}

// ৪. প্রশ্ন রেন্ডার করা (Student view)
function loadExamQuestions() {
    const container = document.getElementById('dynamicQuestionsContainer');
    container.innerHTML = "";

    onlineQuestions.forEach((question, index) => {
        let optionsHtml = "";
        if(question.os && Array.isArray(question.os)) {
            question.os.forEach((option, oIndex) => {
                optionsHtml += `<input type="radio" name="question_${index}" value="${oIndex + 1}"> ${option}<br>`;
            });
        }

        container.innerHTML += `
            <div class="quiz-block" style="margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 8px;">
                <p><strong>${index + 1}. ${question.q}</strong></p>
                ${optionsHtml}
            </div>
        `;
    });
}

// ৫. পরীক্ষা শুরু করা
function startExam() {
    if(onlineQuestions.length === 0) { 
        alert("There are no questions in this exam yet!"); 
        return; 
    }

    loadExamQuestions();
    document.getElementById('examStartView').style.display = "none";
    document.getElementById('examActiveView').style.display = "block";
    
    // টাইমার (৩০ মিনিট = ১৮০০ সেকেন্ড)
    startExamTimer(30); 
}

// ৬. টাইমার লজিক
function startExamTimer(durationMinutes) {
    let timeLeft = durationMinutes * 60;
    const timerBox = document.getElementById('timerBox');

    clearInterval(timerInterval); // নতুন টাইমার শুরুর আগে আগেরটি মুছে ফেলা
    timerInterval = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        if (timerBox) timerBox.innerText = `⏰ Time Remaining: ${minutes}:${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Time is up! Exam submitted.");
            submitExam();
        }
    }, 1000);
}

// ৭. পরীক্ষা সাবমিট করা
function submitExam() {
    clearInterval(timerInterval);
    let score = 0;
    const container = document.getElementById('dynamicQuestionsContainer');
    container.innerHTML = "<h3>Exam Results</h3>";

    onlineQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question_${index}"]:checked`);
        const selectedValue = selectedOption ? parseInt(selectedOption.value) : null;
        const isCorrect = selectedValue === question.a;
        
        if (isCorrect) score++;

        container.innerHTML += `
            <div style="margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #ddd;">
                <p><strong>Q${index + 1}. ${question.q}</strong></p>
                <p style="color: ${isCorrect ? 'green' : 'red'};">${isCorrect ? '✅ Correct' : '❌ Incorrect'}</p>
                ${!isCorrect ? `<p>Correct Answer: <strong>${question.os[question.a - 1]}</strong></p>` : ""}
            </div>`;
    });

    document.getElementById('examActiveView').style.display = "none";
    document.getElementById('examResultView').style.display = "block";
    document.getElementById('scoreText').innerText = `🎉 Score: ${score} / ${onlineQuestions.length}`;
}

// ৮. রিসেট করা
function resetExam() {
    document.getElementById('examResultView').style.display = "none";
    document.getElementById('examStartView').style.display = "block";
}