/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Rakesh Kumar
module.exports = (sequelize, Sequelize) => {
    const Pizza = sequelize.define("pizza", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        pizza_name: Sequelize.STRING,
        pizza_type: Sequelize.STRING,
        pizza_size: Sequelize.INTEGER,
        orderId: Sequelize.INTEGER
    });

    return Pizza;
}
