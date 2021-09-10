import React from 'react';
import ReactDOM from 'react-dom';
import CurrentTasksGrid from './CurrentTasksGrid';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentTasksGrid selectedJobId="1"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});