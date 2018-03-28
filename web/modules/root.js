import './styles/root.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';

import { env } from './store/index';
import { Commands } from './commands';

@observer
export class Root extends Component {

    render() {
        return do {
            if (!env.connected) {
                <span>Connecting...</span>
            }
            else {
                <main>
                    <nav>
                        <h1>nibblrjr</h1>
                    </nav>
                    <Commands/>
                </main>
            }
        }
    }
}

render(<Root/>, document.body.appendChild(document.createElement('div')));
