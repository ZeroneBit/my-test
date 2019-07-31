import React from 'react';
import MyLayout from './MyLayout';
import MyRoutes from './MyRoutes';

class App extends React.Component{

  render(){
    return (
      <div>
        <MyLayout></MyLayout>
        <MyRoutes></MyRoutes>
      </div>
    );

  }
}

export default App;