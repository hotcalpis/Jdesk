import React from "react";
import axios from "axios";
import Draggable from 'react-draggable';

const JDESK_ENDPOINT = 'http://localhost:3001/api/tasks';

export default class Node extends React.Component {
  constructor(props) {
    super(props);

    let style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      left: this.props.x + this.props.origin.x,
      top: this.props.y + this.props.origin.y,
      height: "80px",
      width: "80px",
      backgroundColor: "aqua",
      borderRadius: "50%",
    };

    this.state = {
      style: style,
      title: this.props.title,
      position: {
        x: this.props.x,
        y: this.props.y,
      },
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleDrag(e, position) {
    const {x, y} = position;
    this.setState({
      position: {x, y}
    });
  }

  handleStop(e) {
    const id = this.props.id;

    const origin = document.getElementById('origin').getBoundingClientRect();
    let originX = origin.x;
    let originY = origin.y;

    const targetNode = e.target.getBoundingClientRect();
    let targetX = targetNode.x;
    let targetY = targetNode.y;

    console.log(originX, targetX);

    axios
      .patch(JDESK_ENDPOINT + "/" + id, {x: targetX - originX, y: targetY - originY})
      .then((results) => {
        console.log("更新完了");
      })
      .catch(() => {
        console.log("更新失敗");
      });
  }

  render() {
    return (
      <Draggable handle=".node" onDrag={this.handleDrag} onStop={this.handleStop}>
        <div className="node" style={this.state.style}>{this.state.title}</div>
      </Draggable>
    );
  }
}