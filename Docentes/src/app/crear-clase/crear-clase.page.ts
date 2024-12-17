import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { Clasesina } from 'src/interfaces/clasesina';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {

  clase: Clasesina={
    id: 0,
    title:"",
    body:""
  }

  constructor(private router: Router,
              private apicrud: ApicrudService) { }

  ngOnInit() {
  }


  volver(){
    this.router.navigate(['/tabs/tab1']);
  }

  CrearClase(){
    this.apicrud.postClase(this.clase).subscribe();
    this.router.navigate(['/tabs/tab1']);
  }

}
