import { Template } from "./enums";

export class Card {
    constructor(json: any) {
        if(json) {
            this._raw = json;

            if(json.front){
                this.Front = new CardContent(json.front);
            }
            if(json.back){
                this.Back = new CardContent(json.back);
            }
            if(typeof(json.tags) === 'string') {
                this.Tags = json.tags.split(',');
            }else if(json.tags && json.tags.constructor === Array) {
                this.Tags = json.tags;
            }
        }
    }
    _raw: any;

    Front: CardContent = null;
    Back: CardContent = null;
    Tags: string[] = [];
}

export class CardContent {
    constructor(json: any) {
        if(json) {
            this._raw = json;

            this.Template = json.template || Template.Text;
            this.Lang = json.lang || 'en';
            this.Content = json.content || '';
            if(json.media && json.media.constructor === Array) {
                json.media.map(o => new Media(o));
            }
        }
    }
    _raw: any;

    Template: Template = Template.Text;
    Lang: string = 'en';
    Content: string = '';
    Media: Media[] = [];
}

export class Media {
    constructor(json: any) {
        if(json) {
            this._raw = json;

            this.Template = json.template || Template.Undefined;
            this.Text = json.text || '';
            if(json.sources && json.sources.constructor === Array) {
                this.Sources = json.sources.map(o => new Source(o));
            }
        }

    }
    _raw: any;

    Template: [Template.Audio|Template.Image] = null;
    Text: string = '';
    Sources: Source[] = []; 
}

export class Source {
    constructor(json: any) {
        if(json) {
            this._raw = json;

            this.Link = json.link || '';
            this.Type = json.type || '';
        }
    }
    _raw: any;

    Link: string = '';
    Type: string = '';
}