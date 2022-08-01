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

  onSearchChange = (event) => {
    this.setState(() => {
      return { inputText: event.target.value.toLowerCase() }
    });
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
    const { monsters, inputText } = this.state;
    const { onSearchChange } = this;
    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='search monsters' 
          onChange={onSearchChange}/>
        {monsters.filter(monster => monster.name.toLowerCase().includes(inputText)).map((monster) => {
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
