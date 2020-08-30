import React from "react";
import axios from "axios";
import Node from "./Node";

const JDESK_ENDPOINT = 'http://localhost:3001/api/tasks';

export default class Desk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            },
            nodes: [],
        };
    }

    componentDidMount() {
        axios
            .get(JDESK_ENDPOINT)
            .then((results) => {
                console.log(results.data.data);
                this.setState({
                    nodes: results.data.data
                });
            },
            )
            .catch(() => {
                console.log('通信に失敗しました。');
            });
    }

    render() {
        return (
            <div className="desk">
                {this.state.nodes.map((node) => (
                    <Node origin={{x: this.state.origin.x, y: this.state.origin.y}} key={node.id} title={node.title} x={node.x} y={node.y}/>
                ))}
            </div>
        )
    }
}