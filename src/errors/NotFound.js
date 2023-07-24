import HttpException from "./HttpException.js";

class NotFound extends HttpException {
    constructor(message) {
        const statusCode = 404;
        const errors = message || "Not Found!";
        super(statusCode, errors);
    }
}

export default NotFound;
