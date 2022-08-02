'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Spots', [
        {
          ownerId: 1,
          address: "111 Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "House #1",
          description: "spot #1",
          price: 111,
          previewImage: "https://www.pngegg.com/en/png-wsosz"
        },
        {
          ownerId: 2,
          address: "222 Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 38.7645358,
          lng: -123.4730327,
          name: "House #2",
          description: "spot #2",
          price: 222,
          previewImage: "https://www.pngegg.com/en/png-wsosz"
        },
        {
          ownerId: 3,
          address: "333 Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 39.7645358,
          lng: -124.4730327,
          name: "House #3",
          description: "spot #3",
          price: 333,
          previewImage: "https://www.pngegg.com/en/png-wsosz"
        },



     ], {});
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Spots', null, {});
     
  }
};
