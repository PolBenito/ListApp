import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  nombre: string;
  completado: boolean = false;

  constructor(

  ) { 
    
  }

  ngOnInit() {}

}
