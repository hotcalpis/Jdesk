import React from "react";
import axios from "axios";
import Draggable from 'react-draggable';

const JDESK_ENDPOINT = 'http://localhost:3010/api/tasks';

let nodeStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80px",
  width: "80px",
  backgroundColor: "aqua",
};

// propsの代わり
const props_left = 50;
const props_top = 50;

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      position: {
        x: props_left,
        y: props_top,
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

  componentDidMount() {
    nodeStyle = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "move",
      left: this.state.position.x,
      top: this.state.position.y,
      height: "80px",
      width: "80px",
      backgroundColor: "aqua",
    };
    axios
      .get(JDESK_ENDPOINT)
      .then((results) => {
        this.setState({
          title: results.data.data[0].title
        });
      },
      )
      .catch(() => {
        console.log('通信に失敗しました。');
      });
  }

  render() {
    return (
      <Draggable handle=".node" defaultPosition={{ x: 0, y: 0 }} position={this.state.position} onDrag={this.handleDrag} onStop={this.handleStop}>
        <div className="node" style={nodeStyle}>{this.state.title}</div>
      </Draggable>
    );
  }
}