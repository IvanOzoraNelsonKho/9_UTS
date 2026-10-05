(function () {
  'use strict';

  var store = window.BatagorData;
  var questions = store.loadQuestions();
  var content = store.loadContent();
  var editingIndex = 0;
  var creatingQuestion = false;
  var questionForm = document.getElementById('questionForm');
  var questionList = document.getElementById('questionList');
  var questionStatus = document.getElementById('questionStatus');
  var contentStatus = document.getElementById('contentStatus');
  var viewTitles = { overview: 'Ringkasan', quiz: 'Kelola kuis', content: 'Konten situs' };

  function setStatus(element, message, isError) {
    element.textContent = message;
    element.classList.toggle('error', Boolean(isError));
  }

  function updateStorageStatus(success) {
    var status = document.getElementById('storageStatus');
    status.classList.toggle('error', !success);
    status.lastChild.textContent = success ? ' Tersimpan di browser ini' : ' Penyimpanan browser tidak tersedia';
  }

  function updateMetrics() {
    document.getElementById('questionMetric').textContent = questions.length;
    document.getElementById('questionCount').textContent = questions.length;
    document.getElementById('contentMetric').textContent = Object.keys(content).length;
  }

  function switchView(viewName) {
    document.querySelectorAll('.admin-view').forEach(function (view) {
      var isActive = view.id === 'view-' + viewName;
      view.hidden = !isActive;
      view.classList.toggle('active', isActive);
    });
    document.querySelectorAll('[data-view]').forEach(function (button) {
      button.classList.toggle('active', button.classList.contains('admin-nav-item') && button.dataset.view === viewName);
    });
    document.getElementById('pageHeading').textContent = viewTitles[viewName];
  }

  document.querySelectorAll('[data-view]').forEach(function (button) {
    button.addEventListener('click', function () { switchView(button.dataset.view); });
  });

  function renderQuestionList() {
    questionList.innerHTML = '';
    questions.forEach(function (question, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'question-list-item' + (!creatingQuestion && index === editingIndex ? ' active' : '');
      var number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      var title = document.createElement('span');
      title.textContent = question.question.id;
      button.appendChild(number);
      button.appendChild(title);
      button.addEventListener('click', function () { selectQuestion(index); });
      questionList.appendChild(button);
    });

    if (creatingQuestion) {
      var draft = document.createElement('div');
      draft.className = 'question-list-empty';
      draft.textContent = 'Soal baru';
      questionList.appendChild(draft);
    }

    document.getElementById('deleteQuestion').disabled = creatingQuestion || questions.length <= 1;
    document.getElementById('deleteQuestion').title = questions.length <= 1 ? 'Kuis harus memiliki minimal satu soal' : 'Hapus soal ini';
    updateMetrics();
  }

  function selectQuestion(index) {
    creatingQuestion = false;
    editingIndex = index;
    var question = questions[index];
    questionForm.elements.questionId.value = question.question.id;
    questionForm.elements.questionEn.value = question.question.en;
    question.options.forEach(function (option, optionIndex) {
      questionForm.elements['optionId' + optionIndex].value = option.id;
      questionForm.elements['optionEn' + optionIndex].value = option.en;
    });
    questionForm.querySelector('input[name="answer"][value="' + question.answer + '"]').checked = true;
    document.getElementById('editorLabel').textContent = 'PERTANYAAN ' + String(index + 1).padStart(2, '0');
    setStatus(questionStatus, '', false);
    renderQuestionList();
  }

  function startNewQuestion() {
    creatingQuestion = true;
    editingIndex = questions.length;
    questionForm.reset();
    questionForm.elements.questionId.value = '';
    questionForm.elements.questionEn.value = '';
    for (var optionIndex = 0; optionIndex < 4; optionIndex += 1) {
      questionForm.elements['optionId' + optionIndex].value = '';
      questionForm.elements['optionEn' + optionIndex].value = '';
    }
    questionForm.querySelector('input[name="answer"][value="0"]').checked = true;
    document.getElementById('editorLabel').textContent = 'SOAL BARU';
    setStatus(questionStatus, '', false);
    renderQuestionList();
    questionForm.elements.questionId.focus();
  }

  document.getElementById('addQuestion').addEventListener('click', startNewQuestion);

  questionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var correctAnswer = questionForm.querySelector('input[name="answer"]:checked');
    if (!correctAnswer) {
      setStatus(questionStatus, 'Pilih jawaban yang benar.', true);
      return;
    }

    var question = {
      question: {
        id: questionForm.elements.questionId.value.trim(),
        en: questionForm.elements.questionEn.value.trim()
      },
      options: [],
      answer: Number(correctAnswer.value)
    };

    for (var optionIndex = 0; optionIndex < 4; optionIndex += 1) {
      question.options.push({
        id: questionForm.elements['optionId' + optionIndex].value.trim(),
        en: questionForm.elements['optionEn' + optionIndex].value.trim()
      });
    }

    if (creatingQuestion) {
      questions.push(question);
      editingIndex = questions.length - 1;
      creatingQuestion = false;
    } else {
      questions[editingIndex] = question;
    }

    var saved = store.saveQuestions(questions);
    updateStorageStatus(saved);
    selectQuestion(editingIndex);
    setStatus(questionStatus, saved ? 'Soal tersimpan.' : 'Gagal menyimpan soal di browser ini.', !saved);
  });

  document.getElementById('deleteQuestion').addEventListener('click', function () {
    if (creatingQuestion || questions.length <= 1) return;
    if (!window.confirm('Hapus pertanyaan ini?')) return;
    questions.splice(editingIndex, 1);
    var saved = store.saveQuestions(questions);
    updateStorageStatus(saved);
    selectQuestion(Math.min(editingIndex, questions.length - 1));
    setStatus(questionStatus, saved ? 'Soal dihapus.' : 'Gagal menyimpan perubahan.', !saved);
  });

  function fillContentForm() {
    document.querySelectorAll('[data-content-input]').forEach(function (input) {
      input.value = content[input.dataset.contentInput][input.dataset.lang];
    });
  }

  document.getElementById('contentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelectorAll('[data-content-input]').forEach(function (input) {
      content[input.dataset.contentInput][input.dataset.lang] = input.value.trim();
    });
    var saved = store.saveContent(content);
    updateStorageStatus(saved);
    setStatus(contentStatus, saved ? 'Konten tersimpan. Muat ulang situs untuk melihat perubahan.' : 'Gagal menyimpan konten di browser ini.', !saved);
  });

  document.getElementById('resetContent').addEventListener('click', function () {
    content = JSON.parse(JSON.stringify(store.defaultContent));
    fillContentForm();
    var saved = store.saveContent(content);
    updateStorageStatus(saved);
    setStatus(contentStatus, saved ? 'Teks awal dipulihkan.' : 'Gagal menyimpan perubahan.', !saved);
  });

  renderQuestionList();
  selectQuestion(0);
  fillContentForm();
})();