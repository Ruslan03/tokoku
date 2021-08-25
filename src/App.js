import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import firebase from './firebase.conig';
import PrivateRoute from './auth/PrivateRoute';
import userAction from './store/reducers/users/users.action'

import Nav from './components/Nav';
import Products from './pages/Products/Listing';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Detail from './pages/Products/Detail';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        dispatch(userAction.userLoginSuccess(user))
      }else{
        dispatch(userAction.userLoginError('login dulu ya :)'))
      }
    });
  }, [ dispatch ])

  return (
    <div className="container mx-auto md:w-2/3">
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/p/:code" exact component={Detail} />
        <PrivateRoute path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
