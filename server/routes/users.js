const { authenticateToken } = require("../auth");
const router = require("express").Router();
const ctrl = require("../controllers/usersCtrl");

router.post("/login", ctrl.login);
router.post("/signup", ctrl.signup);
router.get("/", ctrl.allUsers);
router.get("/myprofile", authenticateToken, ctrl.getUser);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", authenticateToken, ctrl.deleteUser);
// router.post("/token", ctrl.token);

module.exports = router;
