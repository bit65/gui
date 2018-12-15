import React, { Component } from 'react';
import './main.page.scss';
import { SearchResult } from './search-result';

export class MainPage extends Component {
    state = {};

    render() {
        return (
            <section className="main">
                <h2>
                    Awesome <span>slogan</span> that makes you curious
                    </h2>

                <h3>
                    Unbelievely cool one-liner that explains <span>everything</span> as clear as possible
                    </h3>

                <input type="search" placeholder="e.g.: TWITTER" />
                <a className="btn primary" onClick={() => this.setState({ showResults: true })}>Search</a>

                <div class="search-results" style={{display: this.state.showResults ? 'block' : 'none'}}>
                    <SearchResult
                        title={<span>login_text_<span className="highlight">twitter</span></span>}
                        type="App Resource"
                        package="com.harrys.tripmaster"
                        file="classes.dex"
                        value={<span>Sign in with <span className="highlight">Twitter</span></span>}
                    />

                    <SearchResult
                        title={<span><span className="highlight">TWITTER</span>_KEY</span>}
                        type="App Resource"
                        package="com.harrys.tripmaster"
                        file="classes.dex"
                        value="315b91832ae7644b5712c0403fb754f23005c6a2075c90f9ee821d4b91e89e85"
                    />
                </div>
            </section>
        );
    }
}