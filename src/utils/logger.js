const logger = (message, level = 'info') => {
    const timestamp = new Date().toISOString();
    console.log(`[${level.toUpperCase()}] ${timestamp} - ${message}`);
};

module.exports = { logger };