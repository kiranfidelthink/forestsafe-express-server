const Crews = require("../Entities/Crew");

exports.create = async (data) => {
  return await Crews.create(data);
};

exports.getAll = async () => {
  return await Crews.find();
};

exports.get = async (id) => {
  return await Crews.findById(id);
};

exports.update = async (Crew_id, data) => {
  return await Crews.findByIdAndUpdate(Crew_id, data, { new: true });
};

exports.delete = async (Crew_id) => {
  return await Crews.findByIdAndRemove(Crew_id);
};
