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
        width: 596,
        height: 826,
        answers: [true, false]
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 951,
        height: 634,
        answers: [true, false]
      }
    ],
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    option: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      width: 468,
      height: 354,
      answers: [false, true]
    }
  },
  {
    type: `triple`,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        isCorrect: true
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 560,
        height: 826,
        isCorrect: false
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        isCorrect: false
      }
    ]
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    option: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      width: 468,
      height: 354,
      answers: [false, true]
    }
  },
  {
    type: `triple`,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        isCorrect: true
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 560,
        height: 826,
        isCorrect: false
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
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
        width: 596,
        height: 826,
        answers: [true, false]
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 951,
        height: 634,
        answers: [true, false]
      }
    ],
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    option: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      width: 468,
      height: 354,
      answers: [false, true]
    }
  },
  {
    type: `triple`,
    task: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        isCorrect: true
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 560,
        height: 826,
        isCorrect: false
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
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
        width: 596,
        height: 826,
        answers: [true, false]
      },
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 951,
        height: 634,
        answers: [true, false]
      }
    ],
  },
  {
    type: `wide`,
    task: `Угадай, фото или рисунок?`,
    option: {
      src: `https://k42.kn3.net/D2F0370D6.jpg`,
      width: 468,
      height: 354,
      answers: [false, true]
    }
  },
];
