const express = require("express");
const Todo = require("../mongo/models/Todo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const current = await getAsync("added_todos");

  const newValue = (Number(current) || 0) + 1;

  await setAsync("added_todos", newValue);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  return res.status(200).json(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { _id, done } = req.todo;
  const updated = await Todo.findByIdAndUpdate(
    _id,
    { done: !done },
    { new: true }
  );

  return res.status(200).json(updated);
});

const statisticsRouter = express.Router();

statisticsRouter.get("/", async (req, res) => {
  const value = await getAsync("added_todos");
  const result = Number(value) || 0;
  return res.json({ added_todos: result });
});

router.use("/statistics", statisticsRouter);
router.use("/:id", findByIdMiddleware, singleRouter);
module.exports = router;
