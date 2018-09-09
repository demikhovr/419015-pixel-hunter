export default (frame, image) => {
  const obj = {};
  const widthRatio = frame.width / image.width;
  const heightRatio = frame.height / image.height;

  if (frame.width === frame.height) {
    if (image.width === image.height) {
      obj.width = frame.width;
      obj.height = frame.height;
    }

    if (image.width > image.height) {
      obj.width = frame.width;
      obj.height = image.height * widthRatio;
    }

    if (image.width < image.height) {
      obj.width = image.width * heightRatio;
      obj.height = frame.height;
    }
  }

  if (frame.width > frame.height) {
    if (image.width === image.height) {
      obj.width = image.width * heightRatio;
      obj.height = frame.height;
    }

    if (image.width > image.height) {
      obj.width = image.width * (widthRatio < heightRatio ? widthRatio : heightRatio);
      obj.height = image.height * (widthRatio < heightRatio ? widthRatio : heightRatio);
    }

    if (image.width < image.height) {
      obj.width = image.width * heightRatio;
      obj.height = frame.height;
    }
  }

  if (frame.width < frame.height) {
    if (image.width === image.height) {
      obj.width = frame.width;
      obj.height = image.height * widthRatio;
    }

    if (image.width > image.height) {
      obj.width = frame.width;
      obj.height = image.height * widthRatio;
    }

    if (image.width < image.height) {
      obj.width = image.width * (widthRatio < heightRatio ? widthRatio : heightRatio);
      obj.height = image.height * (widthRatio < heightRatio ? widthRatio : heightRatio);
    }
  }

  return obj;
};
