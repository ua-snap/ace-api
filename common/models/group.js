module.exports = function(Group) {
    Group.handleChangeError = function(err) {
    console.warn('Cannot update change records for Todo:', err);
  };
};
