const User = require("../Entities/User");

exports.create = async (data) => {
  return await User.create(data);
};
exports.getAll = async (filter) => {
  return await User.find({ crewIds: filter });
};

exports.get = async (id) => {
  return await User.findById(id);
};

exports.getUser = async (data) => {
  const { username } = data;
  return await User.findOne({ username });
};

exports.update = async (User_id, data) => {
  return await User.findByIdAndUpdate(User_id, data, { new: true });
};

exports.delete = async (User_id) => {
  return await User.findByIdAndRemove(User_id);
};
