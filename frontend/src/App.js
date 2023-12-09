import React from 'react'
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login';
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const errorLink = onError(({graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`);
    });
  }
})
const link = from([
  errorLink, 
  new HttpLink({uri: "http://127.0.0.1:3000/graphql"}),
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
        <Route path="/events" element={<Login />} />
        <Route path="/create" element={<Login />} />
        <Route path="/myevents" element={<Login />} />
      </Routes>
    </Router>
  </ApolloProvider>
}

export default App;
