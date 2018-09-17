import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';

@Component({
    selector: 'app-root',
    templateUrl: require('./app.component.html'),
    styleUrls: [require('./app.component.scss')]
})
export class AppComponent {
    constructor(
        public electronService: ElectronService
      ) 
      {
    
      
        if (electronService.isElectron()) {
          console.log('Mode electron');
          console.log('Electron ipcRenderer', electronService.ipcRenderer);
          console.log('NodeJS childProcess', electronService.childProcess);
        } else {
          console.log('Mode web');
        }
      }
    
}