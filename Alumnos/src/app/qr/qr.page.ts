import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  Usuarios: any[]=[]
  nombre: any;
  Usaritos={
    id:0,
    username:"",
    tipo:"",
    color:""
  }

  constructor(private apicrud: ApicrudService,
              private activated: ActivatedRoute) {}

  ngOnInit() {
  }

}
