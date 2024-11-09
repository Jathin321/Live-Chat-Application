const express = require("express");
const router = express.Router();

router.post(
    "/loginuser",
    async (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      try {
        let userdata = global.users.find((user) => {
            if(user.email === email)
                return user;
        })
        if (!userdata) {
          return res.status(400).json({ error: "Email not matched" });
        }
        else if (userdata.password !== password) {
          return res.status(400).json({ error: "Wrong Password" });
        }
        else{
          res.json({ success: true, user: userdata.name});}
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    }
  );
  
  module.exports = router;