import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

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

  componentDidUpdate() {}

  // React needs to define render
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Loader message="Please allow location request" />;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
