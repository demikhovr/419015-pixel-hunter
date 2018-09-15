import {adaptServerData} from './data-adapter';

const QUESTIONS_URL = `https://es.dump.academy/pixel-hunter/questions`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
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
    return fetch(`${QUESTIONS_URL}`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData)
      .then(preloadImages);
  }
}
