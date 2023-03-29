module.exports = (sequelize, Sequelize) => {
    const gameSave = sequelize.define("gameSave", {
      playerId: {
        type: Sequelize.INT
      },
      gameId: {
        type: Sequelize.INT
      },
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
      time: {
        type: Sequelize.TIME
      },
      leaderboardValid: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return gameSave;
  };