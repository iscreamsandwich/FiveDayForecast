// url with API key: http://api.openweathermap.org/data/2.5/forecast?q=10309,us&units=imperial&APPID=f9c997b1dda662b8a55159163b5a1342
import React, { Component } from 'react';
import DayCard from './DayCard';
import LocationForm from './LocationForm'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weather: [],
      index: 0,
      isLoaded: false,
      value: '',
      zip: '10309'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  //fetch initial data for zip of 10309 by default (Staten Island)
  componentDidMount() {
    this.getData()
  }

  //method to fetch data from API
  getData() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.zip},us&units=imperial&APPID=f9c997b1dda662b8a55159163b5a1342`)
      .then(res => res.json())
      .then(data => this.setState({
        weather: data.list,
        isLoaded: true
      }))
  }
  
  //save value from input form
  handleChange(e){
    this.setState({
      value: e.target.value
    })

    e.preventDefault()
  }

  //update location for weather
  handleSubmit(e) {
    this.setState({ 
      zip: this.state.value},
       () => {
         this.getData()
    })

    e.preventDefault()
  }

  render() {
    //create 5-day forecast cards
    let weatherDisplay = []
    for (var i = 0; i < 5; i++) {
      weatherDisplay.push(<DayCard weather={this.state.weather} index={i*8} key={i}/>)
    }

    //conditional rendering
    let display = ""
    if (this.state.weather) {
    display = this.state.isLoaded ? weatherDisplay : "Loading..."
    } else {
      display = "Location not found. Please enter a valid zip code."
    }

    return (
      <div className="App">
        <LocationForm 
          onChange={this.handleChange} 
          onSubmit={this.handleSubmit} 
          value={this.state.value}
          setRef={this.input}/>
        {display}
      </div>
    );
  }
}

export default App;


//TODO:
//DRY up
//style better