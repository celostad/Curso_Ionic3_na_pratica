import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {

  usuario: IUsuario = { email: '', password: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuariosProvider: UsuariosProvider,
    public menuCtrl: MenuController) {

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CadastroPage');
  }

  cancelar() {
    this.navCtrl.setRoot(HomePage);
  }

  ativaMenuLogin() {
    this.menuCtrl.enable(true, 'usuarioComLogin');
    this.menuCtrl.enable(false, 'usuarioSemLogin');
  }

  loginUsuario(){
    this.usuariosProvider.loginUsuario(this.usuario).subscribe(res => {
      this.usuariosProvider.setStorage("usuario",res);
      this.ativaMenuLogin();
      this.cancelar();

    }, erro => {
      console.log("Erro: " + erro.message);
    });
  }


}
