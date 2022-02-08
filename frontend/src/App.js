import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import Home from './pages/Home/Home';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  return loading ? (
    'Loading...'
  ) : (
    <BrowserRouter>
        <Navigation />
        <Switch>

          <PublicRoute path='/' exact>
              <Home />
          </PublicRoute>
          <PublicRoute path='/authenticate'>
              <Authenticate />
          </PublicRoute>

          <SemiProtectedRoute path='/activate'>
              <Activate />
          </SemiProtectedRoute>

          <ProtectedRoute path='/rooms'>
              <Rooms />
          </ProtectedRoute>

        </Switch>   
    </BrowserRouter>
  );
}

const PublicRoute = ({ children, ...rest}) => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <Route {...rest}
    render={({ location }) => {
      return isAuth ? (
      <Redirect to={
        {
          pathname: '/rooms',
          state: { from: location },
        }
      }/>
      ) : (
        children
      )
    }}>

    </Route>
  )
}

const SemiProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route {...rest}
    render={({ location }) => {
      return !isAuth ? (
      <Redirect to={
        {
          pathname: '/',
          state: { from: location },
        }
      }/>
      ) : isAuth && !user.activated ? (
        children
      ) : (
        <Redirect to={
          {
            pathname: '/rooms',
            state: { from: location },
          }
        }/>
      )
    }}>

    </Route>
  )
}

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <Route {...rest}
    render={({ location }) => {
      return !isAuth ? (
      <Redirect to={
        {
          pathname: '/',
          state: { from: location },
        }
      }/>
      ) : isAuth && !user.activated ? (
        <Redirect to={
          {
            pathname: '/activate',
            state: { from: location },
          }
        }/>
      ) : (
        children
      )
    }}>

    </Route>
  )
}

export default App;
