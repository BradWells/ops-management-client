import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from '../header/Header/Header';
import MyPage from '../MyPage/MyPage';

function App() {
  return (
    <Container maxWidth={false} className="App">
      <Header />
      {/*Add in <TeamProvider>? */}
      <MyPage />
    </Container>
  );
}

export default App;
