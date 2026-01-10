const { default: mongoose } = require("mongoose");

const HomeSchema = mongoose.Schema({
  FullName: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: Number, required: true },
});

module.exports = mongoose.model("Home", HomeSchema);








//   save() {
//   }
//   static find(callback) {
//   }
//   static fetchid(studentid, callback) {
//   }
//   static deleteid(studentid, callback) {
// };
// }
