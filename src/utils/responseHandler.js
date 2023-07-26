export default (response) => ({
    status: 200,
    success: true,
    data: typeof response === "object" ? response : { ...response },
});
