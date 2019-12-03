import {DisplayContentModel} from '../models/display/DisplayContent.model';
import {Subject} from 'rxjs';

export class DisplayService {
  public menus: DisplayContentModel[] = [
    new DisplayContentModel('un', 'un', [
      {field: 'text', content: 'lorem un'}, {field: 'text', content : 'deuxièùme ligne'}
      ]),
    new DisplayContentModel('deux', 'deux', [{field: 'text', content: 'lorem un'}, {field: 'text', content : 'deuxièùme ligne'}]),
    new DisplayContentModel('trois', 'trois', [{field: 'text', content: 'lorem un'}, {field: 'text', content : 'deuxièùme ligne'}]),
    new DisplayContentModel('épique', 'epique', [{field: 'text', content: 'lorem un'}, {field: 'text', content : 'deuxièùme ligne'}]),
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
