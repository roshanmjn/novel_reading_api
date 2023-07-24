class HttpException extends Error {
    statusCode;
    status;
    errors;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = "error";
        this.errors = message;
    }
}

export default HttpException;
