/*
developed by 
Rakesh Kumar(8786950)
Yajuvendra(8784190)
*/

// code by Rakesh Kumar
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Country = require("./country.model")(sequelize, Sequelize);
db.Province = require("./province.model")(sequelize, Sequelize);
db.PostalCode = require("./postalcode.model")(sequelize, Sequelize);
db.City = require("./city.model")(sequelize, Sequelize);
db.Address = require("./address.model")(sequelize, Sequelize);

db.Order = require("./order.model")(sequelize, Sequelize);
db.Payment = require("./payment.model")(sequelize, Sequelize);
db.Pizza = require("./pizza.model")(sequelize, Sequelize);
db.PizzaToppings = require("./pizza_toppings.model")(sequelize, Sequelize);
db.Address = require("./address.model")(sequelize, Sequelize);

db.PizzaHasToppings = require("./pizza_has_toppings.model")(sequelize, Sequelize);


db.Country.hasMany(db.Province)
db.Province.belongsTo(db.Country)


db.Province.hasMany(db.City)
db.City.belongsTo(db.Province)


db.City.hasMany(db.PostalCode)
db.PostalCode.belongsTo(db.City)


db.PostalCode.hasMany(db.Address)
db.Address.belongsTo(db.PostalCode)

db.User.hasOne(db.Address)
db.Address.belongsTo(db.User)


db.Order.belongsTo(db.User);
db.User.hasOne(db.Order);


db.Order.hasMany(db.Pizza);
db.Pizza.belongsTo(db.Order);


db.Pizza.belongsToMany(db.PizzaToppings, { through: db.PizzaHasToppings });
db.PizzaToppings.belongsToMany(db.Pizza, { through: db.PizzaHasToppings });


module.exports = db;
