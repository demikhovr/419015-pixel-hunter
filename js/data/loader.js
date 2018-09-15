import {adaptServerData} from './data-adapter';

const Api = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  STATS: `https://es.dump.academy/pixel-hunter/stats/`
};
const DEFAULT_NAME = `Username`;
const APP_ID = 419015;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const loadImage = (url) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();
    image.src = url;
    image.addEventListener(`load`, () => {
      onLoad(image);
    });
    image.addEventListener(`error`, () => {
      onError(`Не удалось загрузить картнку: ${url}`);
    });
  });
};

const preloadImages = (data) => {
  const imagePromises = [];

  data.forEach((level) => {
    level.options.forEach((option) => {
      const preloadedImage = loadImage(option.src);

      preloadedImage
        .then((image) => {
          option.width = image.width;
          option.height = image.height;
        });

      imagePromises.push(preloadedImage);
    });
  });

  return Promise.all(imagePromises)
    .then(() => data);
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${Api.QUESTIONS}`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData)
      .then(preloadImages);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${Api.STATS}${APP_ID}-${name}`)
      .then(checkStatus)
      .then(toJSON);
  }

  static saveResults(answers, lives, name = DEFAULT_NAME) {
    const data = Object.assign({}, {answers}, {lives});
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${Api.STATS}${APP_ID}-${name}`, requestSettings)
      .then(checkStatus);
  }
}
