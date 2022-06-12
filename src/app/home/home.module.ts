import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginModule } from '../login/login.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    FormsModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
