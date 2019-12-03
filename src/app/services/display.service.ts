import {DisplayModel} from '../models/display/Display.model';
import {Subject} from 'rxjs';

export class DisplayService {
  public menus: DisplayModel[] = [
    new DisplayModel('un', 'un', [
      {content: 'première lligne', type: 'text', id: 0, index: 0},
      {content: 'deuxième', type : 'number', id: 1, index : 1}
    ]),
    new DisplayModel('deux', 'deux', [
      {content: 'première lligne', type: 'text', id: 0, index: 0},
      {content: 'deuxième', type : 'number', id: 1, index : 1}
    ]),
    new DisplayModel('épique', 'epique', [
      {content: 'première lligne', type: 'text', id: 0, index: 0},
      {content: 'deuxième', type : 'number', id: 1, index : 1}
    ])
  ];
  menusContent = new Subject<DisplayModel[]>();

  constructor() { }

  emitContent() {
    this.menusContent.next(this.menus.slice());
  }

  addContent(menu: DisplayModel) {
    this.menus.push(menu);
    this.emitContent();
  }
}
