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
  console.log(
    "\n WELCOME TO THE BAMAZON APP!\n\n * Press CTRL-C at any time to exit the app *"
  );
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
      var query = connection.query(
        "SELECT * FROM products WHERE ?",
        { id: identifier },
        function (err, res) {
          if (err) throw err;
          var cost = number * res[0].price;
          var difference = res[0].stock_quantity - number;
          if (difference >= 0) {
            // console.log(difference);
            console.log("\n\nThat will be $" + cost + ".");
            // Still need to update database, but getting 'argument callback must be funcion when provided' error
            updater(difference, identifier);
          }
          if (difference < 0) {
            console.log("\n\n Insufficient quantity!\n\n");
            howMuch(identifier);
          }
          // connection.end();
        }
      );
    });
}

function updater(diff, ident) {
  var query = connection.query(
    "UPDATE products SET stock_quantity = ? WHERE id = ?",
    [diff, ident],
    function (err, res) {
      if (err) throw err;
      // console.log(query.sql);
      console.log("\n\n Table updated after purchase.");
      display();
      // console.table(res);
      // connection.end();
    }
  );
  // console.log(query.sql);
}
