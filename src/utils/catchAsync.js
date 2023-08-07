export default function catchAsync() {
    return (req, res, next) => {
        catchAsync(req, res, next).catch(next);
    };
}
