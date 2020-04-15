// npm init ran to track packages
// run npm install first

var mysql = require("mysql");
// var inquirer = require("inquirer");

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
    console.log(query.sql);
    console.table(res);
    connection.end();
    // what();
  });
}

// function what() {
//   inquirer
//     .prompt({
//       name: "what",
//       type: "input",
//       message: "What is the ID of the item(s) you would you like to buy?",
//     })
//     .then(function (answer) {
//         idNumber = answer.what;
//         if (query.sql.id[idNumber]) {
//             if
//             howMuch();
//         }

//         else (
//             console.log("That item is no longer available.")
//         )
//     });
// }
