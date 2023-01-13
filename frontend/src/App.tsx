import React from 'react';
import './App.css';
import Game from './Game';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
    <div className="App container">
      <Game />
    </div>
    </ChakraProvider>
  );
}

export default App;
