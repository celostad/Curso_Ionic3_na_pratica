import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/*
  Generated class for the CarrinhoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrinhoProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello CarrinhoProvider Provider');
  }

  setStorage(chave,valor){
    this.storage.set(chave, valor);
  }

  getStorage(chave){
    return this.storage.get(chave);
  }
}
