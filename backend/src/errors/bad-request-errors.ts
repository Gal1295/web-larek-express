class BadRequestError extends Error {
  public readonly statusCode = 400;

  constructor(message: string = 'Переданы неверные данные') {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
