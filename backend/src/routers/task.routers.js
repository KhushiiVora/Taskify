const express = require("express");
const router = express.Router();

const {
  getTasks,
  postCreateTask,
  deleteTask,
  postEditState,
  patchEditTask,
  patchEditAllStatesTrue,
} = require("../controllers/task.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const { taskValidationSchema } = require("../validators/task.validators");
const taskMiddleware = validateSchema(taskValidationSchema);

router.get("/:categoryId/", getTasks);
router.post("/:categoryId/create", taskMiddleware, postCreateTask);
router.delete("/delete/:categoryId/:taskId", deleteTask);

router.patch("/edit/:categoryId/allStatesTrue", patchEditAllStatesTrue);
router.post("/edit/:taskId/state", postEditState);
router.patch("/edit/:taskId/", patchEditTask);

module.exports = router;
