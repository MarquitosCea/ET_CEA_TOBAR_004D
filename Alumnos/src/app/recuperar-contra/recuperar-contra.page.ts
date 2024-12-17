import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage {
  username: string = '';  // Usamos una propiedad simple para el formulario basado en template

  constructor(
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService
  ) {}

  async recoverPassword() {
    try {
      const resp = await this.apiService.getUsuarioByUsername(this.username).toPromise();

      if (resp.length > 0) {
        const password = resp[0].password;
        const alerta = await this.alertController.create({
          header: 'Contraseña Recuperada',
          message: `Tu contraseña es: ${password}`,
          buttons: ['OK']
        });
        alerta.present();
      } else {
        this.showAlert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error recuperando contraseña:', error);
      this.showAlert('Hubo un error al recuperar tu contraseña');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    alert.present();
  }
  
  regresar(){
    this.router.navigate(['/inicio']);
  }

}

