import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router,Route} from "react-router-dom";


import {Home} from "./components/Home";
import {FirstForm} from "./components/FirstForm";
import {Header} from "./components/Header";
import {OauthClient} from "./components/OauthClient";
import {Authorized} from "./components/Authorized";
import {Details} from "./components/Details";
import {Footer} from "./components/Footer";


class App extends React.Component{

      render(){
        return(

            <div>

                <Header title=" OIDC Compliance Test Suite"/>

                <div className="container">
                    <Router>
                      <Route path={"/oauth2client"} component={Authorized}/>
                    </Router>
                </div>

                <div className="container">
                    <Router>
                        <Route path={"/authorize"} component={Home}/>
                    </Router>
                </div>
                <Footer/>
            </div>
        );

    }
}

render(<App/>, window.document.getElementById("app"));

