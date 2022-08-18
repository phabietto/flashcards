import type { Deck } from "./deck";
import { DeckMode } from "./enums";

export class DeckStatus {
    constructor(deck: Deck = null, mode: DeckMode = DeckMode.Flashcards) {
        if(deck) {
            this.Deck = deck;
            this.Mode = mode;
        }
    }

    Mode: DeckMode = DeckMode.Undefined;
    Deck: Deck = null;

    hasPendingChanges = (deck: Deck[]) : boolean => {
        return deck.some((o) => o.HasPendingChanges);
    }

}