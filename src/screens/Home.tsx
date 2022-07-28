import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Order, OrderProps } from '../components/Order';


//Importando Firebase (autenticação, banco de dados e formato de data)
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { dateFormat } from '../utils/firestoreDateFormat';


//Tela de início do aplicativo
export function Home() {



    //Acessando as cores do native-base
    const {colors} = useTheme();

    //Usando o useNavigation do react navigation para rotas
    const navigation = useNavigation();

    //O estado inicial da tela será carregando
    const [isLoading, setIsLoading] = useState(true);

    //Só pode ser open ou closed os states, e começa open (aberta)
    const [statusSelected, setStatusSelected] = useState<"open" | "closed">("open");

    //O estado inicial e o formato das ordens (uma lista- começa vazia)
    const [orders, setOrders] = useState<OrderProps[]>([]);

    //Fazendo a manipulação da rota quando adicionar uma nova solicitação
    function handleNewOrder(){

        navigation.navigate("new");
    };

    //Fazendo a manipulação da rota quando clicar para ver os detalhes
    function handleOpenDetails(orderId: string){

        //tela de details, e passando os valores de acordo com a propriedade ID (levando junto os detalhes)
        navigation.navigate("details", {orderId});
    }

    //Função de logout (Sair do aplicativo e voltar para a tela de início)
    function handleLogout(){

        auth().signOut().
        //Caso dê algum erro na saída da tela do usuário
        catch(error => {

            console.log(error);
            return Alert.alert("Sair", "Não foi possível sair.");
        });
    }


    useEffect(() => {
        setIsLoading(true);
    
        const subscriber = firestore()
          .collection('orders')
          .where('status', '==', statusSelected)
          .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
              const { patrimony, description, status, created_at } = doc.data();
    
              return {
                id: doc.id,
                patrimony,
                description,
                status,
                when: dateFormat(created_at)
              }
            });
    
            setOrders(data);
            setIsLoading(false);
          });
    
        return subscriber;
      }, [statusSelected]);


    return (
        <VStack flex={1} bg="gray.700" pb={6}>
            <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}>

                <Logo/>

                {/*Botão com ícone*/}
                <IconButton
                icon={ <SignOut size={26} color={colors.gray[300]} /> }
                onPress={handleLogout}
                />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                    <Heading color="gray.100">
                        Solicitações
                    </Heading>

                    <Text color="gray.200">
                        {/*Tamanho da lista de solicitações*/}
                         {orders.length}
                    </Text>
                </HStack>

                <HStack space={3} mb={8}>
                    <Filter 
                    type="open"
                    title="em andamento"
                    onPress={()=> setStatusSelected("open")}
                    isActive={statusSelected === "open"}/>

                    <Filter 
                    type="closed"
                    title="finalizados"
                    onPress={()=> setStatusSelected("closed")}
                    isActive={statusSelected === "closed"}/>
                </HStack>

                {

                    //Se não estiver carregando, então mostrar (renderizar) na tela os cards
                   isLoading?  <Loading/> :
                    <FlatList
                    data={orders}
                    keyExtractor={item => item.id} // Os indentificadores das listas são os IDs únicos
                    renderItem={({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 100}}
                    ListEmptyComponent={()=> (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40}/>
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                                Você ainda não possui {"\n"}
                                solicitações {statusSelected === "open" ? "em andamento" : "finalizadas"}
                            </Text>
                        </Center>
                    )}/>
                }

                <Button title="Nova atualização" onPress={handleNewOrder}/>

            </VStack>

        </VStack>
    );
}