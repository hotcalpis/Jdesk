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
                x: 3000 / 2,
                y: 2000 / 2,
            },
            nodes: [],
            isScrolling: false,
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

    handleMouseDown = (e) => {
        if (e.target.classList.contains("desk")) this.setState({isScrolling: true});
    }

    handleMouseMove = (e) => {
        if (this.state.isScrolling) scrollBy(-e.movementX, -e.movementY);
    }

    handleMouseUp = (e) => {
        this.setState({isScrolling: false});
    }

    handleDoubleClick = (e) => {
        if (e.target.className !== "desk") return null;
        const newNode = {
            id: -1,
            title: "new",
            x: e.pageX - this.state.origin.x - 45,
            y: e.pageY - this.state.origin.y - 45,
            width: 90,
            height: 90,
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
            <div className="desk" ref={this.myRef} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp} onDoubleClick={this.handleDoubleClick}>
                <Origin x={this.state.origin.x} y={this.state.origin.y} />
                {this.state.nodes.map((node) => (
                    <Node origin={{x: this.state.origin.x, y: this.state.origin.y}} key={node.id} id={node.id} title={node.title} width={node.width} height={node.height} x={node.x} y={node.y}/>
                ))}
            </div>
        )
    }
}