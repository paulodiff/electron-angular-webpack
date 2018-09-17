import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
// import { HelloComponent } from './hello.component';
import { environment } from '../environments/environment';

import { LoginComponent } from './login/login.component';
import { ErrorsComponent } from './errors/errors.component';
import { StatsListComponent } from './stats/stats-list.component';
// import { HomeComponent } from './components/home/home.component';


// import { SocketComponent } from './socket/socket.component';
// import { ConsegnaComponent } from './consegna/consegna.component';
// import { LogInfoComponent } from './loginfo/loginfo.component';

import { DataBarComponent } from './databar/databar.component';
// import { TestComponent } from './test/test.component';
// import { AppChildComponent } from './test/appchild.component';
import { TelefoniComponent } from './telefoni/telefoni.component';

import { AppService } from './services/app.service';
import { DataService } from './services/data.service';

import { FormlyFieldButton } from './formly/button-type.component';
import { FormlyFieldInput } from './formly/input-type.component';
import { FormlyFieldSelect } from './formly/select-type.component';
import { FormlyFieldTypeahead } from './formly/typeahead-type.component';
import { FormlyFieldNgSelect } from './formly/ng-select-type.component';

import { routing } from './app.routes';

import { ToastrModule } from 'ngx-toastr';
// import { SseEventService } from './services/sseevent.service';
// import { SocketService } from './services/socket.service';
import { ReportService } from './services/report.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';

import { RequestInterceptor } from './services/http-interceptor.service';

import { ElectronService } from './providers/electron.service';

import { NgxSpinnerModule } from 'ngx-spinner';

import { ChartjsModule } from '@ctrl/ngx-chartjs';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forRoot({
      types: [
        { name: 'ng-select-formly', component: FormlyFieldNgSelect, wrappers: ['fieldset', 'label'] },
        { name: 'typeahead', component: FormlyFieldTypeahead, wrappers: ['fieldset', 'label'] },
        { name: 'inputR', component: FormlyFieldInput,  wrappers: ['fieldset', 'label'] },
        {
          name: 'button',
          component: FormlyFieldButton,
          wrappers: ['fieldset', 'label'],
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
      ],
    }),
    FormlyBootstrapModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    routing,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    ChartjsModule
    ],
  declarations: [
    AppComponent,
    DataBarComponent,
    // HelloComponent,
    // HomeComponent,
    // AttiListComponent,
    // AttiNewComponent,
    // RaccomandateListComponent,
    // RaccomandateNewComponent,
    // ConsegnaListComponent,
    // ConsegnaNewComponent,
    LoginComponent,
    HomeComponent,
    // TestComponent,
    // AppChildComponent,
    TelefoniComponent,
    // SocketComponent,
    // ConsegnaComponent,
    // LogInfoComponent,
    ErrorsComponent,
    StatsListComponent,
    FormlyFieldButton,
    FormlyFieldInput,
    FormlyFieldSelect,
    FormlyFieldTypeahead,
    FormlyFieldNgSelect
  ],
  providers: [
    AppService,
    DataService,
    // SocketService,
    ReportService,
    NotificationService,
    ErrorHandlerService,
    ElectronService,
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap:  [ AppComponent ]
})
export class AppModule { }
