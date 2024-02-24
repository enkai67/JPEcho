import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localInstance3306',
    user: 'root',
    password: 'password',
    database: 'jpEcho',
});

const connectToDatabase = async () => {
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

const disconnectFromDatabase = async () => {
    return new Promise((resolve, reject) => {
        connection.end((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

const executeQuery = async (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

export default {
    connectToDatabase,
    disconnectFromDatabase,
    executeQuery,
};
