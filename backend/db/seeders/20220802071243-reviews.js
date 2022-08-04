'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: "1 - This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: "2 - This was an awesome spot!",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 2,
        review: "3 - This was an awesome spot!",
        stars: 3,
      },
      {
        userId: 4,
        spotId: 2,
        review: "4 - This was an awesome spot!",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 3,
        review: "5 - This was an awesome spot!",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 5,
        review: "5 - This was an awesome spot!",
        stars: 5,
      },
  
    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
