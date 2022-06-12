import { Time } from '@angular/common';
import { ClienteFull } from './clienteFull.interface';
import { mascotaFull } from './mascotaFull.interface';

export interface CitaEdi {
  id: number;
  fecha: Date;
  petId: number;
  motivo: string;
  idVeterinario: number;
  numeroContacto: number;

}
