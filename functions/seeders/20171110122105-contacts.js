'use strict';

var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let fake_rows = 50;
    let rows = [];
    for (var i = 1; i <= fake_rows; i++) {
      rows.push({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    console.log(rows)
    return queryInterface.bulkInsert('Contacts', rows, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Contacts', null, {});
  }
};
