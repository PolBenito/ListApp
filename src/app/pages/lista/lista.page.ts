import { ListaService } from './../../services/lista.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemsComponent } from 'src/app/components/items/items.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  item = new ItemsComponent();
  @Input() lista;

  id = null;

  constructor(
    public modalController: ModalController, 
    private listaService: ListaService
  ) 
  { }

  ngOnInit() {

    // Buscamos el ID correspondiente
    this.id = this.listaService.v_listas.findIndex(e => e.id === this.lista.id);

  }

  //  Cuando añadimos un nuevo item a la lista
  addItem() {

    this.listaService.v_listas[this.id].items.push(this.item);
    this.GuardarDatosLS();
    this.item = new ItemsComponent();

  }
  
  // Comprovamos si los items estan completados
  // Guardamos los datos en LocalStorge
  GuardarDatosLS() {

    let itemsCkB = this.listaService.v_listas[this.id].items;
    let cont = 0;
    
    this.listaService.v_listas[this.id].completada = false;


    for (let i=0; i<itemsCkB.length; i++) 
    {
      let e = itemsCkB[i];
      
      if (e.completado)
      {
        cont++;
      }
    }
    

    if (cont === itemsCkB.length)
    {
      this.listaService.v_listas[this.id].completada = true;
    }
    
    localStorage.setItem('data', JSON.stringify(this.listaService.v_listas));
    
  }
  
  // Vuelve a Inicio
  Close () {
    this.modalController.dismiss();
  }
  
  
  // getListaCorrecta() {
  //   var lista = [];
  //   var id;
    
  //   this.v_listas = JSON.parse(this.v_listas);

  //   this.v_listas.forEach(e => {
  //     if (e['id'] == this.id_lista) {
  //       lista = e;
  //     }
  //   });

  //   return lista;
  // }
}
