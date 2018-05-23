import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { StudentService } from './services/student.service';
import { DataService } from './services/data.service';
import { AppErrorHandler } from './common/app-error-handler';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorHandler, NgModule } from '@angular/core';
import { AuthHttp, provideAuth } from 'angular2-jwt';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentEditComponent } from './student-edit/student-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentSignupComponent,
    HomeComponent,
    StudentListComponent,
    NotFoundComponent,
    NavbarComponent,
    StudentEditComponent,
  ],
  imports: [
    BrowserModule,
     FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'students',
        component: StudentListComponent
      },
      {
        path:'studentsignup/:id',
        component: StudentSignupComponent
      },
      {
        path:'studentedit/:id',
        component: StudentEditComponent
      },
      {
        path:'**',
        component:NotFoundComponent
      }
    ])
  ],
  providers: [
    FormBuilder,
    StudentService,
    {
      provide : ErrorHandler,
      useClass : AppErrorHandler
    },
//
  AuthHttp,    
    provideAuth({
      headerName: 'Authoriazation',
      headerPrefix:'Accept',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('token')),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
