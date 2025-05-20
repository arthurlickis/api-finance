module.exports = { 
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable("transaction", "transactions")
  },

  async down (queryInterface) {
    await queryInterface.renameTable('transaction', 'transactions'); 
  }
};