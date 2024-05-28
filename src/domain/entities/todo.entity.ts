export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: { [key: string]: any }) {
    const { id, text, completedAt } = obj;

    if (!id) throw "id is required";
    if (!text) throw "text is required";

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (isNaN(newCompletedAt.getTime())) throw "completedAt is invalid";
    }

    return new TodoEntity(id, text, completedAt);
  }
}
