import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
});


const SubSection = mongoose.model("SubSection", subSectionSchema);

export default SubSection;