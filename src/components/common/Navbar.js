import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import Auth from '../../lib/auth'

class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      profilePic: ''
    }
  }

  handleLogout(){
    Auth.logout()
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      this.getProfilePic()
    }
  }

  componentDidMount(){
    this.getProfilePic()
  }

  getProfilePic(){
    if (Auth.isAuthenticated()) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(res => this.setState({ profilePic: res.data.profilePic }))
    }
  }


  render() {
    return (
      <div className="nav-sidebar animated fadeIn" style={{ userSelect: 'none' }}>

        <div className="nav-wrapper">
          <nav>
            <div className="nav-top">
              <div className="nav-divide">
                <Link to='/' className="logo">
                  <p className="animated fadeIn">{'techTalk'}</p>
                </Link>
              </div>
              <Link to='/' className="home animated fadeInLeft">
                <i className="fas fa-home left"></i>
                <span>HOME</span>
              </Link>
              <Link to='/events' className="animated fadeInLeft">
                <i className="fa fa-search left"></i>
                <span>EVENTS</span>
              </Link>
              {Auth.isAuthenticated() && 
              <Link to='/events/create' className="animated fadeInLeft">
                <i className="fas fa-pencil-alt left"></i>
                <span>CREATE</span>
              </Link>
              }
            </div>



            <div className="nav-bottom">
              {Auth.isAuthenticated() ?
            <>
              <Link to='/profile' className="animated fadeInLeft">
                <div className="profile-wrapper left">
                  <div className="profile">
                    {/* <img src={this.state.profilePic}></img> */}
                    <i className="fas fa-user-circle"></i>
                  </div> 
                </div>
                <span>PROFILE</span>
              </Link>
              <Link to='/settings' className="animated fadeInLeft"><i className="fas fa-cogs left"></i>
                <span>SETTINGS</span></Link>
              <Link to='/' onClick={this.handleLogout}><button className="button-warning auth-button">
                <span>LOGOUT</span>
              </button></Link>
            </> :
            <>
            <Link to='/register' className="animated fadeInLeft">
              <button className="button-secondary auth-button">
                <span>Register</span>
              </button></Link>
            <Link to='/login' className="animated fadeInLeft">
              <button className="button-secondary auth-button">
                <span>Login</span>
              </button></Link>
            </>
              }
            </div>       
          </nav>
        </div>

      </div>

    )
  }

}

export default withRouter(Navbar)



