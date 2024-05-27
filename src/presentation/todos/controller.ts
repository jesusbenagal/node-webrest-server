import { Request, Response } from "express";

const todos = [
  { id: 1, name: "Todo 1", completedAt: new Date() },
  { id: 2, name: "Todo 2", completedAt: null },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).send({ error: "ID argument is not a number" });

    const todo = todos.find((todo) => todo.id === Number(id));

    todo ? res.json(todo) : res.status(404).send("Todo not found");
  };

  public createTodo = (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) return res.status(400).send({ error: "Name is required" });

    const newTodo = { id: todos.length + 1, name, completedAt: null };

    todos.push(newTodo);

    return res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const { name, completedAt } = req.body;

    if (isNaN(id))
      return res.status(400).send({ error: "ID argument is not a number" });

    if (!name) return res.status(400).send({ error: "Name is required" });

    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) return res.status(404).send("Todo not found");

    todo.name = name ?? todo.name;

    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt ?? todo.completedAt));

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).send({ error: "ID argument is not a number" });

    const todoIndex = todos.findIndex((todo) => todo.id === Number(id));

    if (todoIndex === -1) return res.status(404).send("Todo not found");

    todos.splice(todoIndex, 1);

    return res.status(204).send();
  };
}
