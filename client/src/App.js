import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Alerts from './components/Alerts';
import PrivateRoute from './components/PrivateRoute';
import { AlertProvider, AuthProvider, ContactProvider } from './context/providers';
import './App.css';

const App = () => (
  <AuthProvider>
    <ContactProvider>
      <AlertProvider>
        <Router>
          <>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </>
        </Router>
      </AlertProvider>
    </ContactProvider>
  </AuthProvider>
);

export default App;
