import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';
import { ApidatosService } from '../services/apidatos.service';
import { Router } from '@angular/router';
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
    'assets/mate.png.jpg',
    'assets/english.jpg',
    'assets/lenguaje.jpg',

  ];
  

  constructor(private menucontroller: MenuController,
              private apidatos: ApidatosService,
              private router: Router,) {}
              
  
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
    this.router.navigate(['tabs/tab2']);
  }

  RegistrarAsistencia(){
    this.router.navigate(['/qr']);
  }
}