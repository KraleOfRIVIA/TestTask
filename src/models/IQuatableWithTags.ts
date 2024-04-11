import {IQuatable} from "./IQuatable.ts";

export interface ITagsQuatable {
[tag:string] : IQuatable[]
}