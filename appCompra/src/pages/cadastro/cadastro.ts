import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario: IUsuario = { name: '', email: '', password: '', password_confirmation: '' };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuariosProvider: UsuariosProvider,
    public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cancelar() {
    this.navCtrl.setRoot(HomePage);
  }

  addUsuario() {

    this.usuariosProvider.addUsuario(this.usuario).subscribe(res => {

      if(res){
        if(res.token){
          console.log(res);
          this.exibeMensagem('top', 'Cadastro realizado com sucesso!');  
          this.usuariosProvider.setStorage("usuario",res);
          this.cancelar();
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
