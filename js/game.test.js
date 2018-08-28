import {assert} from 'chai';
import {INITIAL_STATE} from './data/data';
import {
  countPoints,
  updateLives,
  changeLevel,
  updateTime
} from './game';

describe(`Check score counting`, () => {
  it(`should return 1650 if there are full lives and all answers are correct and answered fast`, () => {
    const answers = [
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      }
    ];

    assert.equal(countPoints(answers, 3), 1650);
  });

  it(`should return 1500 if there are 0 lives and all answers are correct and answered fast`, () => {
    const answers = [
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      }
    ];

    assert.equal(countPoints(answers, 0), 1500);
  });

  it(`should return 1150 points if there are full lives and all answers are correct and ordinary`, () => {
    const answers = [
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      }
    ];

    assert.equal(countPoints(answers, 3), 1150);
  });

  it(`should return 700 if there are full lives and 5 correct + 5 incorrect answers`, () => {
    const answers = [
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: false,
        time: 20
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: false,
        time: 25
      },
      {
        isCorrect: false,
        time: 15
      },
      {
        isCorrect: false,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 15
      },
      {
        isCorrect: true,
        time: 10
      },
      {
        isCorrect: false,
        time: 5
      }
    ];

    assert.equal(countPoints(answers, 3), 700);
  });

  it(`should return 650 if there are full lives and all answers are correct and answered slowly`, () => {
    const answers = [
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      },
      {
        isCorrect: true,
        time: 35
      }
    ];

    assert.equal(countPoints(answers, 3), 650);
  });

  it(`should not allow set non array value`, () => {
    assert.throws(() => countPoints(8, 3), /answers should be of type array/);
  });

  it(`should be only ten answers`, () => {
    assert.throws(() => countPoints([], 3), /There should be only 10 answers/);
  });

  it(`should not allow set non number value`, () => {
    const answers = [
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      },
      {
        isCorrect: true,
        time: 5
      }
    ];

    assert.equal(countPoints(answers, 3), 1650);
  });
});

describe(`Check update lives`, () => {
  it(`should update lives`, () => {
    assert.equal(updateLives(INITIAL_STATE, true).lives, 3);
    assert.equal(updateLives(INITIAL_STATE, false).lives, 2);
  });

  it(`should return 0 if 0 lives left and answer is correct`, () => {
    assert.equal(updateLives(Object.assign({}, INITIAL_STATE, {lives: 0}), true).lives, 0);
  });

  it(`should return -1 if 0 lives left and answer is incorrect`, () => {
    assert.equal(updateLives(Object.assign({}, INITIAL_STATE, {lives: 0}), false).lives, -1);
  });
});

describe(`Check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_STATE, 1).level, 1);
    assert.equal(changeLevel(INITIAL_STATE, 2).level, 2);
    assert.equal(changeLevel(INITIAL_STATE, 3).level, 3);
    assert.equal(changeLevel(INITIAL_STATE, 4).level, 4);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, []).level, /Level should be of type number/);
    assert.throws(() => changeLevel(INITIAL_STATE, {}).level, /Level should be of type number/);
    assert.throws(() => changeLevel(INITIAL_STATE, undefined).level, /Level should be of type number/);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, -1).level, `Level should not be negative value`);
  });

  it(`should not be more than 10 levels`, () => {
    assert.throws(() => changeLevel(INITIAL_STATE, 25).level, `There should not be more than 10 levels`);
  });
});

describe(`Check update time`, () => {
  it(`should return 29 seconds if 30 is passed`, () => {
    assert.equal(updateTime(Object.assign({}, INITIAL_STATE, {time: 30})).time, 29);
  });

  it(`should return false if time is over`, () => {
    assert.equal(updateTime(Object.assign({}, INITIAL_STATE, {time: 0}).time), 0);
  });
});
