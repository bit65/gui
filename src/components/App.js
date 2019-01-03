import React, { Component } from 'react';
import './App.scss';
import { Footer } from './footer';
import { Header } from './header';
import { MainPage } from './main.page';
import { AssetPage } from './asset.page';
import { LibraryPage } from './library.page';
import { FilePage } from './file.page';
import { Switch, Route } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <main>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/apk/:apk*' component={AssetPage} />
            <Route path='/lib/:lib*' component={LibraryPage} />
            <Route path='/file/:file*' component={FilePage} />
          </Switch>
        </main>

        <Footer />
      </div >
    );
  }
}