const express = require("express");
const router = express.Router();

const {
  getTaskCategories,
  postCreateTaskCatogory,
} = require("../controllers/taskCategory.controllers");

const { validateSchema } = require("../middlewares/validate.middlewares");
const {
  taskCategoryValidationSchema,
} = require("../validators/task.validators");
const taskCategoryMiddleware = validateSchema(taskCategoryValidationSchema);

router.get("/:workspaceId/", getTaskCategories);
router.post(
  "/:workspaceId/create",
  taskCategoryMiddleware,
  postCreateTaskCatogory
);

module.exports = router;
