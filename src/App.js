import React from 'react';
import MyLayout from './MyLayout';
import MyTimestamp from './MyTimestamp';
import MyBase64Image from './MyBase64Image';
import MyFileSharer from './MyFileSharer';

class App extends React.Component{

  render(){
    const {classes} = this.props;

    return (
      <div>
        <MyLayout></MyLayout>
        {/* <MyTimestamp></MyTimestamp> */}
        {/* <MyBase64Image></MyBase64Image> */}
        <MyFileSharer></MyFileSharer>
      </div>
    );

  }
}

export default App;