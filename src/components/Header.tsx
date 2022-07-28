import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import {useNavigation} from "@react-navigation/native";

//Criação de um tipo de propriedades
type Props = StyledProps &{

    title: string;
}

export function Header({title,...rest}: Props) {
    
    //Acessando as cores do native-base
   const {colors} = useTheme();

   //Usando o useNavigation do react navigation para rotas
   const navigation = useNavigation();

   //Fazendo a manipulação da rota quando voltar para a tela anterior
   function handleGoBack(){
    navigation.goBack();
   }

    return (
        <HStack w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pb={6}
        pt={12}
        {...rest}>

        <IconButton icon={<CaretLeft  color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}/>
        
        <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1} ml={-6}>
            {title}
        </Heading>
        
        </HStack>
    );
}