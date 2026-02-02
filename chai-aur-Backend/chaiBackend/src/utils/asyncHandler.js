// Wrapper function to handle async route errors
// Prevents server crash caused by unhandled promise rejections
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Convert async function into a promise
        // If it fails, forward error to Express error middleware
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };





// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }