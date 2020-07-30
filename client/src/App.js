import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from './components/Home/Home.jsx'
import Search from './components/Search/Search'
import Chat from './components/Chat/Chat'
import Error from './components/Error/Error'



function App() {
  return (
    <section className="container">
      <main>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/search' component={Search} exact />
            <Route path='/chat' component={Chat} exact />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </main>
    </section>
  )
}
export default App;
