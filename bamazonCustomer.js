// npm init ran to track packages
// run npm install first

var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to sql database

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  display();
  // what();
  // howMuch();
  // notEnough();
  // order();
});

function display() {
  var query = connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // console.log(query.sql);
    console.log("\n\n PRODUCTS TABLE \n\n");
    console.table(res);
    // console.log("\n\nWhat product would you like to order?\n\n");
    // connection.end();
    what();
  });
}

function what() {
  inquirer
    .prompt({
      name: "what",
      type: "input",
      message: "\n\nWhat is the ID of the item you would you like to buy?",
    })
    .then(function (answer) {
      var idNumber = answer.what;
      var query = connection.query(
        "SELECT * FROM products WHERE ?",
        { id: idNumber },
        function (err, res) {
          if (err) throw err;
          // console.table(res);
          // console.log(query.sql);
          if (res[0].stock_quantity > 0) {
            console.table(res);
            // console.log(res[0].stock_quantity);
            howMuch(idNumber);
          }
          if (res[0].stock_quantity < 1) {
            // console.table(res);
            console.log("Insufficient quantity!");
            what();
          }

          // Still need to figure out how to handle undefined id number
          //    else {
          //     // console.table(res);
          //     console.log("Id number not found. Try again.");
          //     // what();
          //   }

          // connection.end();
        }
      );
    });
}

function howMuch(identifier) {
  inquirer
    .prompt({
      name: "amount",
      type: "number",
      message: "How much would you like to buy?",
    })
    .then(function (answer) {
      var number = answer.amount;

      // Determine cost
      var query1 = connection.query(
        "SELECT * FROM products WHERE ?",
        { id: identifier },
        function (err, res) {
          if (err) throw err;
          var cost = number * res[0].price;
          console.log("That will be $" + cost + ".");
        }
      );

      connection.end();
      // Subtract from total number
      // var query2 = connection.query("SUBTRACT")
    });
}
