import { ValidationError, DatabaseError } from "sequelize";
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err && err.statusCode) {
        return res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            errors: Array.isArray(err.message)
                ? err.message
                : [{ message: err.message }],
        });
    }
    if (err && err instanceof ValidationError) {
        return res.status(403).json({
            status: "error",
            statusCode: 403,
            errors: [{ message: err.errors[0].message }],
        });
    }
    if (err && err instanceof DatabaseError) {
        return res.status(403).json({
            status: "error",
            statusCode: 403,
            code: err.code,
            errno: err.errno,
            errSql: err.sql,
            query: sql,
            errors: [{ message: err.sqlMessage }],
        });
    }
    return res.status(500).json({
        status: "error",
        statusCode: 500,
        errors: [{ message: "Something went wrong!" }],
    });
};

export default errorHandler;
