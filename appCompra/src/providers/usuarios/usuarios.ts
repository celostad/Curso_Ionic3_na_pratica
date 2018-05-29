import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';

import { Storage } from '@ionic/storage';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {

  // url: string = 'http://localhost:3000/';
  url: string = 'http://localhost:8000/api/';

  headers: any;

  constructor(
    public http: HttpClient,
    private storage: Storage) {
   
    //this.headers = {"headers": {"authorization": "Bearer "}};
  };

  setStorage(chave, valor){
    this.storage.set(chave, valor);
  }

  getStorage(chave){
    return this.storage.get(chave);
  }

  showUsuario(usuario:IUsuario) {
    // Com essa instrução " localStorage.getItem('token')} ", pode ser que dê problemas.
    // Pois estará gravando no dispositivo (armazenamento) local e se não tiver habilitado dará erros.
    return this.http.get<IUsuario>(this.url + 'usuario',{"headers": {"authorization": "Bearer " + usuario.token}});
  }

  loginUsuario(data: IUsuario) {
    return this.http.post<IUsuario>(this.url + 'login', data);
  }

  addUsuario(data: IUsuario) {
    return this.http.post<IUsuario>(this.url + 'usuarios', data);
  }

  editUsuario(data: IUsuario) {
    return this.http.put<IUsuario>(this.url + 'usuarios/' + data.id, data);
  }


}
