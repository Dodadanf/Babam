import React, {Fragment} from 'react';
import './App.css';

//component

import InputSong from './components/Inputsong';
import ListSongs from './components/ListSongs';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputSong />
        <ListSongs />
      </div>
    </Fragment>
  );
}

export default App;
