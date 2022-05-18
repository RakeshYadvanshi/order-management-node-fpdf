/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

//  code by Yajuvendra
module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        street_num: Sequelize.STRING,
        street_name: Sequelize.STRING,
        postalcodeId: Sequelize.INTEGER,
        customerId: Sequelize.INTEGER,
        
    });

    return Address;
}