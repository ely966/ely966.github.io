import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostraradminComponent } from './mostraradmin/mostraradmin.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MostraradminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule.forChild(
      [{
      path:'mostrarAdmin', component: MostraradminComponent,
    }])
  ],
  exports:[
    MostraradminComponent
  ]
})
export class MostraradminModule { }
