import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalhePage } from '../detalhe/detalhe';
import { ICurso } from '../../interfaces/ICurso';
import { CursosProvider } from '../../providers/cursos/cursos';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista: ICurso[];

  constructor(
    public navCtrl: NavController,
    public cursoProvider: CursosProvider) {
      //this.lista = this.cursoProvider.all();
  }

  ionViewDidEnter(){
    this.cursoProvider.listaCurso().subscribe(res => {
      this.lista = res;
    }, erro => {
      console.log("Erro: " + erro.message);
    });

  }

  abreDetalhe(item){
    this.navCtrl.push(DetalhePage, {dados:item});
  }

}
