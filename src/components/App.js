import React, { Component } from 'react';
import './App.scss';
import { Footer } from './footer';
import { Header } from './header';
import { MainPage } from './main.page';
import { Switch, Route } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <main>
          <Switch>
            <Route exact path='/' component={MainPage} />
          </Switch>
        </main>

        <Footer />
      </div >
    );
  }
}