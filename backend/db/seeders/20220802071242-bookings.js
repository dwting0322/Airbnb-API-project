'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        startDate:'2022-01-01',
        endDate:'2022-01-10',
        spotId:1,
        userId:1
      },
      {
        startDate:'2022-02-01',
        endDate:'2022-02-10',
        spotId:2,
        userId:2
      },
      {
        startDate:'2022-03-01',
        endDate:'2022-03-10',
        spotId:3,
        userId:3
      },
      {
        startDate:'2023-04-01',
        endDate:'2023-04-10',
        spotId:4,
        userId:1
      },
      {
        startDate:'2023-05-01',
        endDate:'2023-05-10',
        spotId:1,
        userId:2
      },
      {
        startDate:'2023-10-01',
        endDate:'2023-10-10',
        spotId:3,
        userId:2
      },
  
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
