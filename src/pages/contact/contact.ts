import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file/ngx';
import { AnalizeProvider } from '../../providers/analize/analize';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

  img = '';
  err = '';
  formNome: FormGroup;

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  }
  picture: string;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private analize: AnalizeProvider,
    private cameraPreview: CameraPreview,
    private file: File,
    private fb: FormBuilder) {
    this.formNome = this.fb.group({
      nome: ['']
    })
  }



  tirarfoto() {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
      //sourceType: this.camera.PictureSourceType.CAMERA,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.img = 'data:image/jpeg;base64,' + imageData;
      console.log('Pegou a foto')
    }, (err) => {
      console.log(err)
      // Handle error
    });
  }

  public writeFile(base64Data: any, folderName: string, fileName: any) {
    let contentType = this.getContentType(base64Data);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    let filePath = this.file + folderName;
    this.file.writeFile(filePath, fileName, contentType).then((success) => {
      console.log("File Writed Successfully", success);
    }).catch((err) => {
      console.log("Error Occured While Writing File", err);
    })
  }
  // //here is the method is used to get content type of an bas64 data  
  public getContentType(base64Data: any) {
    let block = base64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }

  avancar(): void {
    this.navCtrl.push(AboutPage, this.img);
  }

  teste() {
    console.log('Chamou serviço')
    this.analize.outra(this.img).subscribe(response => {
      this.img = response;
      console.log('Já voltou.')
      console.log(response);
    }, error => {
      this.err = error;
      console.error(error)
    })
  }


  public mudarFoco(): void {
    this.cameraPreview.setFocusMode(this.cameraPreview.FOCUS_MODE.FIXED);
  }

  public async abrirCamera() {

    // start camera
    const result = await this.cameraPreview.startCamera(this.cameraPreviewOpts);
  }


  public tirarFoto(): void {
    // picture options
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 100
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });

    // set color effect to negative
    //this.cameraPreview.setColorEffect('negative');
  }

  public capturaFocus(): void {
    this.cameraPreview.getSupportedFocusModes();
  }

  public stopCamera(): void {
    // Stop the camera preview
    this.cameraPreview.stopCamera();
  }

  public trocarCamera(): void {
    // Switch camera
    this.cameraPreview.switchCamera();
  }

}