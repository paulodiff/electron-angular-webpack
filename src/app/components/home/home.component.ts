import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: require('./home.component.html')
})
export class HomeComponent implements OnInit {

  constructor(private _electronService: ElectronService) { }


  openDialog( ) {
    console.log(this._electronService.remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}));
  }

  ngOnInit() {
  }

}
