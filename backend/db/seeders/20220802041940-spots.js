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
          description: "This is a spot #1",
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
          description: "This is a spot #2",
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
          description: "This is a spot #3",
          price: 333,
          previewImage: "https://www.pngegg.com/en/png-wsosz"
        },
        {
          ownerId: 4,
          address: "444 Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 40.7645358,
          lng: -125.4730327,
          name: "House #4",
          description: "This is a spot #4",
          price: 444,
          previewImage: "https://www.pngegg.com/en/png-wsosz"
        },

        {
          ownerId: 5,
          address: "555 Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 41.7645358,
          lng: -126.4730327,
          name: "House #3",
          description: "This is a spot #3",
          price: 555,
          previewImage: "https://www.pngegg.com/en/png-wsosz"
        },




     ], {});
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Spots', null, {});
     
  }
};
