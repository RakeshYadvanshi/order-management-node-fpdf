/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/


//  code by Rakesh Kumar
module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        country: Sequelize.STRING
    });

    return Country;
}



