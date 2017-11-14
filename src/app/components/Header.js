import React from "react";

export class Header extends React.Component {

    render() {
        return (
            <header>
                <img src="./logo-inverse.svg" height="50" width="50" alt="logo" />
                    {this.props.title}
            </header>
        );
    }

}
