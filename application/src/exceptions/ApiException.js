import { Exception } from "./Exception";

class ApiException extends Exception {
  constructor(message) {
    super(message ? message : "Error on API request.");

    this.name = "ApiException";
  }
}

export { ApiException };
