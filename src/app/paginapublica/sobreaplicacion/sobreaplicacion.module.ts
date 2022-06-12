import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobreaplicacionComponent } from './sobreaplicacion/sobreaplicacion.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SobreaplicacionComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(
      [{
      path:'sobreapp', component: SobreaplicacionComponent,
    }])
  ],
  exports: [
    SobreaplicacionComponent
  ]
})
export class SobreaplicacionModule { }
