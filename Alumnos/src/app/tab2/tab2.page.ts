import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ApidatosService } from '../services/apidatos.service';
import { AlertController } from '@ionic/angular';
import { justificar } from 'src/interfaces/justificación';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {

justificativo: justificar={
  id: 0,
  username: "",
  clase: "",
  body: "",
}
  justificativos: any[]=[];
  
  constructor(private menuController: MenuController, 
              private fb: FormBuilder,
              private apidatos: ApidatosService,
              private alertcontroller: AlertController,
              private apicrud: ApicrudService ) {
              
  }

  ngOnInit() {
  }

  mostrarMenu() {
    this.menuController.enable(true);
    this.menuController.open('first');
  }

  CargarApi(){
    this.apidatos.getPosts().subscribe(resp=>{
    console.log(resp);
    })
    this.apidatos.getPosts().subscribe(
    datos => this.justificativo = datos,
    )
  }

  CrearJustificacion(){
    this.apicrud.postJustificativo(this.justificativo).subscribe();
  }
}
