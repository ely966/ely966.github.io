import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProtegerComponent } from './proteger/proteger.component';



@NgModule({
  declarations: [

  
    ProtegerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class ProtegerModule { }
