/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/
//  code by Yajuvendra
module.exports = (sequelize, Sequelize) => {
    const PostalCode = sequelize.define("postalcode", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        postalCode: Sequelize.STRING,
        cityId: Sequelize.INTEGER,
    });

    return PostalCode;
}