import { Card } from "./card";

export class Deck {
    constructor(json: any = null){
        if(json){
            this._raw = json;
            
            this.Name = json.name || '';
            this.Description = json.description || '';
            this.Lang = json.lang || '';
            this.Author = json.author || '';
            this.LastestUpdate = json.latestUpdate || null;
    
            if(json.cards && json.cards.constructor === Array){
                this.Cards = json.cards.map(o => new Card(o));
            }
        }
    }
    _raw: any;

    Name: string = null;
    Description: string = null;
    Lang: string = null;
    Author: string = null;
    LastestUpdate?: Date = null;
    Cards: Card[] = [];

    HasPendingChanges: boolean = false;
}