var liveServer = require("live-server");
var params = {
  port: 3000, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./", // Ensure root is relative to the current directory
  open: true, // Automatically opens the browser
  ignore: "scss,my/templates", // comma-separated string for paths to ignore
  file: "index.v2.html", // Serve this file for all 404s (useful for SPAs)
  wait: 1000, // Wait for changes before reloading
  mount: [["/components", "./node_modules"]], // Mount a directory to a route
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [(req, res, next) => next()], // Middleware for custom handling
};

liveServer.start(params);
