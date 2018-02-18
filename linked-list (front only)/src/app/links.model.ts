import { Tag } from './tags.model';

export class Link {
    constructor(public id: string, public title: string, public url: string, public tags: Tag, public shared: boolean){}
}