import {DisplayContentModel} from "../models/DisplayContent.model";
import {Subject} from "rxjs";

export class DisplayService {
  private menus: DisplayContentModel[] = [
    new DisplayContentModel('un','un',['lorem un','deuxièùme ligne']),
    new DisplayContentModel('deux','deux',['lorem deux','deuxièùme ligne']),
    new DisplayContentModel('trois','trois',['lorem 3','deuxièùme ligne']),
    new DisplayContentModel('épique','epique',['lorem épique','épique ligne']),
  ];
  menusContent = new Subject<DisplayContentModel[]>();

  constructor() { }

  emitContent() {
    this.menusContent.next(this.menus.slice());
  }

  addContent(menu: DisplayContentModel) {
    this.menus.push(menu);
    this.emitContent();
  }
}
