import { ListaService } from './../../services/lista.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  id: number = new Date().getTime();
  nombre: string;
  fecha_inicio: Date = new Date();
  fecha_final: Date;
  completada: boolean = false;
  items: ListaComponent[] = [];

  constructor(
    nombre: string
  ) { 
    this.nombre = nombre;
  }

  ngOnInit() {}

}
