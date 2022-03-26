import logo from "./logo.svg";

import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
// import './App.css';
import PostDetails from './pages/postDetails/postDetails';
// import nestedfirebase from './pages/firebaseNested';
import Posts from "./pages/posts/posts";
import Res from "./components/responsive";
import Form from "./pages/form/form";
import Auth from "./pages/auth";
import Nav from './pages/Navbar'
import Home from "./pages/Home/index";



function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  

  return (
    <BrowserRouter>
    <div className="App">
    <Nav/>
     
    <Switch>

    <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />

        {/* <Route path="/" exact component={Home} />
         <Route path="/auth" exact component={Auth} />  */}
      </Switch>


    </div>
    </BrowserRouter>
  );
}

export default App;
