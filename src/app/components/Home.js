import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FirstForm} from "./FirstForm";

export class Home extends React.Component{

    render(){
        return(
            <div className="container">
                <MuiThemeProvider>
                    <FirstForm />
                </MuiThemeProvider>
            </div>

        );
    }
}




