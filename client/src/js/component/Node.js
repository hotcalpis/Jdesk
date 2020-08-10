import React from "react";
import axios from "axios";

const JDESK_ENDPOINT = 'http://localhost:3010/api/tasks';

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    axios
      .get(JDESK_ENDPOINT)
      .then((results) => {
        console.dir(results);
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
      <h1>{this.state.title}</h1>
    );
  }
}