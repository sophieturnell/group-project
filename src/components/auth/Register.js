import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        category: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    console.log(e.target)
    console.log('hi', e.target.name, e.target.value)
    const data = { ...this.state.data, [e.target.name]: e.target.value } //adds inputted data to initially empty keys
    // const errors = { ...this.state.errors, [e.target.name]: '' } //clears the error meessage when start typijng again
    this.setState({ data, errors: {} }) //each key stroke causes re-render

  }
  handleSubmit(e) {
    e.preventDefault()  //stops page auto reload
    axios.post('/api/register', this.state.data)  //posts inputted data to the api
      .then(res => console.log(res.data))
      .then(() => this.props.history.push('/login')) // redirects user to login page
      .catch(err => this.setState({ errors: err.response.data }))
      // .catch(err => console.log(err.response.data))
    // console.log('submitted', this.state.data)
  }


  render() {
    console.log('rendered', this.state)
    return (
      // <div className="register-page">
      <div className="register-page">
        <div className="form-box-register animated fadeInUp">
      
          <form onSubmit={this.handleSubmit}>
            <div className="form-title-wrapper">
              <h1>Register</h1>
            </div>

            <div className="form-input-wrapper">
              <label className="label">Username:</label>
              <div className="control">
                <input
                  className={`form-input ${this.state.errors.username ? 'error' : '' }`}
                  name="username"
                  type="text"
                  placeholder="e.g. Joe Blogs"
                  onChange={this.handleChange}
                />
              </div>
              {/* {this.state.errors.username && <small >{this.state.errors.username}</small>} */}
              {/* first time there is n such thing as this.state.errors.username as errors is an empty object until submitted data causes an error */}
              {/* if username is not undeefined, display <small> message */}
            </div>


          
            <div className="form-input-wrapper">
              <label className="label">Email:</label>
              <div className="control">
                <input 
                  className={`form-input ${this.state.errors.email ? 'error' : '' }`}
                  name="email"
                  type="text"
                  placeholder="e.g. jblogs@mailbox.com"
                  onChange={this.handleChange}
                />
              </div>
              {/* {this.state.errors.email && <small >{this.state.errors.email}</small>} */}
            </div>

            <div className="form-input-wrapper">
              <label className="label">Password:</label>
              <div className="control">
                <input 
                  className={`form-input ${this.state.errors.password ? 'error' : '' }`}
                  name="password"
                  type="password"
                  placeholder="Please add password here"
                  onChange={this.handleChange}
                />
              </div>
              {/* {this.state.errors.password && <small >{this.state.errors.password}</small>} */}
            </div>

            <div className="form-input-wrapper">
              <label className="label">Password Confirmation:</label>
              <div className="control">
                <input 
                  className={`form-input ${this.state.errors.passwordConfirmation ? 'error' : '' }`}
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Please repeat password here"
                  onChange={this.handleChange}
                />
              </div>
              {/* {this.state.errors.password && <small >{this.state.errors.password}</small>} */}
            </div>



            <div className="form-input-wrapper">
              <label className="label">Please select your language below: </label>
            </div>


            {/* BOXES */}
            <div className="category-container-wrapper">
              <div className="category-container">
                
                {/* ROW 1 */}
                <div className="row1">

                  {/* RADIO BUTTON 1 */}
                  <label htmlFor="java"> {/* htmlFor -links to input id on radio button */}
                    <div className="category-box">
                      <div className="box" 
                        onClick={this.handleChange}
                        name="category"
                      >
                        {/* WHITE LOGO */}
                        {this.state.data.category === 'java' ?
                          <img className="box-after-image selected" src="../assets/javaT.png"></img> :
                        <>
                        <img className="box-initial-image" src="../assets/java-white-button.png"></img>
                        <div className="box-overlay"> {/* TO COLOUR LOGO */}
                          <img className="box-after-image" src="../assets/javaT.png"></img> {/* fix after image clicked */}
                        </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input // input=e.target
                    type="radio" 
                    id="java" 
                    name="category" 
                    onChange={this.handleChange}
                    checked={this.state.category === 'java'} // if category is java = true, if not false
                    value="java"
                  ></input> {/* handles radio button change */}




                  {/* RADIO BUTTON 2 */}
                  <label htmlFor="swift">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'swift' ?
                          <img className="box-after-image selected" src="../assets/swift-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/swift-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/swift-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="swift"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'swift'}
                    value="swift"
                  ></input>




                  {/* RADIO BUTTON 3 */}
                  <label htmlFor="js">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'js' ?
                          <img className="box-after-image selected" src="../assets/js-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/js-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/js-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="js"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'js'}
                    value="js"
                  ></input>
              
              
                  {/* RADIO BUTTON 4 */}
                  <label htmlFor="php">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'php' ?
                          <img className="box-after-image selected" src="../assets/php-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/php-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/php-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="php"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'php'}
                    value="php"
                  ></input>
              

                </div>

                {/* ROW 2 */}
                {/* <div className="row2">
                  <p className="category-name">Java</p>
                  <p className="category-name">Swift</p>
                  <p className="category-name">JavaScript</p>
                  <p className="category-name">PHP</p>
                </div> */}

                {/* ROW 3 */}
                <div className="row3">



                  {/* RADIO BUTTON 5 */}
                  <label htmlFor="c">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'c' ?
                          <img className="box-after-image selected" src="../assets/c-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/c-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/c-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="c"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'c'}
                    value="c"
                  ></input>



                  {/* RADIO BUTTON 6 */}
                  <label htmlFor="sql">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'sql' ?
                          <img className="box-after-image selected" src="../assets/sql-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/sql-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/sql-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="sql"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'sql'}
                    value="sql"
                  ></input>
              

                

                  {/* RADIO BUTTON 7 */}
                  <label htmlFor="python">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'python' ?
                          <img className="box-after-image selected" src="../assets/python-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/python-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/python-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="python"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'python'}
                    value="python"
                  ></input>


                  {/* RADIO BUTTON 8 */}
                  <label htmlFor="ruby">
                    <div className="category-box">
                      <div className="box" onClick={this.handleChange} name="category">
                        {this.state.data.category === 'ruby' ?
                          <img className="box-after-image selected" src="../assets/ruby-colour-button.png"></img> :
                        <>
                          <img className="box-initial-image" src="../assets/ruby-white-button.png"></img>
                          <div className="box-overlay">
                            <img className="box-after-image" src="../assets/ruby-colour-button.png"></img>
                          </div>
                        </>
                        }

                      </div>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id="ruby"
                    name="category"
                    onChange={this.handleChange}
                    checked={this.state.category === 'ruby'}
                    value="ruby"
                  ></input>


                </div>

                {/* ROW 4 */}
                {/* <div className="row4">
                  <p className="category-name">C++</p>
                  <p className="category-name">SQL</p>
                  <p className="category-name">Python</p>
                  <p className="category-name">Ruby</p>
                </div> */}

              </div>

            </div>
            <div className="form-button-wrapper">
              <button type="submit">Submit</button>
            </div>
          </form>

        </div>

      </div>
    )
  }
}

export default Register