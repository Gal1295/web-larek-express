class NotFoundError extends Error {
  public readonly statusCode = 404;

  constructor(message: string = 'NotFoundError') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
