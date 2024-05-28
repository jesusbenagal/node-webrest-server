import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const repository = new TodoRepositoryImpl(datasource);

    const TodoController = new TodosController(repository);

    router.get("/", TodoController.getTodos);
    router.get("/:id", TodoController.getTodoById);
    router.post("/", TodoController.createTodo);
    router.put("/:id", TodoController.updateTodo);
    router.delete("/:id", TodoController.deleteTodo);

    return router;
  }
}
