
    const colorNames = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
    const colorValues = {
      Red: '#e74c3c',
      Blue: '#3498db',
      Green: '#2ecc71',
      Yellow: '#f1c40f',
      Purple: '#9b59b6',
      Orange: '#e67e22'
    };

    const wordDisplay = document.getElementById('colorWord');
    const buttonBox = document.getElementById('buttons');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const startModal = new bootstrap.Modal(document.getElementById('startModal'));

    let score = 0;
    let timeLeft = 30;
    let correctAnswer = '';
    let interval;
    let player = '';

    function shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function generateQuestion() {
      const word = colorNames[Math.floor(Math.random() * colorNames.length)];
      const color = colorNames[Math.floor(Math.random() * colorNames.length)];
      correctAnswer = word;
      wordDisplay.textContent = word;
      wordDisplay.style.color = colorValues[color];

      buttonBox.innerHTML = '';
      const shuffled = shuffleArray([...colorNames]);
      shuffled.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c;
        btn.className = 'btn btn-color';
        btn.style.backgroundColor = colorValues[c];
        btn.onclick = () => checkAnswer(c);
        buttonBox.appendChild(btn);
      });
    }

    function checkAnswer(selected) {
      if (selected === correctAnswer) {
        score++;
      } else {
        score = Math.max(0, score - 1);
      }
      scoreDisplay.innerHTML = `Score: ${score} | Time left: <span id="timer">${timeLeft}</span>s`;
      generateQuestion();
    }

    function startTimer() {
      interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(interval);
          let message = '';
          if (score >= 10) {
            message = `🏆 ${player}, you scored ${score}! Excellent memory and focus!`;
          } else if (score >= 5) {
            message = `🙂 ${player}, not bad! You scored ${score}`;
          } else {
            message = `🙁 ${player}, try again! You only scored ${score}`;
          }
          buttonBox.innerHTML = `
            <h3 class="mt-3">⏰ Time's up!</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="btn btn-warning mt-3">🔁 Play Again</button>
          `;
          wordDisplay.textContent = 'Game Over';
          wordDisplay.style.color = '#333';
        }
      }, 1000);
    }

    function startGame() {
      const nameInput = document.getElementById('playerName').value.trim();
      if (nameInput === '') {
        alert('Please enter your name to start.');
        return;
      }
      player = nameInput;
      startModal.hide();
      generateQuestion();
      startTimer();
    }

    // Show modal on load
    window.onload = () => {
      startModal.show();
    };