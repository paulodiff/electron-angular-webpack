// Import component decorator
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../services/app.service';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { MessageService } from '../services/message.service';


@Component({
    selector: 'data-bar-component',
    templateUrl: require('./databar.component.html'),
})

// Component class
export class DataBarComponent implements OnInit, OnDestroy {
 

    constructor(
            public _userService: AppService,
            private _messageService: MessageService
            ) { }

    public user: any;
    public name: 'Login';
    public subscription: any;

    public form = new FormGroup({});
    public model: any = {};
    public options: FormlyFormOptions = {};
    public fields: FormlyFieldConfig[] = [
        // {template: '<div class="alert alert-success" role="alert">'},

        {
            fieldGroupClassName: 'row',
            fieldGroup: [
                {
                    className: 'col-6',
                    type: 'input',
                    key: 'da_data',
                    templateOptions: {
                        label: 'Da data',
                        placeholder: 'da data'
                    },
                },
                {
                    key: 'a_data',
                    className: 'col-6',
                    type: 'input',
                    templateOptions: {
                        label: 'a data',
                        placeholder: 'a data'
                    }
                }
            ],
        }
    ];

    submitSearch() {
        alert(JSON.stringify(this.model));
    }

    submit(model) {
        console.log(this.model);
        this._messageService.sendMessage(this.model);
        // this._userService.login(this.model);
    }

    ngOnInit() {
        this.model = {
            username: environment.testUserName,
            password: environment.testUserPassword
        };

        console.log('LOGIN INIT ... ');

        /*
        this.subscription = this._sseEventService.getIndicatorsStream().subscribe({
            next: msg =>  { console.log('login observable '); console.log(msg); },
            error: err => console.error('something wrong occurred: ' + err)
          });
          */
        console.log('LOGIN subscribe to loginType event ... ');


    }

    ngOnDestroy() {
        console.log('LOGIN:ngOnDestroy:unsubscribe');

    }

    login() {
      this._userService.login({'username': this.model.username, 'password': this.model.password});
    }

    refreshToken() {
      this._userService.refreshToken();
    }

    logout() {
      this._userService.logout();
    }

    testSse(){

    }
}