import { RouterModule } from '@angular/router';
import { MenuDeClienteModule } from './menu-de-cliente/menu-de-cliente.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasUsuariosComponent } from './paginas-usuarios/paginas-usuarios.component';
import { ClienteguardianGuard } from '../proteger/clienteguardian.guard';
import { ProtegerComponent } from '../proteger/proteger/proteger.component';



@NgModule({
  declarations: [
    PaginasUsuariosComponent
  ],
  imports: [
    CommonModule,
    MenuDeClienteModule,
    RouterModule.forChild(
      [
        {
          path:'menu',
          loadChildren: () => import('./menu-de-cliente/menu-de-cliente.module').then(m=>m.MenuDeClienteModule)
        }
      ]
    )


  ],
  exports:[
    PaginasUsuariosComponent
  ]
})
export class PaginasUsuarioModule { }
