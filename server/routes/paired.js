const router = require("express").Router();
const ctrl = require("../controllers/pairedCtrl");

router.get("/", ctrl.index);
router.get("/:id", ctrl.getPaired);
router.post("/", ctrl.createPaired);
router.post("/sendrequest", ctrl.sendRequest);
router.put("/:id", ctrl.updatePaired);
router.delete("/:id", ctrl.deletePaired);

module.exports = router;
