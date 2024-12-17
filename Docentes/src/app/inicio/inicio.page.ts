import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  loginForm: FormGroup;
  userdata: any;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toast: ToastController,
    private alertcontroller: AlertController,
    private builder: FormBuilder
  ) {
    this.loginForm = this.builder.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) return;

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authservice.GetUserByUsername(username).subscribe(resp => {
      this.userdata = resp;

      if (this.userdata.length === 0) {
        this.loginForm.reset();
        this.UsuarioNoExiste();
        return;
      }

      const usuario = {
        id: this.userdata[0].id,
        username: this.userdata[0].username,
        password: this.userdata[0].password,
        email: this.userdata[0].email,
        isactive: this.userdata[0].isactive
      };

      if (usuario.password !== password) {
        this.loginForm.reset();
        this.ErrorUsuario();
        return;
      }

      if (!usuario.isactive) {
        this.loginForm.reset();
        this.UsuarioInactivo();
        return;
      }

      this.IniciarSesion(usuario);
    });
  }

  private IniciarSesion(usuario: any) {
    sessionStorage.setItem('username', usuario.username);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');

    this.showToast('Sesión Iniciada ' + usuario.username);
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg: any) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario no existe',
      message: 'Debe registrarse',
      buttons: ['OK']
    });
    alerta.present();
  }

  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: 'Revise sus credenciales',
      buttons: ['OK']
    });
    alerta.present();
  }

  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK']
    });
    alerta.present();
  }

  Registrar() {
    this.router.navigate(['/crear-usuario']);
  }


  navegarARecuperar() {
    this.router.navigate(['/recuperar-contra']);
  }
}
