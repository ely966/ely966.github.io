import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavegadorHeaderComponent } from './navegador-header/navegador-header.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [
    NavegadorHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    //BsDropdownModule.forRoot()
    BsDropdownModule
  ],
  exports:[
    NavegadorHeaderComponent
  ]
})
export class NavegadorHeaderModule { }
