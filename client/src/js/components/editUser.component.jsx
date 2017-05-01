import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Navbar from './nav.component';
import viewUserAction from '../actions/userManagement/viewUser.js';
import editUserAction from '../actions/userManagement/editUser.js';
import deleteUserAction from '../actions/userManagement/deleteUser.js';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      role: '',
      token: localStorage.getItem('token')
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userId: jwtDecode(token).userId });
      this.props.viewUser(token, jwtDecode(token).userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateUser(event) {
    const userId = jwtDecode(this.state.token).userId;
    this.props.updateUser(this.state.token, this.state, userId);
  }

  deleteUser(event) {
    const userId = jwtDecode(this.state.token).userId;
    this.props.deleteUser(userId);
    Materialize.toast('User deleted!', 3000)
  }

  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Navbar />
        <div className="col s12 workspace ">
          <div className="row workspace-header"><h4>Profile</h4></div>
          <div className="doc_list z-depth-4 panel doc_content">
            <form className="userProfile">
              <label htmlFor="userName">Username: </label>
              <input
                type="text"
                name="userName"
                id="username"
                value={this.state.userName}
                onChange={this.handleChange}
              />
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                name="firstName"
                id="first_name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                name="lastName"
                id="last_name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password: </label>
              <span>********</span>
              <Link
                to="/change-password"
                id="changePassword"
                className="btn"
              >Change</Link>
              <div className="row">
                <button
                  type="submit"
                  className="updateUser btn"
                  onClick={() => this.updateUser()}
                >Save</button>
              </div>
              <div className="row">
                <button
                  type="submit"
                  className=" btn"
                  onClick={() => this.deleteUser()}
                >Delete profile</button>
              </div>
            </form>
            <div />
          </div>
        </div>
      </div>

    );
  }
}


EditUser.propTypes = {
  viewUser: PropTypes.func.isRequired
};

const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (usertoken, userId) => dispatch(viewUserAction(usertoken, userId)),
    updateUser: (usertoken, userDetails, userId) =>
    dispatch(editUserAction(usertoken, userDetails, userId)),
    deleteUser: (userId) => dispatch(deleteUserAction(userId))
  };

};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUser);
