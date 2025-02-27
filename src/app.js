import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import Home from './components/common/Home'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'
import EventCreate from './components/events/EventCreate'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/common/Profile'
import ProfileSettings from './components/auth/ProfileSettings'
import Navbar from './components/common/Navbar'


class App extends React.Component{


  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <div className="page-structure ">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/events/create' component={EventCreate} />
              <Route path='/events/:id' component={EventShow} />
              <Route path='/events' component={EventIndex} />
              <Route path='/profile' component={Profile} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/settings' component={ProfileSettings} />
            </Switch>
          </div> 
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)