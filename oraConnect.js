/***************************************************************************
 * Module Name - oraConnect.js
 * Following program gives an idea on how to connect to Oracle DB using Node
 **************************************************************************/
var oracledb = require('oracledb');
var dbConfig = require(__dirname + '/dbconfig');
var fs = require('fs');

//create connection
oracledb.getConnection({
    user: dbConfig.conn.user,
    password: dbConfig.conn.password,
    connectString: dbConfig.conn.connectString
},(err, connection) =>{
    if(err){
        console.log('Error:',err);
    }
    else{
        console.log("connection successful!");
        connection.execute("SELECT * FROM table", (err, result) =>{
            if(err){
                dbConfig.connClose(connection);
                console.log(err);
                return
            }
            else{
                var data = result.rows; //result.rows returns an array
                data.forEach( el => {
                    fs.appendFileSync('table.dat',el)
                    fs.appendFileSync('table.dat','\n')
                })
                //closing connection here will make sure that it will only run in async fashion after the result has been 
                //received from DB
                dbConfig.connClose(connection);
            }

        })
    }
})




/* Package.json
{
    "name": "connectoracle",
        "version": "1.0.0",
            "description": "",
                "main": "oraConnect.js",
                    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "\"Ashish Bhalla\"",
        "license": "ISC",
            "dependencies": {
        "oracledb": "^3.0.1"
    }
}
*/