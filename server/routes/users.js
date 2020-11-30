const router = require("express").Router();
const ctrl = require("../controllers/usersCtrl");

router.get("/login", ctrl.login);
router.post("/signup", ctrl.signup);
router.get("/", ctrl.allUsers);
router.get("/:id", ctrl.getUser);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

module.exports = router;
