const options = {
    client: 'sqlite3',
    connection: {
     filename: './database/mydb.sqlite'
    }, 
    useNullAsDefault: true
};

module.exports = { options };