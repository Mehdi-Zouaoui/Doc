import {snippetContentModel} from './snippetContent.model';
import {CategoryModel} from "./category.model";

export class SnippetsModel {
  constructor(public title: string, public body: snippetContentModel[] , public categories:Array<string> ) {}

}

