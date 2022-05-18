/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Yajuvendra
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        order_date_time: Sequelize.DATE,
        order_description: Sequelize.STRING,
        customerId: Sequelize.INTEGER,
        paymentId: Sequelize.INTEGER,
        status: Sequelize.STRING,
    });

    return Order;
}
