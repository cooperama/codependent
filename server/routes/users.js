const { authenticateToken } = require("../auth");
const router = require("express").Router();
const ctrl = require("../controllers/usersCtrl");

router.post("/login", ctrl.login);
router.post("/signup", ctrl.signup);
router.post("/token", ctrl.token);
router.get("/", ctrl.allUsers);
router.get("/myprofile", authenticateToken, ctrl.getUser);
// router.get("/myprofile/:id", authenticateToken, ctrl.getUser);
// router.get("/:id", ctrl.getUser);
router.put("/:id", ctrl.updateUser);
// router.put("/:id", authenticateToken, ctrl.updateUser);
router.delete("/:id", authenticateToken, ctrl.deleteUser);

module.exports = router;
