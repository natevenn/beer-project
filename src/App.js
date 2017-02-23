import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import './header.css'
import './nav.css'
import './footer.css'
import './body.css'
import './BeerForm.css'
import Header from './components/Header.js'
import Intro from './components/Intro.js'
import Beers from './components/Beers.js'
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.fetchBeers = this.fetchBeers.bind(this)
    this.fetchBeerTypes = this.fetchBeerTypes.bind(this)
    this.handleAddedBeer = this.handleAddedBeer.bind(this)
    this.state = {
      beers: [],
      beerTypes: [],
      type: "",
      text: "",
      sort: false
    }
  }

  componentWillMount() {
    this.fetchBeers()
    this.fetchBeerTypes()
  }

  handleAddedBeer(beer) {
    let beers = this.state.beers
    beers.push(beer)
    this.setState({
      beers: beers
    })
  }

  fetchBeerTypes(params={}) {
    let searchParams = "current_beers=" + params.currentBeers +
                       "&" + "token=" + params.token

    fetch("http://localhost:3001/api/v1/beer_types?" + searchParams, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        beerTypes: responseJson.types
      })
    })
    .catch((error) => {
      alert(error);
    })
  }

  fetchBeers(params={}) {
    if (params.type === undefined) {
      params.type = this.state.type
    }

    if (params.text === undefined) {
      params.text = this.state.text
    }

    if (params.sort === undefined) {
      params.sort = this.state.sort
    }

    if (params.currentBeers === undefined) {
      params.currentBeers = this.state.currentBeers
    }

    let searchParams = "type=" +
                       params.type.toLowerCase() +
                       "&" + "text=" + params.text.toLowerCase() +
                       "&" + "sort=" + params.sort +
                       "&" + "current_beers=" + params.currentBeers +
                       "&" + "token=" + params.token

    fetch("http://localhost:3001/api/v1/beers?" + searchParams, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        beers: responseJson.beers
      })
    })
    .catch((error) => {
      alert(error);
    })

    this.setState({
      type: params.type,
      text: params.text,
      sort: params.sort,
      currentBeers: params.currentBeers
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Nav fetchBeers={this.fetchBeers}
          beerTypes={this.state.beerTypes}
          sort={this.state.sort}
          handleCurrentBeers={this.handleCurrentBeers}
          currentBeers={this.state.currentBeers}
          handleAddedBeer={this.handleAddedBeer}
          fetchBeerTypes={this.fetchBeerTypes}
        />
        <Intro />
        <Beers beers={this.state.beers} />
        <Footer />
      </div>
    );
  }
}

export default App;
