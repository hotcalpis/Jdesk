import React from "react";
import axios from "axios";
import Origin from "./Origin";
import Node from "./Node";

const JDESK_ENDPOINT = 'http://localhost:3001/api/tasks';

export default class Desk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: {
                x: Math.round(window.innerWidth / 2),
                y: Math.round(window.innerHeight / 2),
            },
            nodes: [],
            nodeKey: -1,
        };
    }

    componentDidMount() {
        axios
            .get(JDESK_ENDPOINT)
            .then((results) => {
                this.setState({
                    nodes: results.data.data
                });
            })
            .catch(() => {
                console.log('通信に失敗しました。');
            });
    }

    handleDoubleClick = (e) => {
        const newNode = {
            id: this.state.nodeKey--,
            title: "new",
            x: e.pageX - this.state.origin.x - 40,
            y: e.pageY - this.state.origin.y - 40,
        };
        const nodes = this.state.nodes;
        nodes.push(newNode);

        axios
            .post(JDESK_ENDPOINT, newNode)
            .then((results) => {
                console.log("作成完了");
                this.setState({
                    nodes: nodes,
                });
            })
            .catch(() => {
                console.log("作成失敗");
            });
        
    }

    render() {
        return (
            <div className="desk" onDoubleClick={this.handleDoubleClick}>
                <Origin x={this.state.origin.x} y={this.state.origin.y} />
                {this.state.nodes.map((node) => (
                    <Node origin={{x: this.state.origin.x, y: this.state.origin.y}} key={node.id} id={node.id} title={node.title} x={node.x} y={node.y}/>
                ))}
            </div>
        )
    }
}