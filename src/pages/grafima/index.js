import React, { Component } from 'react';
import { render } from 'react-dom';
import LineDemo from './LineDemo';

import "bootstrap/dist/css/bootstrap.min.css";

import './style.css';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

const App = () => (
    <div style={styles}>
        <LineDemo/>
    </div>
);
  

export default class Grafima extends Component {
    render (){
        return(
            <div style={styles}>
                <LineDemo/>
            </div>
        );
    }
}

