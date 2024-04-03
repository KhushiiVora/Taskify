const mongoose = require("mongoose");
const createError = require("http-errors");

class ErrorService {
  error = {
    message: "Sorry! Something went wrong. Please try again!",
    status: 500,
  };

  handleError(error) {
    if (error instanceof mongoose.Error.ValidationError || error?.code) {
      this.handleMongooseError(error);
    } else if (error instanceof Error) {
      this.handleCustomError(error);
    }
    return this.error;
  }

  handleCustomError(error) {
    this.error.message = error.message;
    this.error.status = 400;
    return this.error;
  }
  // handleHttpError(httpError) {
  //   const err = createError(403, result.error);
  // }

  handleJoiError(joiError) {
    this.error.message = joiError.details[0].message;
    if (this.error.message.includes("pattern")) {
      const field = this.error.message.split(" ");
      if (field[0] === `"name"` || field[0] === `"categoryName"`)
        this.error.message =
          field[0] + " should only contain letters, numbers, spaces, peroid(.) and underscore(_).";
      else
        this.error.message =
          field[0] + " should only contain letters and numbers.";
    }
    this.error.status = 400;
    return this.error;
  }

  handleMongooseError(mongooseError) {
    if (mongooseError.errors) {
      this.error.message =
        mongooseError.errors[Object.keys(mongooseError.errors)[0]].message;
      this.error.status = 400;
    } else if (mongooseError.code === 11000) {
      const [[field, value]] = Object.entries(mongooseError.keyValue);
      if (field.includes("username") || field.includes("email")) {
        this.error.message = `An account with '${value}' already exists.`;
      } else if (field.includes("code")) {
        this.error.message = `A Workspace with code '${value}' already exists.`;
      }
      this.error.status = 409;
    }
    console.log(this.error);
    return this.error;
  }
}

module.exports = ErrorService;
