import React, { Component } from 'react';
import './header.scss';

export class Header extends Component {
    render() {
        return (
            <header>
                <h1>
                    <a href="#">
                        bit<span>65</span>
                    </a>
                </h1>

                <nav>
                    <a href="/" className="link menu-button">Search</a>
                    <a href="/" className="link menu-button">Explore</a>
                    <a href="/" className="link menu-button">About</a>
                    <a href="/" className="link menu-button">Contribute</a>
                </nav>
            </header>
        );
    }
}