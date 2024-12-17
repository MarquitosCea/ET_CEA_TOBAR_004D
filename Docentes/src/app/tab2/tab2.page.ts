import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  justificativos: any[] = [];
  comentarios: { [id: number]: string } = {};

  constructor(private menuController: MenuController, private apiService: ApiService, private alertController: AlertController) {}

  ngOnInit() {
    this.loadJustificativos();
  }

 
  mostrarMenu() {
    this.menuController.enable(true);
    this.menuController.open('first');
  }


  loadJustificativos() {
    this.apiService.getJustificativos().subscribe({
      next: (data) => {
        this.justificativos = data;
      },
      error: (error) => {
        console.error('Error al cargar justificativos', error);
      }
    });
  }


  async handleAction(justificativo: any, action: string) {
    const comment = this.comentarios[justificativo.id] || '';

    const alert = await this.alertController.create({
      header: `${action === 'accept' ? 'Aceptar' : 'Rechazar'} Justificativo`,
      message: 'Deja un comentario:',
      inputs: [
        {
          name: 'comentario',
          type: 'textarea',
          placeholder: 'Opcional'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: action === 'accept' ? 'Aceptar' : 'Rechazar',
          handler: async (inputs) => {
            console.log(`Justificativo ${justificativo.id} ${action} con comentario: ${inputs.comentario}`);


            await this.apiService.deleteJustificativo(justificativo.id).toPromise();

            this.justificativos = this.justificativos.filter(j => j.id !== justificativo.id);

            console.log(`Justificativo ${justificativo.id} eliminado`);
          }
        }
      ]
    });

    await alert.present();
  }
}
