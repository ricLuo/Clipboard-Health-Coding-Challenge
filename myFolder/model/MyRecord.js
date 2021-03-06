import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MyRecord = new Schema({
  location: String,
  education: String,
  department: String,
  turnover: String,
  experience: String,
  training: String,
  patientNurseRatio: String,
  salary: String,
  Shift_length: String,
  shift_name: String,
  other: String,
  job_type: String,
  special_skills: String,
  recommoend_your_department: String,
  How_did_you_hear: String,
  start_date_UTC: String,
  submit_date_UTC: String,
  lat: Number,
  lng: Number
}, {
  collection:'MyRecords'
});


export default mongoose.model('MyRecord', MyRecord);
