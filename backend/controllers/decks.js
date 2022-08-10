import Deck from '../models/deck.js';

const getAllDecks = async (req, res) => {
    try {
        const decks = await Deck.find();
        res.status(200).json(decks);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const createDeck = async (req,  res) => {
    const body = req.body;
    const deck = new Deck({ ...body });
    try {
        await deck.save();
        res.status(201).json(deck);
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};

export { getAllDecks };