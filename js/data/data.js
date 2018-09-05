export const INITIAL_STATE = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: []
});

export const levels = [
  {
    type: `common`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        answers: [true, false]
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        answers: [true, false]
      }
    ],
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    options: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      answers: [false, true]
    }
  },
  {
    type: `triple`,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        isCorrect: true
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        isCorrect: false
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        isCorrect: false
      }
    ]
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    options: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      answers: [false, true]
    }
  },
  {
    type: `triple`,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        isCorrect: true
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        isCorrect: false
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        isCorrect: false
      }
    ]
  },
  {
    type: `common`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        answers: [true, false]
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        answers: [true, false]
      }
    ],
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    options: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      answers: [false, true]
    }
  },
  {
    type: `triple`,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        isCorrect: true
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        isCorrect: false
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        isCorrect: false
      }
    ]
  },
  {
    type: `common`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        answers: [true, false]
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        answers: [true, false]
      }
    ],
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    options: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      answers: [false, true]
    }
  }
];
