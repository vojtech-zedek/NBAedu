import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Homepage from './pages/Homepage';
import Teams from './pages/Teams';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/teams/:id' element={<Teams />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
