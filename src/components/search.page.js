import React, { Component } from 'react';
import './main.page.scss';

export class MainPage extends Component {
    render() {
        return (
            <section className="main">
                <div className="center">
                    <h2>
                        Awesome <span>slogan</span> that makes you curious
                    </h2>

                    <h3>
                        Unbelievely cool one-liner that explains <span>everything</span> as clear as possible
                    </h3>

                    <input type="search" placeholder="Ex.: TWITTER" />
                    <a className="btn primary">Search</a>
                </div>
            </section>
        );
    }
}