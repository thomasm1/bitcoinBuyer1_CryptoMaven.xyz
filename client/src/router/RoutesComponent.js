import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// Page
import FindersHome from '../pages/FindersHome';
class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={FindersHome} />
      </div>
    );
  }
}
export default RoutesComponent;