import React from "react";
import axios from "axios";
import Draggable from 'react-draggable';

const JDESK_ENDPOINT = 'http://localhost:3010/api/tasks';

let nodeStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // cursor: "move",
  height: "80px",
  width: "80px",
  backgroundColor: "aqua",
};

const props_left = 50;
const props_top = 50;

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      left: props_left,
      top: props_top,
    };
  }

  componentDidMount() {
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
      <Draggable>
        <div className="node" style={nodeStyle}>{this.state.title}</div>
      </Draggable>
    );
  }
}