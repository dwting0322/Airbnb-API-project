'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://a0.muscache.com/im/pictures/7a59711c-4c2b-408c-95c4-7a7c747505d3.jpg?im_w=1440',
        spotId: 1,
        reviewId: 1,
        userId:1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/09e345aa-0d11-4303-9c31-81e61736ab9f.jpg?im_w=1440',
        spotId: 2,
        reviewId: 2,
        userId:2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46156130/original/7e5df544-6acc-4d6e-9fe7-c71b27cfb398.jpeg?im_w=1200',
        spotId: 3,
        reviewId: 3,
        userId:3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/0cbac60f-86fa-4b1d-a377-79232a101226.jpg?im_w=1440',
        spotId: 4,
        reviewId: 4,
        userId:4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/141d2945-0d2c-45ae-b108-246447071fde.jpg?im_w=1200',
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
