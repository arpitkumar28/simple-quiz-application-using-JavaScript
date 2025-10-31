
const quizData = [
    {
      question: "Which language runs in a web browser?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: 1
    },
    {
      question: "What is the correct HTML tag for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      answer: 2
    },
    {
      question: "Which company developed the React library?",
      options: ["Google", "Microsoft", "Facebook", "Apple"],
      answer: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  

  const questionEl = document.getElementById('question');
  const optionsForm = document.getElementById('options-form');
  const nextBtn = document.getElementById('next-btn');
  const scoreEl = document.getElementById('score');
  const warnMsg = document.getElementById('warn-msg');
  
  function loadQuestion(idx) {

    scoreEl.innerText = "";
    warnMsg.style.display = "none";
    optionsForm.innerHTML = "";
    nextBtn.disabled = false;

    questionEl.innerText = quizData[idx].question;
    quizData[idx].options.forEach((opt, i) => {
      const optionContainer = document.createElement('div');
      optionContainer.className = 'option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.id = `option${i}`;
      input.value = i;
      input.required = true;
      const label = document.createElement('label');
      label.setAttribute('for', `option${i}`);
      label.innerText = opt;
      optionContainer.appendChild(input);
      optionContainer.appendChild(label);
      optionsForm.appendChild(optionContainer);
    });
  }
  
  function getSelectedOption() {
    const radios = document.getElementsByName('answer');
    for (let radio of radios) {
      if (radio.checked) return parseInt(radio.value);
    }
    return null;
  }
  
  nextBtn.onclick = function() {
    const selected = getSelectedOption();
    if (selected === null) {
      warnMsg.style.display = "block";
      return;
    }
    warnMsg.style.display = "none";
    if (selected === quizData[currentQuestion].answer) score++;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion(currentQuestion);
    } else {

      questionEl.innerText = "Quiz Completed!";
      optionsForm.innerHTML = "";
      nextBtn.style.display = "none";
      scoreEl.innerText = `Your Score: ${score} out of ${quizData.length}`;
    }
  }
  

  loadQuestion(currentQuestion);
  