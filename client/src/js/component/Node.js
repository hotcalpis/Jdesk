import React from "react";
import axios from "axios";

const JDESK_ENDPOINT = 'http://localhost:3010/api/tasks';

let nodeStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "move",
  height: "80px",
  width: "80px",
  backgroundColor: "aqua",
};

const props_left = 8;
const props_top = 8;

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isDrag: false,
      left: props_left,
      top: props_top,
      beforeCursorX: 0,
      beforeCursorY: 0,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(e) {
    this.setState({
      isDrag: true,
      left: this.state.left,
      top: this.state.top,
      beforeCursorX: e.pageX,
      beforeCursorY: e.pageY,
    });
  }

  handleMouseMove(e) {
    if (this.state.isDrag == true) {
      let rect = e.target.getBoundingClientRect()
      this.setState({
        left: this.state.left + (e.pageX - this.state.beforeCursorX),
        top: this.state.top + (e.pageY - this.state.beforeCursorY),
        beforeCursorX: e.pageX,
        beforeCursorY: e.pageY,
      });
      nodeStyle = {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "move",
        left: this.state.left,
        top: this.state.top,
        height: "80px",
        width: "80px",
        backgroundColor: "aqua",
      };
    }
  }

  handleMouseUp() {
    this.setState({
      isDrag: false,
    });
  }

  componentDidMount() {
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
      <div className="node" style={nodeStyle} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>{this.state.title}{this.state.left}{this.state.top}</div>
    );
  }
}