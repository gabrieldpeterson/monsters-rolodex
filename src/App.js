import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
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
            //console.log(this.state);
          }
        ));
  }

  render() {
    const { monsters, inputText } = this.state;
    const { onSearchChange } = this;
    
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(inputText);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
          className='search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters'
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
