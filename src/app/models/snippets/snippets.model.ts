import {snippetContentModel} from './snippetContent.model';

export class SnippetsModel {
  constructor(public title: string, public body: snippetContentModel[] , public categoryId: number , public id: number) {}

}

