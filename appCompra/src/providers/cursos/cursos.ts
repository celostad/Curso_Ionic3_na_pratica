import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICurso } from '../../interfaces/ICurso';
/*
  Generated class for the CursosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CursosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CursosProvider Provider');
  }

  
  listaCurso(){
    return this.http.get<ICurso[]>('http://localhost:8000/api/cursos');
  }
  
  showTeste(data:ICurso){
    return this.http.get<ICurso>('http://localhost:3000/cursos/'+data.id);
  }

  addTeste(data:ICurso){
    return this.http.post<ICurso>('http://localhost:3000/cursos',data);
  }

  editTeste(data:ICurso){
    return this.http.put<ICurso>('http://localhost:3000/cursos/'+data.id,data);
  }

  deleteTeste(data:ICurso){
    return this.http.delete<ICurso>('http://localhost:3000/cursos/'+data.id);
  }
  
  all(){
    const lista: ICurso[] = [
      {
        id:1,
        titulo:"Curso de Ionic",
        descricao:"Aprenda Ionic na Prática",
        autor:"Marcelo",
        valor:23.90,
        valor_texto:"23,90",
        imagem:"https://ionicframework.com/dist/preview-app/www/assets/img/nin-live.png",
        aulas:[
          {
            id:1,
            ordem:1,
            titulo:"Introdução ao Curso",
            tempo:"10:00",
            video:"https://www.youtube.com/embed/9XWhNHvGhHU",
          },
          {
            id:2,
            ordem:2,
            titulo:"Realizando a Instalação",
            tempo:"05:00",
            video:"https://www.youtube.com/embed/9XWhNHvGhHU",
          }
        ]
      },
      {
        id:2,
        titulo:"Curso de JS",
        descricao:"Aprenda JS na Prática",
        autor:"Marcelo Souza",
        valor:33.90,
        valor_texto:"33,90",
        imagem:"https://ionicframework.com/dist/preview-app/www/assets/img/rundmc-live.png",
        aulas:[]
      }
    ];
    return lista;
  }
}
