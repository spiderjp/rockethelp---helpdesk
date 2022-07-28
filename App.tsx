import React from 'react';

import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/styles/theme';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';


export default function App() {

  //Uma constante booleana que sempre irá carregar o useFonts com os dois tipos de fontes declaradas
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>

      <StatusBar 
      barStyle="light-content" 
      backgroundColor="transparent" 
      translucent
      />
      
      {/*Ternário:
      Se a fontsLoaded for carregada, então o resultado será Routes. 
      Caso não tenha sido crregada, resultado será Loading
      */}

      {fontsLoaded ? <Routes/> : <Loading/>}
    </NativeBaseProvider>
  );
}
