import { mongoose } from "mongoose";

const referenceSchema = mongoose.Schema({
    "name": { type: String, required: true},
    "link": { type: String, required: true}
});

export default mongoose.model('Reference', referenceSchema);