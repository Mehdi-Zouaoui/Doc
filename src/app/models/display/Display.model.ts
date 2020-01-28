import {DisplayContentModel} from "./DisplayContent.model";
import {CategoryModel} from "./Category.model";

export class DisplayModel {
  constructor(
    public title: string,
    public sanitizeTitle: string,
    public body: Array<DisplayContentModel>,
    public category: Array<CategoryModel>
  ) { }
}
