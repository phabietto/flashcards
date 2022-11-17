import { writable } from "svelte/store";
import { DeckStatus } from "../models/deckStatus";

export const deckStatus = writable(new DeckStatus());