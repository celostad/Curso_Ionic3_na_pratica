import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { PerfilPage } from '../pages/perfil/perfil';
import { EntrarPage } from '../pages/entrar/entrar';

import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages1: Array<{ title: string, component: any }>;
  pages2: Array<{ title: string, component: any }>;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public usuariosProvider: UsuariosProvider,
    public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages1 = [
      { title: 'Home', component: HomePage },
      { title: 'Entrar', component: EntrarPage },
      { title: 'Cadastro', component: CadastroPage }
    ];

    this.pages2 = [
      { title: 'Home', component: HomePage },
      { title: 'Perfil', component: PerfilPage }
    ];

    this.usuariosProvider.getStorage("usuario").then(usuario =>{
      if(usuario){
        this.menuCtrl.enable(true, 'usuarioComLogin');
        this.menuCtrl.enable(false, 'usuarioSemLogin');
      }else{
        this.menuCtrl.enable(false, 'usuarioComLogin');
        this.menuCtrl.enable(true, 'usuarioSemLogin');
      }

    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  sair() {
    this.usuariosProvider.setStorage("usuario", null);
    this.menuCtrl.enable(false, 'usuarioComLogin');
    this.menuCtrl.enable(true, 'usuarioSemLogin');
  }
}
