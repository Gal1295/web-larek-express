class InternalServerError extends Error {
  public readonly statusCode = 500;

  constructor(message: string = 'InternalServerError') {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export default InternalServerError;
