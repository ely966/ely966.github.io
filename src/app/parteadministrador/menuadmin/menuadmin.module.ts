
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuadminComponent } from './menuadmin/menuadmin.component';



@NgModule({
  declarations: [
    MenuadminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{
      path:'menuAdmin', component: MenuadminComponent,
    }])
  ],
  exports:[
    MenuadminComponent
  ]
})
export class MenuveterinarioModule { }
