'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'image url - 1',
        imageableId: 1,
        spotId: 1,
        reviewId: 1,
        userId:1
      },
      {
        url: 'image url - 2',
        imageableId: 2,
        spotId: 2,
        reviewId: 2,
        userId:2
      },
      {
        url: 'image url - 3',
        imageableId: 3,
        spotId: 3,
        reviewId: 3,
        userId:3
      },
      {
        url: 'image url - 4',
        imageableId: 4,
        spotId: 4,
        reviewId: 4,
        userId:4
      },
      {
        url: 'image url - 5',
        imageableId: 5,
        spotId: 5,
        reviewId: 5,
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
