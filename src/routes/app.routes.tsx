//Todas as rotas da aplicação, de acordo com estar registrado e logado
//Importação do react-navigation
import {createNativeStackNavigator} from "@react-navigation/native-stack";

//Importação de todas as telas
import {Home} from "../screens/Home";
import {Register} from "../screens/Register";
import {Details} from "../screens/Details";

//Criação das rotas de navegação
const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){

    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home}/> 
            <Screen name="new" component={Register}/> 
            <Screen name="details" component={Details}/> 
        </Navigator>
    );
}