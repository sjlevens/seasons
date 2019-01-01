import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  /* constructor(props) {
    //super(props) -- reference to the parents constructor function nescesary
    super(props);

    // THE ONLY TIME DIRECT ASSIGNMENT TO STATE
    this.state = { lat: null, errorMessage: '' };
  } */
  // Same syntax as constructor
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    console.log('Mounted');
    window.navigator.geolocation.getCurrentPosition(
      position => {
        //Called setState which comes from React
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidUpdate() {
    console.log('Updated');
  }

  // React needs to define render
  render() {
    console.log('rendering');
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }
    return <div>Loading</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
