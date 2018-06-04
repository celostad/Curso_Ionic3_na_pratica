import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { IUsuario } from '../../interfaces/IUsuario';

import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  usuario:IUsuario = {name:'',email:'',password:''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuariosProvider:UsuariosProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    this.usuariosProvider.getStorage("usuario").then(usuario => {
      if(usuario){
        this.usuario = usuario;
        this.usuariosProvider.showUsuario(usuario).subscribe(res => {
          console.log(res);
          this.usuario = res;
        }, erro => {
          console.log("Erro: " + erro.message);
        });
      }else{
        this.cancelar();
      }
    });

  }

  cancelar(){
    this.navCtrl.setRoot(HomePage);
  }

  editarUsuario(){
    this.usuariosProvider.editUsuario(this.usuario).subscribe(res => {
      if(res){
        if(res.token){
          console.log(res);
          this.usuariosProvider.setStorage("usuario",res);
          this.exibeMensagem('top', 'Registro atualizado!');
        }else{
          console.log(res); // validação
          let erros ="";
          if(res.name){
            for (let erro of res.name){
              erros += erro + " ";
            }
          }

          if(res.email){
            for (let erro of res.email){
              erros += erro + " ";
            }
          }

          if(res.password){
            for (let erro of res.password){
              erros += erro + " ";
            }
          }
          this.exibeMensagem('top', erros, 5000);
        }

      }else{
        // Login com erro!
      }

    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }

  exibeMensagem(position: string, msg:string, tempo:number = 3000) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: tempo,
      position: position
    });

    toast.present(toast);
  }

}
