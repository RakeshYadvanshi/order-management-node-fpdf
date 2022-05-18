/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/


// code by Yajuvendra 
module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        phone_no: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true
        },
        user_type: Sequelize.STRING,
        password: {
            type: Sequelize.STRING,
            required: true,
        }
    });

    return Customer;
}