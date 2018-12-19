//helper file for oraConnect.js
var conn = {
    user: "user name",
    password: "password",
    connectString: "location:port/service name"
}


var connClose = (connection) =>{
    connection.close((err) => {
        if (err) {
            console.log('error closing connection!');
        }
        else {
            console.log('connection closed successfully!')
        }
    })
}
module.exports = {
    conn,
    connClose
}