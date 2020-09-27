import React from 'react';

export default class EditMenu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="EditMenu">
                <button onClick={this.props.deleteNode}>削除</button>
                <button onClick={this.props.extendNode}>＋</button>
                <button onClick={this.props.shrinkNode}>−</button>
            </div>
        );
    }
}