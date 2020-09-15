import React from 'react';

export default class EditMenu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="EditMenu">
                <button onClick={this.props.deleteNode}>削除</button>
                <input
                    className="edit-node-title"
                    defaultValue={this.props.title}
                    onKeyPress={this.handleKeyPress}
                />
            </div>
        );
    }
}