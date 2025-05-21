class ConflictError extends Error {
  public readonly statusCode = 409;

  constructor(message: string = 'ConflictError') {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
