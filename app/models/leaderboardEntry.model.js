module.exports = (sequelize, Sequelize) => {
    const LeaderboardEntry = sequelize.define("leaderboardEntry", {
      playerId: {
        type: Sequelize.INT
      },
      playerName: {
        type: Sequelize.INT
      },
      gameId: {
        type: Sequelize.INT
      },
      state: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.TIME
      }
    });
  
    return LeaderboardEntry;
  };