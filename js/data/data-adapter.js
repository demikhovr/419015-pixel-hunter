const Server2TypeMapper = {
  'two-of-two': `common`,
  'tinder-like': `wide`,
  'one-of-three': `triple`,
};

const Server2AnswerTypeMapper = {
  'painting': `paint`,
  'photo': `photo`,
};

export const adaptServerData = (data) => {
  return data.map((level) => {
    return {
      type: Server2TypeMapper[level.type],
      task: level.question,
      options: level.answers.map((answer) => {
        return {
          src: answer.image.url,
          width: answer.image.width,
          height: answer.image.height,
          type: Server2AnswerTypeMapper[answer.type]
        };
      })
    };
  });
};
