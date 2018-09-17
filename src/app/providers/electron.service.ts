import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as mysql from 'mysql';

interface Window {
  webkitURL?: any;
  require?: any;
  process?: any;
}

declare var window: Window;

@Injectable()
export class ElectronService {

  info;
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  shell: typeof shell;
  xml2js: typeof xml2js;
  mysql: typeof mysql;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;
      this.info = 'electron-service';

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.xml2js = window.require('xml2js');
      this.mysql = window.require('mysql');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}

