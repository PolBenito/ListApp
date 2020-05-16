import { ListaPage } from './../pages/lista/lista.page';
import { ListaComponent } from './../components/lista/lista.component';
import { ListaService } from './../services/lista.service';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private listaService: ListaService
  ) 
  {}

  ngOnInit() { }

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
