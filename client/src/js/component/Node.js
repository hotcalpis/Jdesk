import React from "react";
import axios from "axios";
import Draggable from 'react-draggable';

export default class Node extends React.Component {
  constructor(props) {
    super(props);

    let nodeStyle = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      left: this.props.x + Math.round(this.props.origin.x),
      top: this.props.y + Math.round(this.props.origin.y),
      height: "80px",
      width: "80px",
      backgroundColor: "aqua",
      borderRadius: "50%",
    };

    this.state = {
      nodeStyle: nodeStyle,
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

  handleStop(e, position) {
    const {x, y} = position;
    // axiosでserverに座標を送信
    // react-draggableの座標は相対かも？要調整？
  }

  render() {
    return (
      <Draggable handle=".node" position={this.state.position} onDrag={this.handleDrag} onStop={this.handleStop}>
        <div className="node" style={this.state.nodeStyle}>{this.state.title}</div>
      </Draggable>
    );
  }
}