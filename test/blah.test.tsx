import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MultilevelMenu } from '../src';
import { list, configurations } from './../example/constants';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MultilevelMenu
        list={list}
        configuration={configurations}
        selectedListItem={event => {
          console.log(event);
        }}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
