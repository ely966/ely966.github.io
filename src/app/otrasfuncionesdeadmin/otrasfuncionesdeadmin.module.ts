import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path:'funcioncambiarpass',
          loadChildren: () => import('./cambiarpassdeunusuario/cambiarpassdeunusuario.module').then(m=> m.CambiarpassdeunusuarioModule),
        }

      ]
    ),
    FormsModule,
  ]
})
export class OtrasfuncionesdeadminModule { }
