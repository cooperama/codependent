const router = require("express").Router();
const ctrl = require("../controllers/availCtrl");

router.get("/", ctrl.index);
router.get("/:id", ctrl.getAvail);
router.post("/", ctrl.create);
router.put("/:id", ctrl.updateAvail);
router.delete("/:id", ctrl.deleteAvail);

module.exports = router;
