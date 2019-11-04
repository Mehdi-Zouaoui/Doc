import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    codeMirror : true
  };
  public titleOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      "initialized": () => {
        console.log('initialized');
      },
      "contentChanged": () => {
        console.log("content changed");
      }
    }
  };

  public myTitle: string = "Titre de la section";
  editorContent: string = 'My Document\'s Title <pre><code class="language-javascript">  public titleOptions: Object = {\n' +
    '    placeholderText: &#39;Edit Your Content Here!&#39;,\n' +
    '    charCounterCount: false,\n' +
    '    toolbarInline: true,\n' +
    '    events: {\n' +
    '      &quot;initialized&quot;: () =&gt; {\n' +
    '        console.log(&#39;initialized&#39;);\n' +
    '      },\n' +
    '      &quot;contentChanged&quot;: () =&gt; {\n' +
    '        console.log(&quot;content changed&quot;);\n' +
    '      }\n' +
    '    }\n' +
    '  };</code></pre>';
  constructor() { }

  ngOnInit() {
  }

}
