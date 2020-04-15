# Bamazon app

### Background

This app is operated from the terminal and enables a customer to view a prepopulated database of products stored in a sql database, select which item to purchase and how much, and the cost of the purchase is shown to the customer and the database is updated. It is broken up as a series of function calls within functions to progress through the purchase process. In this case, after the purchase is completed, the purchase process is restarted.

### Instructions

First, clone the repository to your computer. A sql program must be installed, the schema.sql file run to create the database and products table, then the seeds.sql file must be run to populate the table with products. In this case, MySQL and MySQL Workbench is used, and one way to upload data shown in the video demo.

Next, open the terminal from within the cloned repository, or navigate to the repository. Node must be installed to run this program. 'npm intall' to install required node packages, mysql and inquirer. Then, start the program with 'node bamazonCustomer' or 'node bamazonCustomer.js'. Press control-C at any time to exit.

Respond with the item ID, then item amount to move through different SQL query functions which will return the cost and update the stock amount after the purchase. The updated table is displayed and the process is restarted requesting the ID of the item you would like to purchase.

### Video Demonstration

![Database Creation](createDatabase.gif)

![Purchase Demo](runApp.gif)

![Insufficient Stock](insuffQuant.gif)

### Built with

- [Node](https://nodejs.org/en/) - A library to use javascript outside of a browser
- [Javascript](https://www.javascript.com/) - coding language for creating interactive websites and apps
- [MySQL](https://dev.mysql.com/downloads/mysql/) - SQL database for storing tables of data
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL GUI for visualizing mysql databases
- [mysql](https://www.npmjs.com/package/mysql) - node library - package for querying sql databases
- [inquirer](https://www.npmjs.com/package/inquirer) - node library - package for prompting users and acquiring responses

### Authors

- **Kate Jamboretz** - _Initial work_ - [katejamboretz](https://github.com/katejamboretz)

### Acknowledgements

- UC Berkeley Extension Full Stack Development 2020 Instructor, TAs and classmates
- [PurpleBooth README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
