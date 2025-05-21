class InternalServerError extends Error {
  public readonly statusCode = 500;

  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export default InternalServerError;
