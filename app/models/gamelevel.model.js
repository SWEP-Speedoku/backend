module.exports = (sequelize, Sequelize) => {
    const gameLevel = sequelize.define("gameLevel", {
      difficulty: {
        type: Sequelize.STRING
      },
      rules: {
        type: Sequelize.MEDIUMTEXT
      },
      encodedBoard: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
    });
  
    return gameLevel;
  };