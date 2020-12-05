/**
 * Omits and error to the user without a traceback, and exits the process with the given exitType
 */
const error = (errorMessage, exitType) => {
    console.error(`Error: ${errorMessage}`);
    return process.exit(exitType);
};

module.exports = {
    error,
};
