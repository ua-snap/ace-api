module.exports = function (app, loopback) {
  // setup additional authorization keys
  app.use(loopback.token({
    headers: ['authorization', 'X-Access-Token', 'x-access-token']
  }));
};
