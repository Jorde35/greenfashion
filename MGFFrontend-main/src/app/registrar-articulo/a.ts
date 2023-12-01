import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera'
import { Filesystem } from '@capacitor/filesystem';
import { Directory, FileInfo } from '@capacitor/filesystem/dist/esm/definitions';

const IMG_DIR='RegisterImages';

interface LocalFile{
  name:string,
  path:string,
  data:string,

};

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public formulario : any;
  public isDisabled : boolean = true;
  public imagenes: LocalFile[]=[];

  constructor( private servicio : ServicioService,private Forms: FormBuilder) { 
    this.formulario = this.Forms.group({
      correo: ['',Validators.email],
      nombre: ['',Validators.pattern(/^[a-zA-Z\s\á\é\í\ó\ú]{1,16}$/)],
      contrasena: ['',Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)],
      direccion: ['',Validators.pattern(/^[a-zA-Z0-9\.\s\á\é\í\ó\ú]{1,100}$/)],
      telefono: ['',Validators.pattern(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/)],
      tipo_usuario: '1',
      imagen_usuario: null
    });
  }

  ngOnInit() {
  }
  validarFormulario(){
    if(this.formulario.valid){
      console
      this.isDisabled=false;
    }else{
      this.isDisabled=true;
    }
  }
  async loadFiles(){
    this.imagenes = [];
    Filesystem.readdir({
      directory: Directory.Data,
      path: IMG_DIR
    }).then(result =>{
      this.loadFileData(result.files)
    }, async err=>{
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMG_DIR
      })
    }); 
  }
  async loadFileData(fileNames: FileInfo[]){
    for (let f of fileNames){
      const filePath =`${IMG_DIR}/${f.name}`;

      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });
      this.imagenes.push({
        name:f.name,
        path: filePath,
        data: 'data:image/png;base64,'+readFile.data
      })
      this.startUpload(this.imagenes[0]);
    }
  }
 async selectImage(){
  const image =await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Base64,
    source:CameraSource.Photos
  });
  if (image) {
    this.saveImage(image);
  }
 }
 async saveImage(foto: Photo) {
  const base64 = foto.base64String!
  const fileName = 'Imaf.png';
  const saveFile = await Filesystem.writeFile({
    directory: Directory.Data,
    path: `${IMG_DIR}/${fileName}`,
    data: base64
  }); 
  this.loadFiles()
 }
 async startUpload(imagen : LocalFile){
  const response = await fetch(imagen.data);
  const blob = await response.blob();
  this.formulario.value.imagen_usuario = blob;
 }
 async deleteImage(imagen : LocalFile){
  await Filesystem.deleteFile({
    directory:Directory.Data,
    path: imagen.path
  });
  this.loadFiles();
 }
  onSubmit(envio:any){
    this.servicio.Crear_Usuario('',envio).subscribe((data: any)=>{
      this.servicio.Alerta(data.mensaje ,data.id);
    },(error : any)=>{
    });
  }
}
