import {DisplayContentModel} from "./DisplayContent.model";

export class DisplayModel {
  constructor(
    public title: string,
    public sanitizeTitle: string,
    public body: Array<DisplayContentModel>
  ) { }
}
