'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'noTelp',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'tglLahir',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'tempatLahir',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'imageUrl',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'noTelp'),
      queryInterface.removeColumn('Users', 'tglLahir'),
      queryInterface.removeColumn('Users', 'tempatLahir'),
      queryInterface.removeColumn('Users', 'imageUrl')
    ]);
  }
};
