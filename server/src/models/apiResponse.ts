class Error {
  code = 0;
  message = '';

  constructor(errorCode = 0, message = '') {
    this.code = errorCode;
    this.message = message;
  }
}

export class ApiResponse {
  status = true;
  error = new Error();
  data = {};

  constructor(data = {}, status = true, error = new Error()) {
    this.status = status;
    this.error = error.code !== 0 ? error : null;
    this.data = data;
  }
}
