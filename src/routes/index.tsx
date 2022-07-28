import { useState, useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native";

//Importando firebase e sua autenticação
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Loading } from '../components/Loading';
import { SignIn } from "../screens/SignIn";

import { AppRoutes} from "./app.routes";

//Criação de rotas de acordo com a autenticação
export function Routes(){

    //Criação dos estados para verificar se o usuário está logado (digitou corretamente seus dados)

    //O carregamento começa com verdadeiro (O símbolo de loading aparece - inicia carregando)
    const [loading, setIsLoading] = useState(true);

    //Vendo por meio do FirebaseAuthTypes o estado do usuário (online ou offline)
    const [user, setUser] = useState<FirebaseAuthTypes.User>();


    //Verificando o estado do usuário
    useEffect(()=>{

        const subscriber = auth().onAuthStateChanged(response => {
            setUser(response);
            setIsLoading(false);
        });

        //Retornará o usuário após verificar o estado de mudança e parar de carregar
        return subscriber;
    }, []);

    
    //Se carregar, irá aparecer o símbolo de loading:
    if(loading){

        return <Loading/>
    }

    return(
        <NavigationContainer>

            {/*O usuário sendo autorizado, irá para AppRoutes. 
            Caso não seja, voltará para a tela de Cadastro*/}
           {user ? <AppRoutes/> : <SignIn/>}

        </NavigationContainer>
    )
}
