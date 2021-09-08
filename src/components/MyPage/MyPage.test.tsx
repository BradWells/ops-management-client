import React from 'react';
import ReactDOM from 'react-dom';
import MyPage from './MyPage';

it('MyPage should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});