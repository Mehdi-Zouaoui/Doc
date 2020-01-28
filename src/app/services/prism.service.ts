import { Injectable, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import 'clipboard';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/prism-scss';

declare var Prism: any;

@Injectable()
export class PrismService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  highlightAll() {
      Prism.highlightAll();
    }

}
