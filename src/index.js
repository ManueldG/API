
//https://api.chucknorris.io/jokes/random
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.chucknorris.io/jokes/random")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.value);
          this.setState({
            isLoaded: true,
            items: result.value
          });
        },
        // Nota: è importante gestire gli errori qui
        // invece di un blocco catch() in modo da non fare passare
        // eccezioni da bug reali nei componenti.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items}
        </ul>
      );
    }
  }

}

ReactDOM.render(<MyComponent />, document.getElementById("root"));
