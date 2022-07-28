//O formato dos dados de tempo da coleção criada serão em pt-BR
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

//Função usada para formatar os dados
//parâmetro timestamp recebe o formato do firebase
export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {

//Se tiver timestamp
  if (timestamp) {

    //Criação de uma nova data por meio do new Date, com a propriedade timestamp e método .toDate()
    const date = new Date(timestamp.toDate());

    //Criação do dia por meio do método .toLocaleDateString(), em formato pt-BR   
    const day = date.toLocaleDateString('pt-BR');
    //Criação do hórário por meio do método .toLocaleTimeString(), em formato pt-BR
    const hour = date.toLocaleTimeString('pt-BR');

    //Retorno do dia e do horário
    return `${day} às ${hour}`;
  }
}