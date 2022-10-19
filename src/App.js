import Navbar from './Components/Navbar';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import {BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

const ComponentFunc = (Component) => () => {
  var x = 0
  return x == 0 ? (
  // return localStorage.getItem("token") ? (
    <>
      <Navbar />
      <Component />
    </>
  ) : (
    <Redirect to="/signin" />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ComponentFunc(Home)} />
        <Route path="/signin" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
