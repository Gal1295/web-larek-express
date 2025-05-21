class NotFoundError extends Error {
  public readonly statusCode = 404;

  constructor(message: string = 'Ресурс не найден') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
