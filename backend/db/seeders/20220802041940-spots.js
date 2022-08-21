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
          previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/8f81a33d-bf66-4976-89f5-a247f0051f3a.jpeg?im_w=1200"
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
          previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/5c547673-29e9-4993-b469-137c3b834313.jpeg?im_w=1440"
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
          previewImage: "https://a0.muscache.com/im/pictures/e3d5e43d-7a6b-4e3f-bd2c-b32468108895.jpg?im_w=1440"
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
          previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/eeee1ae5-bb73-4150-bff8-9b7e5e89951f.jpeg?im_w=1440"
        },

        {
          ownerId: 5,
          address: "555 Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 41.7645358,
          lng: -126.4730327,
          name: "House #5",
          description: "This is a spot #5",
          price: 555,
          previewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-48511845/original/d80b216f-5fb2-499a-91b2-54d388513695.jpeg?im_w=1440"
        },
        // {
        //   ownerId: 6,
        //   address: "666 Ave",
        //   city: "Los Angeles",
        //   state: "California",
        //   country: "United States",
        //   lat: 42.7645358,
        //   lng: -127.4730327,
        //   name: "House #6",
        //   description: "This is a spot #6",
        //   price: 666,
        //   previewImage: "https://www.pngegg.com/en/png-wsosz"
        // },




     ], {});
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Spots', null, {});
     
  }
};
