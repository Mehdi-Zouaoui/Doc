import {DisplayContentModel} from "./DisplayContent.model";
import {CategoryModel} from "./Category.model";

export class DisplayModel {
  key: string;
  constructor(
    public title: string,
    public sanitizeTitle: string,
    public body: Array<DisplayContentModel>,
    public category: Array<CategoryModel>
  ) { }
}
