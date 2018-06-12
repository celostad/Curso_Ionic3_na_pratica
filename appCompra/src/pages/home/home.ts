import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetalhePage } from '../detalhe/detalhe';
import { CarrinhoPage } from '../carrinho/carrinho';

import { ICurso } from '../../interfaces/ICurso';

import { CursosProvider } from '../../providers/cursos/cursos';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista: ICurso[];
  carrinho = [];

  constructor(
    public navCtrl: NavController,
    public cursoProvider: CursosProvider,
    public carrinhoProvider: CarrinhoProvider) {
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

  abreCarrinho(){
    this.navCtrl.push(CarrinhoPage);
  }

  addCarrinho(item){
    for(let curso of this.carrinho){
      if(curso.id == item.id){
        return;
      }
    }

    this.carrinho.push(item);
    this.carrinhoProvider.setStorage('carrinho',this.carrinho);
  }

}
