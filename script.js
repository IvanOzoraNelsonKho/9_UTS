(function () {
    'use strict';

    /* =========================================================
       DATA RESEP
       Disimpan sebagai objek JS (bukan atribut HTML) karena
       kartu langkah & isi modal dibuat secara dinamis oleh JS.
       Setiap teks tetap punya pasangan id/en untuk dwibahasa.
    ========================================================= */
    var uiWords = { langkah: { id: 'Langkah', en: 'Step' } };

    var quizQuestions = window.BatagorData.loadQuestions();

    var recipesData = {
      tenggiri: {
        title: { id: 'Resep Isian Tenggiri', en: 'Mackerel Filling Recipe' },
        steps: [
          {
            title: { id: 'Menyiapkan Adonan Ikan', en: 'Preparing the Fish Mixture' },
            short: { id: 'Campur ikan giling dengan bumbu dan tepung sagu.', en: 'Mix ground fish with seasoning and tapioca flour.' },
            detail: {
              id: 'Giling halus 300 gram daging ikan tenggiri segar, lalu campurkan dengan 100 gram tepung sagu, 2 siung bawang putih halus, 1 sendok teh garam, sedikit merica, dan 3 sendok makan air es. Uleni adonan dengan tangan selama kurang lebih 3-4 menit hingga teksturnya kalis, sedikit lengket, dan mudah dibentuk. Semakin lama diuleni, tekstur batagor yang dihasilkan akan semakin kenyal.',
              en: 'Finely grind 300 grams of fresh mackerel fish, then mix it with 100 grams of tapioca flour, 2 cloves of minced garlic, 1 teaspoon of salt, a pinch of pepper, and 3 tablespoons of ice water. Knead the mixture by hand for about 3-4 minutes until it becomes elastic, slightly sticky, and easy to shape. The longer you knead it, the chewier the final texture will be.'
            }
          },
          {
            title: { id: 'Mengisi Tahu', en: 'Filling the Tofu' },
            short: { id: 'Belah tahu dan isi dengan adonan ikan.', en: 'Cut open the tofu and fill it with the fish mixture.' },
            detail: {
              id: 'Ambil tahu putih berbentuk kotak, belah menjadi dua bagian. Gunakan sendok kecil untuk mengeruk sedikit bagian tengah tahu agar ada ruang, lalu isi rongga tersebut dengan adonan ikan menggunakan sendok atau tangan yang sudah dibasahi air agar adonan tidak lengket. Ratakan permukaannya agar terlihat rapi.',
              en: 'Take square white tofu and cut it in half. Use a small spoon to scoop out a little of the center to create space, then fill that hollow with the fish mixture using a spoon or wet hands so it does not stick. Smooth the surface so it looks neat.'
            }
          },
          {
            title: { id: 'Mengisi Kulit Pangsit', en: 'Filling the Wonton Skin' },
            short: { id: 'Bungkus sisa adonan dengan kulit pangsit.', en: 'Wrap the remaining mixture in wonton skin.' },
            detail: {
              id: 'Letakkan selembar kulit pangsit di telapak tangan, beri satu sendok teh adonan ikan di tengahnya. Lipat keempat sisi kulit ke atas mengelilingi adonan seperti membentuk siomay, biarkan bagian atasnya sedikit terbuka. Tekan perlahan bagian bawahnya agar berdiri kokoh dan tidak mudah rusak saat dikukus.',
              en: 'Place a wonton skin on your palm and add one teaspoon of the fish mixture in the center. Fold all four sides of the skin upward around the mixture, similar to shaping a siomay dumpling, leaving the top slightly open. Gently press the base so it stands firmly and will not fall apart during steaming.'
            }
          },
          {
            title: { id: 'Mengukus Adonan', en: 'Steaming the Mixture' },
            short: { id: 'Kukus semua bahan selama 15-20 menit.', en: 'Steam everything for 15-20 minutes.' },
            detail: {
              id: 'Panaskan panci kukusan hingga airnya mendidih dan mengeluarkan uap yang stabil. Susun tahu isi dan siomay pangsit di atas nampan kukus yang sudah diolesi sedikit minyak agar tidak lengket. Kukus dengan api sedang selama 15-20 menit hingga adonan ikan benar-benar matang, lalu angkat dan biarkan dingin sebelum digoreng.',
              en: 'Heat a steamer pot until the water boils and produces steady steam. Arrange the filled tofu and wonton dumplings on a lightly oiled steaming tray so they do not stick. Steam over medium heat for 15-20 minutes until the fish mixture is fully cooked, then remove and let it cool before frying.'
            }
          },
          {
            title: { id: 'Menggoreng hingga Renyah', en: 'Frying Until Crispy' },
            short: { id: 'Goreng dengan minyak panas hingga keemasan.', en: 'Deep-fry in hot oil until golden.' },
            detail: {
              id: 'Panaskan minyak goreng cukup banyak dengan api sedang. Masukkan tahu dan siomay yang sudah dikukus dan didinginkan, goreng sambil sesekali dibalik agar matang merata. Angkat ketika warnanya kuning keemasan dan renyah, lalu tiriskan di atas kertas minyak sebelum dipotong dan disajikan dengan saus kacang.',
              en: 'Heat a generous amount of cooking oil over medium heat. Add the steamed and cooled tofu and dumplings, frying while occasionally turning so they cook evenly. Remove once golden brown and crispy, then drain on paper towels before cutting and serving with peanut sauce.'
            }
          }
        ]
      },

      ayam: {
        title: { id: 'Resep Isian Ayam', en: 'Chicken Filling Recipe' },
        steps: [
          {
            title: { id: 'Menyiapkan Adonan Ayam', en: 'Preparing the Chicken Mixture' },
            short: { id: 'Campur ayam giling dengan telur dan tepung sagu.', en: 'Mix ground chicken with egg and tapioca flour.' },
            detail: {
              id: 'Giling halus 300 gram daging ayam tanpa kulit, campurkan dengan 80 gram tepung sagu, 1 butir telur, 2 siung bawang putih halus, setengah sendok teh kaldu bubuk, dan sedikit merica. Aduk rata menggunakan spatula atau tangan hingga adonan terasa lembut dan tidak lengket berlebihan.',
              en: 'Finely grind 300 grams of skinless chicken meat, then mix it with 80 grams of tapioca flour, 1 egg, 2 cloves of minced garlic, half a teaspoon of powdered broth, and a pinch of pepper. Stir well using a spatula or your hands until the mixture feels soft and not overly sticky.'
            }
          },
          {
            title: { id: 'Mengisi Tahu dan Pangsit', en: 'Filling the Tofu and Wonton' },
            short: { id: 'Isi tahu dan kulit pangsit dengan adonan ayam.', en: 'Fill the tofu and wonton skin with the chicken mixture.' },
            detail: {
              id: 'Dengan cara yang sama seperti isian ikan, belah tahu putih dan keruk bagian tengahnya, lalu isi dengan adonan ayam. Gunakan sisa adonan untuk mengisi kulit pangsit, lipat ujung-ujungnya ke atas hingga membentuk siomay kecil yang rapi.',
              en: 'Using the same method as the fish filling, cut open the white tofu, scoop out the center, and fill it with the chicken mixture. Use the remaining mixture to fill the wonton skins, folding the edges upward to form neat little dumplings.'
            }
          },
          {
            title: { id: 'Mengukus hingga Matang', en: 'Steaming Until Cooked' },
            short: { id: 'Kukus adonan selama sekitar 15 menit.', en: 'Steam the mixture for about 15 minutes.' },
            detail: {
              id: 'Susun tahu dan pangsit isi ayam di atas nampan kukusan yang sudah diberi sedikit minyak. Kukus dengan api sedang selama 15 menit, cek kematangan dengan menusuk salah satu bagian menggunakan tusuk gigi; jika tidak ada cairan mentah yang keluar, adonan sudah matang sempurna.',
              en: 'Arrange the chicken-filled tofu and wontons on a lightly oiled steaming tray. Steam over medium heat for 15 minutes, checking doneness by poking one piece with a toothpick; if no raw liquid comes out, the filling is fully cooked.'
            }
          },
          {
            title: { id: 'Menggoreng Sebentar', en: 'Frying Briefly' },
            short: { id: 'Goreng sebentar sebelum disajikan.', en: 'Fry briefly before serving.' },
            detail: {
              id: 'Setelah dingin, goreng tahu dan pangsit isi ayam sebentar saja, sekitar 2-3 menit di minyak panas, hanya untuk membuat bagian luarnya renyah keemasan tanpa membuat isiannya kering. Angkat dan tiriskan di atas saringan atau kertas minyak.',
              en: 'Once cooled, fry the chicken-filled tofu and wontons briefly, about 2-3 minutes in hot oil, just enough to make the outside golden and crispy without drying out the filling. Remove and drain on a rack or paper towel.'
            }
          },
          {
            title: { id: 'Menyajikan Hidangan', en: 'Serving the Dish' },
            short: { id: 'Potong dan sajikan dengan pelengkap.', en: 'Cut and serve with the toppings.' },
            detail: {
              id: 'Potong-potong batagor ayam yang sudah digoreng, tata di atas piring saji. Siram dengan saus kacang secukupnya, tambahkan kecap manis, dan beri perasan jeruk limau serta sedikit sambal rawit sebelum dihidangkan selagi hangat.',
              en: 'Cut the fried chicken batagor into pieces and arrange them on a serving plate. Drizzle with enough peanut sauce, add sweet soy sauce, and finish with a squeeze of lime and a little chili sauce before serving while warm.'
            }
          }
        ]
      },

      'saus-kacang': {
        title: { id: 'Resep Saus Kacang', en: 'Peanut Sauce Recipe' },
        steps: [
          {
            title: { id: 'Menyangrai Kacang Tanah', en: 'Roasting the Peanuts' },
            short: { id: 'Sangrai atau goreng kacang tanah hingga matang.', en: 'Roast or fry the peanuts until cooked.' },
            detail: {
              id: 'Siapkan 250 gram kacang tanah kupas, lalu sangrai tanpa minyak di atas wajan dengan api kecil sambil terus diaduk selama sekitar 10 menit, atau goreng sebentar dengan sedikit minyak hingga kecokelatan dan beraroma harum. Angkat dan biarkan dingin sebelum dihaluskan.',
              en: 'Prepare 250 grams of shelled peanuts, then dry-roast them in a pan over low heat while stirring continuously for about 10 minutes, or shallow-fry them briefly in a little oil until golden brown and fragrant. Remove and let them cool before blending.'
            }
          },
          {
            title: { id: 'Menghaluskan Bumbu', en: 'Blending the Seasoning' },
            short: { id: 'Haluskan kacang bersama bawang putih dan cabai.', en: 'Blend the peanuts with garlic and chili.' },
            detail: {
              id: 'Haluskan kacang tanah yang sudah disangrai bersama 3 siung bawang putih dan 3-5 buah cabai rawit (sesuaikan tingkat kepedasan) menggunakan blender atau ulekan hingga menjadi pasta yang cukup halus namun masih sedikit bertekstur.',
              en: 'Blend the roasted peanuts together with 3 cloves of garlic and 3-5 bird\u2019s eye chilies (adjust to taste) using a blender or mortar and pestle until it forms a fairly smooth paste with a slight texture remaining.'
            }
          },
          {
            title: { id: 'Merebus Saus', en: 'Simmering the Sauce' },
            short: { id: 'Rebus bumbu halus dengan air dan gula merah.', en: 'Simmer the paste with water and palm sugar.' },
            detail: {
              id: 'Masukkan bumbu halus ke dalam panci, tambahkan 400 ml air, 50 gram gula merah serut, 1 sendok teh garam, dan sedikit air asam jawa. Masak dengan api kecil sambil terus diaduk agar tidak menggumpal di dasar panci, hingga mendidih dan mulai mengental.',
              en: 'Put the blended paste into a pot, add 400 ml of water, 50 grams of shaved palm sugar, 1 teaspoon of salt, and a little tamarind water. Cook over low heat while stirring continuously to prevent lumps from forming at the bottom, until it boils and starts to thicken.'
            }
          },
          {
            title: { id: 'Menyesuaikan Rasa', en: 'Adjusting the Flavor' },
            short: { id: 'Koreksi rasa gurih, manis, dan pedas.', en: 'Balance the savory, sweet, and spicy taste.' },
            detail: {
              id: 'Cicipi saus yang sedang dimasak, tambahkan garam jika kurang gurih, gula merah jika kurang manis, atau cabai rawit halus jika ingin lebih pedas. Terus masak hingga kekentalan saus sesuai selera, tidak terlalu encer maupun terlalu kental.',
              en: 'Taste the sauce as it cooks, adding more salt if it needs more savoriness, more palm sugar if it needs more sweetness, or extra chili if you want it spicier. Keep cooking until the sauce reaches your preferred thickness, neither too runny nor too thick.'
            }
          },
          {
            title: { id: 'Menyajikan Saus Kacang', en: 'Serving the Peanut Sauce' },
            short: { id: 'Siramkan di atas batagor sebelum disantap.', en: 'Pour over the batagor before eating.' },
            detail: {
              id: 'Setelah saus kacang matang dan mengental sempurna, angkat dan biarkan sedikit hangat. Siramkan secukupnya di atas batagor goreng yang sudah dipotong-potong, lalu tambahkan kecap manis dan perasan jeruk limau segar sesaat sebelum disajikan agar rasanya paling maksimal.',
              en: 'Once the peanut sauce is fully cooked and thickened, remove it from the heat and let it cool slightly. Pour a generous amount over the cut pieces of fried batagor, then add sweet soy sauce and a squeeze of fresh lime just before serving for the best flavor.'
            }
          }
        ]
      }
    };

    var currentLang = 'id';
    var currentRecipe = null;      // resep yang sedang dibuka di Fase 2
    var currentStepInfo = null;    // { recipeKey, index } untuk modal Fase 3 yang sedang terbuka
    var quizIndex = 0;
    var quizScore = 0;
    var quizStarted = false;
    var quizSelectedAnswer = null;

    /* =========================================================
       A. GANTI BAHASA (ID <-> EN)
       Elemen statis diambil dari atribut data-id/data-en.
       Elemen dinamis (grid langkah & modal) dirender ulang
       memakai objek recipesData di atas.
    ========================================================= */
    function applyLanguage(lang) {
      currentLang = lang;

      document.querySelectorAll('[data-id][data-en]').forEach(function (el) {
        el.textContent = (lang === 'id') ? el.dataset.id : el.dataset.en;
      });

      document.documentElement.lang = lang;
      document.getElementById('langId').classList.toggle('active', lang === 'id');
      document.getElementById('langEn').classList.toggle('active', lang === 'en');
      document.title = (lang === 'id')
        ? 'Batagor. | Website Edukasi Batagor'
        : 'Batagor. | Batagor Educational Website';

      // Render ulang konten dinamis jika sedang tampil
      if (currentRecipe) renderStepGrid(currentRecipe);
      if (currentStepInfo) renderModal();
      renderQuiz();
    }

    function applySavedContent() {
      var content = window.BatagorData.loadContent();
      document.querySelectorAll('[data-content-key]').forEach(function (el) {
        var saved = content[el.dataset.contentKey];
        if (!saved) return;
        el.dataset.id = saved.id;
        el.dataset.en = saved.en;
        el.textContent = saved[currentLang];
      });
    }

    applySavedContent();

    document.getElementById('langToggle').addEventListener('click', function () {
      applyLanguage(currentLang === 'id' ? 'en' : 'id');
    });

    /* =========================================================
       B. NAVIGASI ANTAR HALAMAN (SPA)
    ========================================================= */
    function showPage(pageId) {
      document.querySelectorAll('.page').forEach(function (section) {
        section.classList.remove('active');
      });
      var target = document.getElementById(pageId);
      if (target) target.classList.add('active');

      document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.toggle('active', link.dataset.page === pageId);
      });

      if (pageId === 'cara-bikin') resetCaraBikin(); // selalu mulai dari Fase 1

      window.scrollTo(0, 0); // tanpa efek scroll panjang
      closeMobileNav();
    }

    document.querySelectorAll('[data-page]').forEach(function (el) {
      el.addEventListener('click', function () { showPage(el.dataset.page); });
    });

    /* =========================================================
       C. KUIS BATAGOR
    ========================================================= */
    var quizIntro = document.getElementById('quizIntro');
    var quizQuestion = document.getElementById('quizQuestion');
    var quizResult = document.getElementById('quizResult');
    var quizOptions = document.getElementById('quizOptions');

    function quizCopy(idText, enText) {
      return currentLang === 'id' ? idText : enText;
    }

    function startQuiz() {
      quizIndex = 0;
      quizScore = 0;
      quizSelectedAnswer = null;
      quizStarted = true;
      renderQuiz();
    }

    function renderQuiz() {
      if (!quizIntro) return;
      quizIntro.classList.toggle('hidden', quizStarted);
      quizQuestion.classList.add('hidden');
      quizResult.classList.add('hidden');

      if (!quizStarted) return;
      if (quizIndex >= quizQuestions.length) {
        quizResult.classList.remove('hidden');
        document.getElementById('quizFinalScore').textContent = quizScore + ' / ' + quizQuestions.length;
        document.getElementById('quizResultMessage').textContent = quizScore >= 4
          ? quizCopy('Pengetahuanmu tentang Batagor mantap!', 'You really know your Batagor!')
          : quizScore >= 2
            ? quizCopy('Bagus! Masih ada hal menarik untuk dipelajari.', 'Nice work! There is still more to discover.')
            : quizCopy('Yuk, jelajahi lagi website ini lalu coba sekali lagi.', 'Explore the website and give it another try.');
        return;
      }

      quizQuestion.classList.remove('hidden');
      var question = quizQuestions[quizIndex];
      document.getElementById('quizProgress').textContent = quizCopy('Pertanyaan ', 'Question ') + (quizIndex + 1) + ' / ' + quizQuestions.length;
      document.getElementById('quizScore').textContent = quizCopy('Skor: ', 'Score: ') + quizScore;
      document.getElementById('quizProgressFill').style.width = ((quizIndex + 1) / quizQuestions.length * 100) + '%';
      document.getElementById('quizQuestionText').textContent = question.question[currentLang];
      quizOptions.innerHTML = '';

      question.options.forEach(function (option, index) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'quiz-option';
        button.textContent = option[currentLang];
        button.setAttribute('aria-pressed', String(quizSelectedAnswer === index));

        if (quizSelectedAnswer !== null) {
          button.disabled = true;
          if (index === question.answer) button.classList.add('correct');
          if (index === quizSelectedAnswer && index !== question.answer) button.classList.add('incorrect');
        }

        button.addEventListener('click', function () {
          if (quizSelectedAnswer !== null) return;
          quizSelectedAnswer = index;
          if (index === question.answer) quizScore += 1;
          renderQuiz();
        });
        quizOptions.appendChild(button);
      });

      var feedback = document.getElementById('quizFeedback');
      feedback.textContent = quizSelectedAnswer === null ? '' : quizSelectedAnswer === question.answer
        ? quizCopy('Benar! Jawabanmu tepat.', 'Correct! That is the right answer.')
        : quizCopy('Belum tepat. Jawaban yang benar sudah ditandai.', 'Not quite. The correct answer is highlighted.');
      feedback.classList.toggle('is-correct', quizSelectedAnswer === question.answer);
      feedback.classList.toggle('is-incorrect', quizSelectedAnswer !== null && quizSelectedAnswer !== question.answer);

      var nextButton = document.getElementById('quizNext');
      nextButton.classList.toggle('hidden', quizSelectedAnswer === null);
      nextButton.textContent = quizIndex === quizQuestions.length - 1
        ? quizCopy('Lihat Hasil', 'See Results')
        : quizCopy('Pertanyaan Berikutnya', 'Next Question');
    }

    document.getElementById('quizStart').addEventListener('click', startQuiz);
    document.getElementById('quizRestart').addEventListener('click', startQuiz);
    document.getElementById('quizNext').addEventListener('click', function () {
      if (quizSelectedAnswer === null) return;
      quizIndex += 1;
      quizSelectedAnswer = null;
      renderQuiz();
    });

    /* =========================================================
       D. HALAMAN "CARA BIKIN": FASE 1 -> FASE 2 -> FASE 3
    ========================================================= */

    // ---- Fase 1 -> Fase 2: pilih resep, tampilkan grid langkah ----
    function openStepGrid(recipeKey) {
      currentRecipe = recipeKey;
      document.getElementById('faseResep').classList.add('hidden');
      document.getElementById('faseLangkah').classList.remove('hidden');
      renderStepGrid(recipeKey);
      window.scrollTo(0, 0);
    }

    function renderStepGrid(recipeKey) {
      var data = recipesData[recipeKey];
      document.getElementById('langkahRecipeTitle').textContent = data.title[currentLang];

      var grid = document.getElementById('stepGrid');
      grid.innerHTML = ''; // kosongkan lalu bangun ulang kartu-kartu langkah

      data.steps.forEach(function (step, index) {
        var card = document.createElement('div');
        card.className = 'step-card';

        var numEl = document.createElement('span');
        numEl.className = 'step-number';
        numEl.textContent = index + 1;

        var titleEl = document.createElement('h4');
        titleEl.textContent = step.title[currentLang];

        var shortEl = document.createElement('p');
        shortEl.textContent = step.short[currentLang];

        card.appendChild(numEl);
        card.appendChild(titleEl);
        card.appendChild(shortEl);

        card.addEventListener('click', function () { openStepModal(recipeKey, index); });
        grid.appendChild(card);
      });
    }

    document.querySelectorAll('.recipe-card').forEach(function (card) {
      card.addEventListener('click', function () { openStepGrid(card.dataset.recipe); });
    });

    // ---- Kembali dari Fase 2 ke Fase 1 ----
    function resetCaraBikin() {
      document.getElementById('faseLangkah').classList.add('hidden');
      document.getElementById('faseResep').classList.remove('hidden');
      closeModal();
      currentRecipe = null;
    }
    document.getElementById('btnKembaliResep').addEventListener('click', resetCaraBikin);

    // ---- Fase 2 -> Fase 3: klik kartu langkah membuka modal detail ----
    var modalOverlay = document.getElementById('stepModalOverlay');

    function openStepModal(recipeKey, index) {
      currentStepInfo = { recipeKey: recipeKey, index: index };
      renderModal();
      modalOverlay.classList.add('active');
    }

    function renderModal() {
      if (!currentStepInfo) return;
      var step = recipesData[currentStepInfo.recipeKey].steps[currentStepInfo.index];
      var nomor = currentStepInfo.index + 1;
      document.getElementById('modalStepTitle').textContent =
        uiWords.langkah[currentLang] + ' ' + nomor + ': ' + step.title[currentLang];
      document.getElementById('modalStepDetail').textContent = step.detail[currentLang];
    }

    function closeModal() {
      modalOverlay.classList.remove('active');
      currentStepInfo = null;
    }

    document.getElementById('modalClose').addEventListener('click', closeModal);

    // Klik area gelap di luar kotak modal juga menutup modal
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    // Tombol Escape menutup modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    /* =========================================================
      E. MENU MOBILE (HAMBURGER)
    ========================================================= */
    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');

    function closeMobileNav() { mainNav.classList.remove('open'); }

    hamburger.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

  })();