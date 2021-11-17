import React, { Component } from 'react';
import './index.css';
import { Switch, HashRouter, Route, BrowserRouter } from "react-router-dom";

import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Datasets from './components/Datasets';
import Projects from './components/Projects';
import DatasetDetails from './components/DatasetDetails';
import ProjectDetails from './components/ProjectDetails';
import PostDataset from './components/PostDataset';
import RequestDataset from './components/RequestData';
import AboutUs from './components/AboutUs';
import faq from './components/faq';
import Footer from './components/Footer';
//import Payment from './components/Payment';
import NotFound from './components/NotFound';
import { Helmet } from 'react-helmet';

class App extends Component {
  render() {
    return (
      <div className="flexWrapper">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Monash Energy Institute Data repository</title>
          <link rel="canonical" href="https://www.monash.edu/energy-institute" />
          <meta name="description" content="Check out our datasets and contribute your own!" />

          <meta property="og:title" content="Monash Energy Institute" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.monash.edu/energy-institute" />
          <meta property="og:image" content="" />

          <meta name="twitter:title" content="Monash Energy Institute" />
          <meta name="twitter:description" content="Check out our datasets and contribute your own!" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:card" content="summary" />
        </Helmet>

        <div className="wrapper">

          <HashRouter>
            <div>
              <NavBar />
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/datasets' component={Datasets} />
                <Route exact path='/projects' component={Projects} />
                <Route path='/datasets/:name' component={DatasetDetails} />
                <Route path='/projects/:name' component={ProjectDetails} />
                <Route exact path='/aboutus' component={AboutUs} />
                <Route exact path='/contribute' component={PostDataset} />
                <Route exact path='/requestdata' component={RequestDataset} />
                <Route exact path='/FAQ' component={faq} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </HashRouter>
          <BrowserRouter>
            <Route path="/datathon" component={() => {
              window.location.href = "https://datathon.stanford.edu/";
              return null;
            }} />
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
