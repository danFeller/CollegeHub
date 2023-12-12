import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import backendURL from './config';
import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';

const errorLink = onError(({graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`);
    });
  }
})
const link = from([
  errorLink, 
  new HttpLink({uri: `${backendURL.uri}/graphql`}),
])
//Client Creation; instance of Apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})



function App() {
  return <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/events" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/myevents" element={<Login />} />
      </Routes>
    </Router>
  </ApolloProvider>
}

export default App;
