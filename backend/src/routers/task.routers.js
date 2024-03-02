const express = require("express");
const router = express.Router();

const { getTasks, postCreateTask } = require("../controllers/task.controllers");

router.get("/:categoryId/", getTasks);
router.post("/:categoryId/create", postCreateTask);

module.exports = router;
