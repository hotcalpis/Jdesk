import React from "react";
import axios from "axios";
import Node from "./Node";

export default class Desk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            },
        };
    }

    render() {
        return (
            <div className="desk">
                <Node origin={{x: this.state.origin.x, y: this.state.origin.y}}/>
            </div>
        )
    }
}