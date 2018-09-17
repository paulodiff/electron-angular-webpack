// Import component decorator
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../services/app.service';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';
import { of as observableOf } from 'rxjs/observable/of';
import { ReportService } from '../services/report.service';

// Gestore dei report ...
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { ElectronService } from '../providers/electron.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { MessageService } from '../services/message.service';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  const defaultCharData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };  

@Component({
    templateUrl: require('./test.component.html'),
})

// Component class
export class TestComponent implements OnInit, OnDestroy {
 

    constructor(
        public _userService: AppService,
        private _reportService: ReportService,
        public _electronService: ElectronService,
        private _messageService: MessageService,
        private spinner: NgxSpinnerService
    ) { }

    public subscription: Subscription;
    public user: any;
    public name: 'Login';
    public message: any;
    public people$: any;
    public selectedPersonId: any;
    public inputFolder: any;
    public items: any;
    public chartData: any;

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
                    type: 'inputR',
                    key: 'username',
                    templateOptions: {
                        label: 'Matricola',
                        placeholder: 'matricola'
                    },
                },
                {
                    key: 'password',
                    className: 'col-6',
                    type: 'input',
                    templateOptions: {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'password'
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
        this._userService.login(this.model);
    }

    ngOnInit() {
        this.model = {
            username: environment.testUserName,
            password: environment.testUserPassword
        };

        console.log('LOGIN INIT ... ');


        this.people$ = observableOf(states);
        this.chartData = defaultCharData;

        this.subscription = this._messageService.getMessage().subscribe(message => { 
            console.log('TEST');
            console.log(message);
            this.message = message; 
        });

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
        this.subscription.unsubscribe();
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

    openDialog() {
        console.log('::openDialog');
        this.inputFolder = this._electronService.remote.dialog.showOpenDialog(
            // {properties: ['openFile', 'openDirectory', 'multiSelections']}
            {properties: ['openDirectory']}
        );
        console.log(this.inputFolder);
    }

    pdfStampa1() {
        console.log('TEST COMPONENT:pdfStampa1');
        
        let contenutoStampa = [];
        contenutoStampa.push({ text: 'TEST', fontSize: 18 });

        if (this.inputFolder) {
            contenutoStampa.push({
                text: this.inputFolder,
                fontSize: 16
              });
        }

        if (this.items) {
            this.items.forEach(function(obj) {
                contenutoStampa.push({
                    text: obj,
                    fontSize: 16
                  });
            });
        }

        const docDefinition = {
            info: {
                  title: 'RR',
                  author: 'RR',
                  subject: 'testS',
                  keywords: 'testK',
            },
            pageSize: 'A4',
            // pageOrientation: 'landscape',
            pageMargins: [ 30, 30, 30, 30 ],
            footer: function(currentPage, pageCount) {
              return   { 
                          text: 'pagina ' + currentPage.toString() + ' di ' + pageCount,
                          alignment: (currentPage % 2) ? 'left' : 'right', margin: [8, 8, 8, 8]
                        }
             },
            header: function(currentPage, pageCount) {
               return {
                        text: 'pagina generata il: XXXXXX', fontSize: 8,
                        alignment: (currentPage % 2) ? 'left' : 'right', margin: [8, 8, 8, 8]
                      };
            },
            content: [contenutoStampa]
          };

        // const fs = require('fs');
        /*
        // fs.writeFileSync('foo.pdf', new Buffer(new Uint8Array(buffer)));   
        //fs.writeFile("/folder/filename.txt", content, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File succesfully saved to disk.");
        });
        // fs.writeFileSync('foo.pdf', new Buffer(new Uint8Array(buffer)));   
        */

        const afile = 'sample.pdf';
        const self = this;
        pdfMake.createPdf(docDefinition).getBuffer(function(result) {
            console.log(self._electronService.info);
            self._electronService.fs.writeFile(afile, result, function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                self._electronService.shell.openItem(afile);
            });
        });

    }

    pdfStampa2() {
        console.log('TEST COMPONENT:pdfStampa2');
    }

    displayCounter(count) {
        console.log('test component', count);
    }

    testMysql() {

        let mysql      = require('mysql');
        let connection = this._electronService.mysql.createConnection({
          host     : '10.10.128.147',
          user     : 'fissotel',
          password : 'fissotel',
          database : 'fissotel'
        });
        
        connection.connect();
        
        let sqlQ = "select count(*) as conteggio, tel_data from tel_telefonate ";
        sqlQ = sqlQ + " where tel_chiamato = '4607'  ";
        sqlQ = sqlQ + " AND    tel_data BETWEEN CAST('2018-01-01' AS DATE) AND CAST('2018-09-30' AS DATE) ";
        sqlQ = sqlQ + " GROUP BY tel_data ";
        
        console.log(sqlQ);

        connection.query(sqlQ, function (error, results, fields) {
          if (error) { 
              console.log(error);
              throw error; 
          }
          console.log('The solution is: ', results);
        });
        
        connection.end();

    }

    testLoop() {
        console.log('List files...', this.inputFolder[0]);
        this.spinner.show();
        const self = this;
        const parser = new self._electronService.xml2js.Parser();
        self._electronService.fs.readdir(this.inputFolder[0], (err, dir) => {
            self.items = dir;
            for (let i = 0, path; path = dir[i]; i++) {
                // const fExt = path.slice(0, -3);
                const fExt = path.split('.').pop();
                console.log(fExt);
                if (fExt === 'xml') {
                    const fName = this.inputFolder[0] + '/' + path;
                    console.log('read xml : ', fName);
                    self._electronService.fs.readFile( fName, function(err, data) {
                        parser.parseString(data, function (err, result) {
                            if (err) {
                                console.error(err);
                            }
                            console.dir(result);
                        });
                    });
                }
            }
        });

        setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
        }, 5000);
    }
}