import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';
import { ApidatosService } from '../services/apidatos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('Swiper')
  swiperRef:ElementRef | undefined;
  swiper?:Swiper;

  images =[
    'assets/english.jpg',
    'assets/lenguaje.jpg',
    'assets/mate.png.jpg',
    'assets/movil.png',
  ];

  clase:any;

  clasesilla={
    id:0,
    Title:"",
    body:""
  }
  

  constructor(private menucontroller: MenuController,
              private apidatos: ApidatosService,
              private router: Router,
              private alertcontroller: AlertController,
              private apicrud: ApicrudService) {}
              
  
  clases: any[]=[];

  
  mostrarMenu(){
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  swiperSlideChanged(e:any) {
    console.log('changed: ', e);
  }

  CargarApi(){
    this.apidatos.getPosts().subscribe(resp=>{
    console.log(resp);
    })
    this.apidatos.getPosts().subscribe(
    datos => this.clases = datos,
    )
  }

  agregarClase(){
    this.router.navigate(['/crear-clase']);
  }

  abrirCamara(){
    this.router.navigate(['/camara']);
  }

  async consultaElimina(){
    const alert = await this.alertcontroller.create({
      header: 'Confirmar Eliminación',
      message: '¿Eliminar la clase?',
      buttons: [
         {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.elimina();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });

    await alert.present();
  }

  elimina(){
    this.apicrud.deleteClase(this.clase).subscribe();
    this.mensaje();
  }

  async mensaje(){
    const alert = await this.alertcontroller.create({
      header: 'Eliminando Clase',
      message: 'Su Clase ha sido eliminada',
      buttons: [
         {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });
    await alert.present();
  }
}