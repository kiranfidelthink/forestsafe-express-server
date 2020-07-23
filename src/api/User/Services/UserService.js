const User = require("../Entities/User");

exports.create = async (data) => {
  return await User.create(data);
};

exports.getAll = async () => {
  return await User.find();
};

exports.get = async (id) => {
  return await User.findById(id);
};

exports.update = async (User_id, data) => {
  return await User.findByIdAndUpdate(User_id, data, { new: true });
};

exports.delete = async (User_id) => {
  return await User.findByIdAndRemove(User_id);
};
