const Files = require("../Entities/File");

exports.create = async (data) => {
  return await Files.create(data);
};

exports.getAll = async () => {
  return await Files.find();
};

exports.update = async (File_id, data) => {
  return await Files.findByIdAndUpdate(File_id, data, { new: true });
};

exports.delete = async (File_id) => {
  return await Files.findByIdAndRemove(File_id);
};
