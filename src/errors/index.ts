export class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode = 400) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
