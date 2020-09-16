import React from 'react';

export default class EditMenu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="EditMenu">
                <button onClick={this.props.deleteNode}>削除</button>
            </div>
        );
    }
}