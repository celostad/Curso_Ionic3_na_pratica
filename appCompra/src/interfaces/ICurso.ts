import { IAula } from './IAula';

export interface ICurso{
  id?: number;
  titulo: string;
  descricao: string;
  autor: string;
  valor: number;
  valor_texto: string;
  imagem: string;
  aulas: IAula[];
}
