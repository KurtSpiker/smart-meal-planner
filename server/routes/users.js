const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // logs in user and returns their information
  // http://localhost:4000/api/users/login/1
  router.get("/login/:id", (req, res) => {

    res.cookie('user_id', req.params.id);
    const userId = req.cookies["user_id"];

    db.getUserDetails(userId)
      .then((userDetails) => {
        console.log("GET to users/login/:id - Success.");
        res.send(userDetails);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // logs out user
  // http://localhost:4000/api/users/logout
  router.get("/logout", (req, res) => {
    res.clearCookie('user_id');
    res.send("cleared cookie");
  })

  return router;
};
