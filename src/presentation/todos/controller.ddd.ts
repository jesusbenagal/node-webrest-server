import { Request, Response } from "express";

import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).send({ error });

    const todo = await this.todoRepository.create(createTodoDto!);

    return res.status(201).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) return res.status(400).send({ error });

    const todo = await this.todoRepository.updateById(updateTodoDto!);

    return res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deleted = await this.todoRepository.deleteById(id);

    return res.json(deleted);
  };
}
