module.exports = function (app, server) {
  // setup additional authorization keys
  app.use(server.loopback.token({
    headers: ['authorization', 'X-Access-Token', 'x-access-token']
  }));
};
