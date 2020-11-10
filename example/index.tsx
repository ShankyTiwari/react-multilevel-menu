import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import list, {configurations} from './constants';
import './index.scss';

import { MultilevelMenu } from '../.';

const App = () => {

  return (
    <div className="app__page-container">
      <div className="app__wrapper-container">
        <div className="app__plugin-branding">
          <h1>react-multilevel-menu</h1>
          <span className="short-desc">Multi-Level Menu for React Projects</span>
        </div>
        <div className="app__demo-container">
          <div className="app__demo-wrapper">
            <MultilevelMenu list={list} configuration={configurations}/>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
