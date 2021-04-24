/**
 * Exits the process using console.error() and process.exit()
 * @param  {string} errorMessage The error message
 * @param {number} exitType The process exit type
 * @returns {void} This will exit the process with the given exitType
 */
const error = (errorMessage, exitType) => {
    console.error(`Error: ${errorMessage}`);
    return process.exit(exitType);
};

module.exports = {
    error,
};
