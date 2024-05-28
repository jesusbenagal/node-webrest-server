export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const retrurnObj: { [key: string]: any } = {};

    if (this.text) retrurnObj.text = this.text;
    if (this.completedAt) retrurnObj.completedAt = this.completedAt;

    return retrurnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(id)) {
      return ["id is required and must be a number", undefined];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date") {
        return ["completedAt must be a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, completedAt)];
  }
}
