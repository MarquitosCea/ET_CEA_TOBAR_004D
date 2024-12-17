import { Component, OnInit } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { PhotoService } from '../services/photo.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  constructor(public photoService: PhotoService,
              public router: Router) { }

  ngOnInit() {
    Camera.requestPermissions();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  volver(){
    this.router.navigate(['/tabs/tab1']);
  }
}
