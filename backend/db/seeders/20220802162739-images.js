'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://www.pngegg.com/en/png-wsosz',
        imageableId: 1,
        spotId: 1,
        reviewId: 1,
        userId:1
      },
      {
        url: 'https://www.pngegg.com/en/png-wsosz',
        imageableId: 2,
        spotId: 2,
        reviewId: 2,
        userId:2
      },
      {
        url: 'https://www.pngegg.com/en/png-wsosz',
        imageableId: 3,
        spotId: 3,
        reviewId: 3,
        userId:3
      },
      {
        url: 'https://www.pngegg.com/en/png-wsosz',
        imageableId: 4,
        spotId: 2,
        reviewId: 4,
        userId:4
      },
  
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
