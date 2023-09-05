const path = require("path");
const fs = require("fs")

/**
 * this is required to working with history mode and github pages
 * so insted of custom 404 error page we will show same index.html
 */
fs.cpSync(path.join(__dirname, "dist", "index.html"),path.join(__dirname, "dist", "404.html"))