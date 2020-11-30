const router = require("express").Router();
const ctrl = require("../controllers/postsCtrl");

router.get("/", ctrl.allPosts);
router.get("/:id", ctrl.getPost);
router.post("/", ctrl.createPost);
router.put("/:id", ctrl.updatePost);
router.delete("/:id", ctrl.deletePost);

module.exports = router;
