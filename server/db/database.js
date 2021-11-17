const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getUserById = function () {

  // Test connect to db by changing the sqlString and comment out place holder db return

  // const sqlString = `SELECT * FROM users WHERE id = $1`;
  // return pool
  //   .query(sqlString, [userId])
  //   .then(res => {
  //     if (res.rows.length === 0) {
  //       return null;
  //     }
  //     return res.rows[0];
  //   })
  //   .catch(e => { console.error(e) });

  // PLACE HOLDER DB RETURN
  return new Promise((res, rej) => {
    return res("I'm a user!");
  })
}
exports.getUserById = getUserById;
