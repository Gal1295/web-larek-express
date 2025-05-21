class ConflictError extends Error {
  public readonly statusCode = 409;

  constructor(message: string = 'Такое значение уже существует') {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
