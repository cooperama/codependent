const router = require("express").Router();
const ctrl = require("../controllers/codegoriesCtrl");

router.get("/", ctrl.allCodegories);
router.get("/:id", ctrl.getCodegory);
router.post("/", ctrl.createCodegory); // only for admin
router.put("/:id", ctrl.updateCodegory); // only for admin
router.delete("/:id", ctrl.deleteCodegory); // only for admin

module.exports = router;
