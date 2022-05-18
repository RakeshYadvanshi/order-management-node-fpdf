/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Yajuvendra
module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        payment_method: Sequelize.STRING,
        payment_date: Sequelize.DATE,
        payment_amount: Sequelize.DECIMAL,
        customerId: Sequelize.INTEGER,
    });
    return Payment;
}