//Importanto os tipos de dados compatíveis do Firebase, para abrir uma solicitação
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

//Criação da tabela de dados que iremos usar, quando uma solicitação for aberta
export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  status: 'open' | 'closed';
  //Solution é opcional
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  //Closed_at (fechamento) é opcional
  closed_at?: FirebaseFirestoreTypes.Timestamp;
}