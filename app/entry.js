import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Index from './views/Index';
import NotFound from './views/NotFound';

//my compoenent
<<<<<<< HEAD
import myComponent from '../myFolder/component/myComponent';
=======
import myComponent from '../myFolder/myComponent';
>>>>>>> d29e5bf838b3ed3fcb0bf38524fdfaec1a62a2ba

// All of our CSS
require('../public/css/main.scss');

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Index} />
      // test new component
      <Route path="/my" exact component={myComponent} />
      <Route component={NotFound} status={404} />


    </Switch>
  </Router>,
  document.getElementById('root'),
);
