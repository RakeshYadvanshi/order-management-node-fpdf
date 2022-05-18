/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Rakesh Kumar
module.exports = (sequelize, Sequelize) => {
    const PizzaToppings = sequelize.define("pizza_toppings", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        topping_type: Sequelize.STRING,
        topping: Sequelize.STRING
    });

    return PizzaToppings;
}