import React from 'react'
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Create from './pages/Create';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const errorLink = onError(({graphqlErrors}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message}) => {
      alert(`Graphql error ${message}`);
      return message
    });
  }
})
const link = from([
  errorLink, 
  new HttpLink({uri: "https://event-management-backend-ffed50068636.herokuapp.com/graphql"}),
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
