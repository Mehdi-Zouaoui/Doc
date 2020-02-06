// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AngularEditorConfig} from "@kolkov/angular-editor";

export const environment = {
  production: false,
   firebase : {
    apiKey: 'AIzaSyAmaLF0cLhs-nDd4Rw8wG2Jxof0TF3arQ4',
    authDomain: 'doc-cliclic.firebaseapp.com',
    databaseURL: 'https://doc-cliclic.firebaseio.com',
    projectId: 'doc-cliclic',
    storageBucket: 'doc-cliclic.appspot.com',
    messagingSenderId: '562825531269',
    appId: '1:562825531269:web:670978e0d7bbc1b5fcbeec',
    measurementId: 'G-NWXSRR5T77'
  }
};

export enum LOADING_STATUS {
  LOADING,
  LOADED,
  ERROR
}

 export const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  sanitize: true,
  toolbarPosition: 'top'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
