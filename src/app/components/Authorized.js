import React from "react";
import {OauthClient} from "./OauthClient";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Authorized extends React.Component{

    render(){
        return(
            <div className="container">
                <MuiThemeProvider>
                        <OauthClient />
                </MuiThemeProvider>
            </div>

        );
    }
}
