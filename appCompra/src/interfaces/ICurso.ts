import { IAula } from './IAula';

export interface ICurso{
  id: number;
  titulo: string;
  descricao: string;
  valor: number;
  valor_txt: string;
  imagem: string;
  aulas: IAula[];
}
