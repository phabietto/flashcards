import type { Deck } from "./deck";
import { DeckMode } from "./enums";

export class DeckStatus {
    constructor() {

    }

    Mode: DeckMode = DeckMode.Undefined;
    Deck: Deck = null;

    hasPendingChanges = (deck: Deck[]) : boolean => {
        return deck.some((o) => o.HasPendingChanges);
    }

}