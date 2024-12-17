import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  usuario = {
    username: 'Usuario1',
    email: 'usuario1@mail.cl',
    profilePicture: './assets/avatar.png', 
  };

  constructor(private menuController: MenuController) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  ionViewWillEnter() {
    // Carga los datos cada vez que se entra al Tab 3
    this.cargarUsuario();
  }

  cargarUsuario() {
    const storedUser = sessionStorage.getItem('usuario');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.usuario.username = userData.username; // Nombre de usuario actualizado
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
