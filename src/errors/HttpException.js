class HttpException extends Error {
    statusCode;
    status;
    errors;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = "error";
        this.errors = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default HttpException;
