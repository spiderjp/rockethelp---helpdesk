//Botão padrão que usaremos ao longo do projeto
import { Button as ButtonNativeBase, Heading, IButtonProps} from 'native-base';

//Criação de um title como Props (uma propriedade criada para uso específico)
//Facilitação no dinamismo - mudança dos títulos dos botões
//União da props criada mais todas existentes dentro do IButtonProps
type Props = IButtonProps & {
    title: string;
}

//Passando o valor da propriedade title criada e de todas as restantes
export function Button({title, ...rest}: Props) {
  return (
    <ButtonNativeBase
    bg="green.700"
    h={14}
    fontSize="sm"
    rounded="sm"
    _pressed={{bg: "green.500"}}
    {...rest}
    >

        <Heading color="white" fontSize="sm">
            {title}
        </Heading>

    </ButtonNativeBase>
  );
}