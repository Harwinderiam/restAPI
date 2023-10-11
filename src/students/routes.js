const { Router } = require("express");
const router = Router();
const controller = require('./controller')
router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentsById);
module.exports = router;