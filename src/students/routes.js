const { Router } = require("express");
const router = Router();
const controller = require('./controller')

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentsById);
router.post("/", controller.createUser);
router.put("/:id",controller.updateUser)

module.exports = router;