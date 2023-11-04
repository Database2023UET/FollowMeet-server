import { createPool } from "mysql";

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "1_Love_BB",
    database: "thigk",
});

pool.query("SELECT * FROM orders", (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    return console.log(results);
});