const Document = require("../Entities/Document");

exports.create = async (data) => {
  return await Document.create(data);
};

exports.getAll = async () => {
  return await Document.find();
};

exports.get = async (id) => {
  return await Document.findById(id);
};

exports.update = async (Document_id, data) => {
  return await Document.findByIdAndUpdate(Document_id, data, { new: true });
};

exports.delete = async (Document_id) => {
  return await Document.findByIdAndRemove(Document_id);
};
