import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

let users = [];

axios.get('/api/user/view/all')
    .then((response) => {users = response})

class UserList extends Component {
  state = {
    heading: 'User List Component',
  };

  

  userList = users

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        {JSON.stringify(this.userList)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserList);