import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor() { }

  v_listas = JSON.parse(localStorage.getItem('data')) || [];
}
