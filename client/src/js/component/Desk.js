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
        if (e.target.className !== "desk") return null;
        const newNode = {
            id: -1,
            title: "new",
            x: e.pageX - this.state.origin.x - 45,
            y: e.pageY - this.state.origin.y - 45,
        };
        const nodes = this.state.nodes;
        nodes.push(newNode);

        // TODO: 同期を正確にしないとエラー出そう
        axios
            .post(JDESK_ENDPOINT, newNode)
            .then((results) => {
                nodes.slice(-1)[0].id = results.data.data.id;
                this.setState({
                    nodes: nodes,
                });
                console.log("作成完了");
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