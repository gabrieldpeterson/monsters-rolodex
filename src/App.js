import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
        monsters: [],
        inputText: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => 
        this.setState(
          () => {
            return { monsters: users};
          },
          () => {
            console.log(this.state);
          }
        ));
  }

  render() {
    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='search monsters' 
          onChange={(event) => {
            this.setState(() => {
              return { inputText: event.target.value.toLowerCase() }
            });
          }}/>
        {this.state.monsters.filter(monster => monster.name.toLowerCase().includes(this.state.inputText)).map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
