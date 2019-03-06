import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';
// import { File } from '@ionic-native/file'; 


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

  img = '';
  constructor(public navCtrl: NavController,
    private camera: Camera,
    private base64: Base64ToGallery,
    /**private file: File**/) { }


  tirarfoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,  
      mediaType: this.camera.MediaType.PICTURE,
      //sourceType: this.camera.PictureSourceType.CAMERA,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.img = 'data:image/jpeg;base64,' + imageData;
      //this.salvar(this.img);
      console.log('Entrou')      
    }, (err) => {
      console.log(err)
      // Handle error
    });
  }

//   public writeFile(base64Data: any, folderName: string, fileName: any) {  
//     let contentType = this.getContentType(base64Data);   
//     // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
//     let filePath = this.file.externalRootDirectory + folderName;  
//     this.file.writeFile(filePath, fileName, contentType).then((success) => {  
//         console.log("File Writed Successfully", success);  
//     }).catch((err) => {  
//         console.log("Error Occured While Writing File", err);  
//     })  
// }  
// //here is the method is used to get content type of an bas64 data  
// public getContentType(base64Data: any) {  
//     let block = base64Data.split(";");  
//     let contentType = block[0].split(":")[1];  
//     return contentType;  
// }  

avancar(): void{
  this.navCtrl.push(AboutPage, this.img);
}

  salvar(img: string) {

    let base64option : Base64ToGalleryOptions = {
      prefix: 'img',
      mediaScanner: false,

  };

    
    this.base64.base64ToGallery(img, base64option).then(
        res => console.log('Salvou ', res),
        err => console.log('Error saving image to gallery ', err));
  }
}
