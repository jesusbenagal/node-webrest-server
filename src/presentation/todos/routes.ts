import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes {
  static get routes(): Router {
    const router = Router();

    const TodoController = new TodosController();

    router.get("/", TodoController.getTodos);
    router.get("/:id", TodoController.getTodoById);
    router.post("/", TodoController.createTodo);
    router.put("/:id", TodoController.updateTodo);
    router.delete("/:id", TodoController.deleteTodo);

    return router;
  }
}
