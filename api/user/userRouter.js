const router = require("express").Router();
const Users = require("../user/usermodel.js");
const restricted = require("../middleware/restricted-middleware.js");

router.get("/:userId", restricted, (req, res) => {
  Users.findById(req.params.userId)
    .then( user => {
      res.status(200).json({ data: user });
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving user!", errMessage: err.message });
    });
});

// update functionality later
// router.put("/user:userId", restricted, (req, res) => {

// });

// delete functionality later
// router.delete("/user:userId", restricted, (req, res) => {

// });

module.exports = router;