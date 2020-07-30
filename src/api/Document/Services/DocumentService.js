const Documents = require("../Entities/Document");

exports.create = async (data) => {
  return await Documents.create(data);
};

exports.getAll = async () => {
  return await Documents.find();
};

exports.update = async (Document_id, data) => {
  return await Documents.findByIdAndUpdate(Document_id, data, { new: true });
};

exports.delete = async (Document_id) => {
  return await Documents.findByIdAndRemove(Document_id);
};
