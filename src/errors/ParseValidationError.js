export const parseValidationError = (req, res, err) => {
    const errors = [];

    err.details?.forEach((error) => {
        errors.push({
            path: error.path[0],
            label: error.context.label,
            message: error.message,
        });
    });

    return res
        .status(422)
        .json({ status: "error", statusCode: 422, errors: errors });
};
