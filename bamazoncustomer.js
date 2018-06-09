var mysql = require('mysql')

var inquirer = require('inquirer')

require('dotenv').config()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3310,
    password: process.env.MYSQL_PASS,
    database: 'bamazonDB'

});

connection.connect(function (err) {
    if (err) throw err
})

connection.query('SELECT * FROM products', function (err, results) {
    console.log(results)
    inquirer.prompt([{
            name: 'Q1',
            type: 'input',

            message: 'what is the ID of the produt you want to buy?'
        },
        {
            name: 'Q2',
            type: 'input',

            message: 'How many would you like to buy?'
        },

    ]).then(function (answers) {
        // if there is not enough in stock, tell the customer there is not enough of that item in stock
        for (var i = 0; i < results.length; i++) {
            if (results[i].ID == answers.Q1) {
                // if there is enough in stock, sell the item and update quantity in DB and tell how much the customer was charged for their purchase. 

                console.log(results[i])
                if (results[i].stock_quantity >= answers.Q2) {
                    var newStockQuantity = results[i].stock_quantity - answers.Q2
                    var total = results[i].stock_quantity*answers.Q2
                    connection.query('UPDATE products SET ?  WHERE ?', [{
                        stock_quantity: newStockQuantity
                    }, {
                        ID: answers.Q1
                    }], function (err, result) {
                        if(err) throw err
                        
                        
                    console.log('purchase complete. We charge your card $'  + total)
                        
                    })
                    connection.end()


                }
                if (results[i].stock_quantity < answers.Q2) {
                    console.log('insufficient Quantity!')
                    connection.end()
                    
                }
            }

        }
    })



})