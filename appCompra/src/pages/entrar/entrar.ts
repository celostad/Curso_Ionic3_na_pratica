import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the EntrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {
  usuario:IUsuario = {email:'',password:''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuariosProvider:UsuariosProvider,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {

  }

  cancelar(){
    this.navCtrl.setRoot(HomePage);
  }

  ativaMenuLogin() {
    this.menuCtrl.enable(true, 'usuarioComLogin');
    this.menuCtrl.enable(false, 'usuarioSemLogin');
  }

  loginUsuario(){
    this.usuariosProvider.loginUsuario(this.usuario).subscribe(res => {
      if(res){
        if(res.token){
          console.log(res);
          this.usuariosProvider.setStorage("usuario",res);
          this.exibeMensagem('top', 'Login realizado com sucesso!');         
          this.ativaMenuLogin();
          this.cancelar();
        }else{
          console.log(res); // validação
          let erros ="";
          
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
