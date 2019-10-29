import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import moment from 'moment'

import Map from '../common/Map'

const animatedComponents = makeAnimated()

class EventIndex extends React.Component {
  constructor(){
    super()

    this.state = {
      events: null,
      filter: {
        category: '',
        location: '',
        date: '',
        price: ''
      },
      checkbox: false
    }

    this.categories = [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'php', label: 'PHP' },
      { value: 'java', label: 'Java' },
      { value: 'swift', label: 'Swift' },
      { value: 'c++', label: 'C++' },
      { value: 'sql', label: 'SQL' },
      { value: 'ruby', label: 'Ruby' }
    ]
    
    this.date = [
      { value: 'current', label: 'Current Week' },
      { value: 'month', label: 'This Month' },
      { value: 'all', label: 'All Events' }
    ]

    this.locations = [
      { value: 'london', label: 'London' }
    ]

    this.handleFreeEventClick = this.handleFreeEventClick.bind(this)
    
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }))
  }

  handleFreeEventClick() {
    this.setState({ checkbox: !this.state.checkbox })
  }

  render() {
    console.log(this.state)
    const { events } = this.state
    if (!events) return null
    return (
      <div className="index-page">
        <div className="filter-list-wrapper">
          <Select className="category-select" options={this.categories} placeholder="Categories" isMulti components={animatedComponents} 
            theme={theme => ({
              ...theme,
              // borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#0B3954',
                primary: 'black'
              }
            })}
          />
          <Select className="date-select" options={this.date} placeholder="Date" />
          <button onClick={this.handleFreeEventClick} className={`checkbox-input ${!this.state.checkbox ? 'off' : 'on' }`}>Free Events Only</button>
        </div>
        <div className="list-map-wrapper">
          <div className="event-list">
            {
              events.map(event => (
                <Link to={`/events/${event._id}`} key={event._id} className="event-linktag">
                  <div className="event-wrapper" >
                    <div className="event-text">
                      <div className="event-name">
                        <h4 className="event-name-text">{event.name}</h4>
                      </div>
                      <div className="event-description">
                        <p>{moment(event.date).format('h:mm A')}</p>
                        <p>{moment(event.time, 'HH:mm').format('MMM do YYYY')}</p>
                      </div>
                    </div>
                    <div className="event-thumbnail-image">
                      <i className="fab fa-js-square"></i>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
          <div className="map-wrapper">
            <Map events={events}/>
          </div>
        </div>
      </div>
    )
  }
}

export default EventIndex