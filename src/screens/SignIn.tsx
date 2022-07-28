import  {useState} from "react";
import { Alert } from 'react-native';

import {VStack, Heading, Icon, useTheme } from 'native-base';
//Utilizaremos ícones por meio de uma biblioteca de ícones (Phosphor)
import {Envelope, Key} from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

//Importando firebase (autenticação)
import auth from '@react-native-firebase/auth';


//Função para criar um novo usuário
export function SignIn(){

    /*
    useState para dar valores iniciais aos campos e receber os digitados nos Inputs,
    atualizando o estado das constantes
    */

    //Uma variável para receber o valor que a função obterá (princípio da Imutabilidade)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[isLoading, setIsLoading] = useState(false);


    //Invocando o useTheme com os tokens, para depois usá-los
    const {colors} = useTheme();

    //Função para cadastrar e manipular os dados cadastrados (fazendo o cadastro do usuário):
    function handleSignIn(){

        if(!email || !password){

            return Alert.alert("Entrar", "Informe e-mail e senha.");
        }

        setIsLoading(true);


        //verificando se o usuário está cadastrado no banco de dados firebase
        auth().signInWithEmailAndPassword(email,password).
        catch((error)=>{

            console.log(error);
            setIsLoading(false);

            //Caso tenha algum dos erros seguintes, então não conseguirá acessar sua conta
            if (error.code === 'auth/invalid-email') {
                return Alert.alert('Entrar', 'E-mail inválido.');
              }
      
              if (error.code === 'auth/wrong-password') {
                return Alert.alert('Entrar', 'E-mail ou senha inválida.');
              }
      
              if (error.code === 'auth/user-not-found') {
                return Alert.alert('Entrar', 'E-mail ou senha inválida.');
              }

              return Alert.alert('Entrar', 'Não foi possível acessar');
            });
    }

    return(
        
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>

            <Logo/>
            
            <Heading color="grey.100" fontSize="xl" mt={20} mb={6}>
               Acesse sua conta
            </Heading>

            <Input 
            mb={4}
            ml={4}
            placeholder="E-mail"
            InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />}
            />}
            onChangeText={setEmail}
            />
            
            <Input 
            mb={8}
            ml={4}
            placeholder="Senha"
            InputLeftElement={<Icon as={<Key color={colors.gray[300]} />}
            />}
            secureTextEntry //é para esconder a senha
            onChangeText={setPassword}
            />

            <Button title="Entrar"
            w="full"
            onPress={handleSignIn}
            isLoading={isLoading}
            />
        
        </VStack>
                         
    );
}