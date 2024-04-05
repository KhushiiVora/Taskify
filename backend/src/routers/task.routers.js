const express = require("express");
const router = express.Router();

const {
  getTasks,
  postCreateTask,
  deleteTask,
} = require("../controllers/task.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const { taskValidationSchema } = require("../validators/task.validators");
const taskMiddleware = validateSchema(taskValidationSchema);

router.get("/:categoryId/", getTasks);
router.post("/:categoryId/create", taskMiddleware, postCreateTask);
router.delete("/delete/:categoryId/:taskId", deleteTask);

module.exports = router;
