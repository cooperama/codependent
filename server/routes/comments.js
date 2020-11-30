const router = require("express").Router();
const ctrl = require("../controllers/commentsCtrl");

router.get("/", ctrl.allComments);
router.get("/:id", ctrl.getComment);
router.post("/", ctrl.createComment);
router.put("/:id", ctrl.updateComment);
router.delete("/:id", ctrl.deleteComment);

module.exports = router;
