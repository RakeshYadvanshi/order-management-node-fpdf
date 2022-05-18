/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Yajuvendra
module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        city: Sequelize.STRING,
        provinceId: Sequelize.INTEGER,
    });

    return City;
}