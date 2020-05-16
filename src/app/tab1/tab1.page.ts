import { ListaPage } from './../pages/lista/lista.page';
import { ListaComponent } from './../components/lista/lista.component';
import { ListaService } from './../services/lista.service';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    private router: Router,
    public modalController: ModalController,
    private listaService: ListaService
  ) 
  {}

  ngOnInit() { }

  // Botón para abrir el modal de la lista
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      message: 'Introduce el nombre de la nueva lista',
      inputs: [
        {
          name: 'nombre_lista',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('No se ha añadido una lista nueva.');
          }
        }, {
          text: 'Agregar',
          handler: (data) => {
            
            let new_lista = new ListaComponent(data.nombre_lista);

            this.listaService.v_listas.push(new_lista);

            localStorage.setItem("data", JSON.stringify(this.listaService.v_listas));
            // localStorage.setItem("id", JSON.stringify(this.id));

            this.presentModal(new_lista);
            // this.router.navigate(['/lista']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal(new_lista) {
    const modal = await this.modalController.create({
      component: ListaPage,
      swipeToClose: true,
      componentProps: {
        'lista': new_lista
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then(() => {
      this.listaService.v_listas = JSON.parse(localStorage.getItem('data'));
    });

    return await modal.present();
  }

  async editList(lista) {
    const alert = await this.alertController.create({
      header: 'Editar nombre',
      subHeader: 'Estás editando el nombre de la lista',
      inputs: [
        {
          name: 'editLista',
          type: 'text',
          value: lista.nombre,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('No se ha editado la lista seleccionada.');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {

            let id = this.listaService.v_listas.findIndex(x => x.id === lista.id);
            
            this.listaService.v_listas[id].nombre = alertData.editLista;
            
            localStorage.setItem('data', JSON.stringify(this.listaService.v_listas));

          }
        }
      ]
    });

    await alert.present();
  }

  delete(lista) {
    let id = this.listaService.v_listas.findIndex(x => x.id === lista.id);

    //Borramos la lista del array
    this.listaService.v_listas.splice(id, 1);

    localStorage.setItem('data', JSON.stringify(this.listaService.v_listas));
  }

}
