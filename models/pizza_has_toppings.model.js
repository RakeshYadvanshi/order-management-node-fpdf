/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/
//  code by Rakesh Kumar
module.exports = (sequelize, Sequelize) => {
    const PizzaHasToppings = sequelize.define("pizza_has_toppings", {
        pizzaToppingId: {
            type: Sequelize.INTEGER, primaryKey: true
        },
        pizzaId: {
            type: Sequelize.INTEGER, primaryKey: true
        },
    });

    return PizzaHasToppings;
}
