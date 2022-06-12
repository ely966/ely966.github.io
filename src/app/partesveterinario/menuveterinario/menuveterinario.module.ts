import { MenuveterinarioComponent } from './menuveterinario/menuveterinario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuveterinarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{
      path:'menuVeterinario', component: MenuveterinarioComponent,
    }])
  ],
  exports:[
    MenuveterinarioComponent
  ]
})
export class MenuveterinarioModule { }
