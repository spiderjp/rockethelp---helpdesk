/*
Input tem um "novo" nome, um apelido que usaremos.
Assim não dará conflito com o nome da Função
*/

//Input padrão que usaremos ao longo do projeto
import { Input as NativeBaseInput, IInputProps } from "native-base";

/*
O ...rest permite eu chamar o componente em outro lugar,
e passar mais atributos além dos definidos
*/

//IInputProps é para aparecer todas as propriedades do Input com InteliSense
export function Input({...rest}:IInputProps){

    return(
        <NativeBaseInput
        bg="gray.700"
        h={14}
        size="md"
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        color="white"
        placeholderTextColor="gray.300"
        //Estilização específica no Input clicado
        _focus={{
            borderWidth: 1,
            borderColor: "green.500",
            bg: "gray.700"
        }}
        {...rest}
        />
    );
}