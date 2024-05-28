import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
  { id: 1, text: "Todo 1", completedAt: new Date() },
  { id: 2, text: "Todo 2", completedAt: null },
];

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).send({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    todo ? res.json(todo) : res.status(404).send("Todo not found");
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).send({ error });

    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) return res.status(400).send({ error });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo) return res.status(404).send("Todo not found");

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    return res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).send({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo) return res.status(404).send("Todo not found");

    const deleted = await prisma.todo.delete({
      where: { id },
    });

    deleted
      ? res.json(todo)
      : res.status(400).send(`Todo with id ${id} not found`);
  };
}
