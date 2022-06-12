import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarveterinarioComponent } from './mostrarveterinario/mostrarveterinario.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIconModule} from '@angular/material/icon'



@NgModule({
  declarations: [
    MostrarveterinarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule.forChild(
      [{
      path:'mostrarVeterinario', component: MostrarveterinarioComponent,
    }])
  ]
})
export class MostrarveterinarioModule { }
