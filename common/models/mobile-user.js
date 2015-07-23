module.exports = function(MobileUser) {
    MobileUser.handleChangeError = function(err) {
    console.warn('Cannot update change records for Todo:', err);
  };
};
