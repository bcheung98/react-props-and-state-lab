import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    });
  }

  onFindPetsClick = () => {
    let url = "/api/pets";
    if (this.state.filters.type !== "all") {
      url += `?type=${this.state.filters.type}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pets: data
        });
      });
  }

  onAdoptPet = (id) => {
    // let petsCopy = [...this.state.pets];
    // petsCopy.forEach(pet => {
    //   if (pet.id == id) {
    //     pet.isAdopted = true;
    //   }
    // })
    // this.setState({
    //   pets: petsCopy
    // })
    let petsCopy = this.state.pets.map(pet => {
      return pet.id == id ? {...pet, isAdopted: true} : pet
    });
    this.setState({
      pets: petsCopy
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
