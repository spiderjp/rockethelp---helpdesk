//Componente que será usado em situações de carregamento de telas

import {Center, Spinner} from 'native-base';

export function Loading(){

    return(
        <Center flex={1} bg="gray.700">
            <Spinner color="secondary.700" />
        </Center>
    );
}