/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/
//  code by Yajuvendra
module.exports = (sequelize, Sequelize) => {
    const Province = sequelize.define("province", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        province: Sequelize.STRING,
        countryId: Sequelize.INTEGER,
    });

    return Province;
}