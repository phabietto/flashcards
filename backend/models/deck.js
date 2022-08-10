import { mongoose } from "mongoose";

const deckSchema = mongoose.Schema({
    "name": { type: String, required: true},
    "description": { type: String, required: true},
    "lang": { type: String, required: true},
    "author": { type: String, required: true},
    "latestUpdate": { type: Date, default: new Date()}
});

export default mongoose.model('Deck', deckSchema);

// "references": [{
//     "name": "",
//     "link": ""
//   }
// ],
// "cards": []