import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  usuario = {
    username: '',
    email: '',
    profilePicture: './assets/avatar.png',
  };

  constructor(private menuController: MenuController, private apiService: ApiService) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  ionViewWillEnter() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const storedUser = sessionStorage.getItem('usuario');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const id = userData.id;

      // Obtiene el perfil del backend por el ID
      this.apiService.getUsuario(id).subscribe({
        next: (response) => {
          this.usuario = {
            username: response.username,
            email: response.email,
            profilePicture: response.profilePicture || './assets/avatar.png'
          };
        },
        error: (error) => console.error('Error al obtener el usuario', error)
      });
    }
  }

  mostrarMenu() {
    this.menuController.enable(true);
    this.menuController.open('first');
  }

  editarPerfil() {
    window.location.href = '/tabs/tab4';
  }
}
