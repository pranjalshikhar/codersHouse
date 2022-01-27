import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'
import Authenticate from './pages/Authenticate/Authenticate';

const isAuth = true;

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <PublicRoute path='/' exact>
          <Home />
        </PublicRoute>
        <PublicRoute path='/authenticate'>
          <Authenticate />
        </PublicRoute>
      </Switch>   
    </BrowserRouter>
  );
}

const PublicRoute = ({ children, ...rest}) => {
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

export default App;
