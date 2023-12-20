import { Exception } from "./Exception";

class NotFoundException extends Exception {
  constructor(message) {
    super(message ? message : "The required content was not found.");

    this.name = "NotFoundException";
  }
}

export { NotFoundException };
