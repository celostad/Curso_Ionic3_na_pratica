import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetalhePage } from '../pages/detalhe/detalhe';
import { AulaPage } from '../pages/aula/aula';
import { CadastroPage } from '../pages/cadastro/cadastro';
import {PerfilPage } from '../pages/perfil/perfil';
import { EntrarPage } from '../pages/entrar/entrar';
import { CarrinhoPage } from '../pages/carrinho/carrinho';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

import { CursosProvider } from '../providers/cursos/cursos';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { IonicStorageModule } from '@ionic/storage';
import { CarrinhoProvider } from '../providers/carrinho/carrinho';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetalhePage,
    AulaPage,
    CadastroPage,
    PerfilPage,
    EntrarPage,
    CarrinhoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetalhePage,
    AulaPage,
    CadastroPage,
    PerfilPage,
    EntrarPage,
    CarrinhoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CursosProvider,
    UsuariosProvider,
    CarrinhoProvider
  ]
})
export class AppModule {}
