(function () {
  'use strict';

  var defaultQuestions = [
    {
      question: { id: 'Apa kepanjangan dari Batagor?', en: 'What does Batagor stand for?' },
      options: [
        { id: 'Bakso Tahu Goreng', en: 'Fried Tofu Fish Balls' },
        { id: 'Bakwan Tahu Goreng', en: 'Fried Tofu Fritters' },
        { id: 'Bakar Tahu Goreng', en: 'Grilled Fried Tofu' },
        { id: 'Baso Tahu Gurih', en: 'Savory Tofu Meatballs' }
      ],
      answer: 0
    },
    {
      question: { id: 'Batagor berasal dari kota mana?', en: 'Which city did Batagor originate in?' },
      options: [
        { id: 'Bandung', en: 'Bandung' },
        { id: 'Surabaya', en: 'Surabaya' },
        { id: 'Yogyakarta', en: 'Yogyakarta' },
        { id: 'Medan', en: 'Medan' }
      ],
      answer: 0
    },
    {
      question: { id: 'Ikan apa yang umum digunakan untuk adonan Batagor klasik?', en: 'Which fish is commonly used in classic Batagor filling?' },
      options: [
        { id: 'Ikan tuna', en: 'Tuna' },
        { id: 'Ikan tenggiri', en: 'Mackerel' },
        { id: 'Ikan lele', en: 'Catfish' },
        { id: 'Ikan bandeng', en: 'Milkfish' }
      ],
      answer: 1
    },
    {
      question: { id: 'Saus apa yang biasanya disajikan bersama Batagor?', en: 'Which sauce is usually served with Batagor?' },
      options: [
        { id: 'Saus tomat', en: 'Tomato sauce' },
        { id: 'Saus keju', en: 'Cheese sauce' },
        { id: 'Saus kacang', en: 'Peanut sauce' },
        { id: 'Saus kari', en: 'Curry sauce' }
      ],
      answer: 2
    },
    {
      question: { id: 'Sekitar kapan Batagor mulai muncul di Bandung?', en: 'Around when did Batagor first appear in Bandung?' },
      options: [
        { id: 'Akhir 1960-an', en: 'Late 1960s' },
        { id: 'Akhir 1970-an', en: 'Late 1970s' },
        { id: 'Akhir 1980-an', en: 'Late 1980s' },
        { id: 'Akhir 1990-an', en: 'Late 1990s' }
      ],
      answer: 1
    }
  ];

  var defaultContent = {
    homeTitle: {
      id: 'Selamat Datang di Dunia Batagor!',
      en: 'Welcome to the World of Batagor!'
    },
    homeIntro: {
      id: 'Jelajahi pengertian, sejarah, jenis, hingga cara membuat Batagor, jajanan gurih khas Bandung yang kini digemari di banyak kota.',
      en: "Explore the meaning, history, types, and how to make Batagor, Bandung's savory snack now loved in many cities."
    },
    aboutTitle: { id: 'Tentang Batagor', en: 'About Batagor' },
    aboutIntro: {
      id: 'Batagor adalah singkatan dari Bakso Tahu Goreng. Camilan ini terbuat dari tahu yang diisi adonan ikan tenggiri, digoreng hingga garing, lalu disajikan bersama saus kacang kental, kecap manis, dan perasan jeruk limau.',
      en: 'Batagor stands for Bakso Tahu Goreng, or Fried Tofu Fish Ball. It is made from tofu filled with mackerel fish paste, deep-fried until crispy, then served with thick peanut sauce, sweet soy sauce, and a squeeze of lime.'
    },
    historyTitle: { id: 'Sejarah Batagor', en: 'Batagor History' },
    historyIntro: {
      id: 'Batagor pertama kali muncul di Bandung, Jawa Barat, sekitar akhir tahun 1970-an. Camilan ini tercipta dari kreativitas pedagang bakso tahu yang menggoreng dagangan yang tidak habis terjual agar bisa disajikan kembali keesokan harinya.',
      en: 'Batagor first appeared in Bandung, West Java, around the late 1970s. It was created by tofu fish ball vendors who fried their unsold stock so it could be served again the next day.'
    }
  };

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return null;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadQuestions() {
    var saved = read('batagor.admin.questions');
    return Array.isArray(saved) && saved.length ? saved : JSON.parse(JSON.stringify(defaultQuestions));
  }

  function loadContent() {
    var saved = read('batagor.admin.content') || {};
    var content = {};

    Object.keys(defaultContent).forEach(function (key) {
      var item = saved[key] || {};
      content[key] = {
        id: typeof item.id === 'string' ? item.id : defaultContent[key].id,
        en: typeof item.en === 'string' ? item.en : defaultContent[key].en
      };
    });

    return content;
  }

  window.BatagorData = {
    defaultQuestions: defaultQuestions,
    defaultContent: defaultContent,
    loadQuestions: loadQuestions,
    saveQuestions: function (questions) { return write('batagor.admin.questions', questions); },
    loadContent: loadContent,
    saveContent: function (content) { return write('batagor.admin.content', content); }
  };
})();