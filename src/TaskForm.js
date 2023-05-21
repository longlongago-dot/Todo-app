import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: ""
        }
        this.textHandler = this.textHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    textHandler(evt) {
        this.setState({
            //input-textのタグが複数あった場合に使いまわしを可能にするために書く
            [evt.target.name]: evt.target.value
        })
    }

    submitHandler(evt) {
        evt.preventDefault();
        this.props.createTodo({ task: this.state.task, id: uuidv4(), edit: false });
        this.setState({ task: "" });
    }

    render() {

        return (
            <div className='flex mt-4'>
                <form onSubmit={this.submitHandler}>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
                        type='text'
                        name="task"
                        id="task"
                        value={this.state.task}
                        placeholder='今日やることを記入しましょう'
                        onChange={this.textHandler}
                    />
                    <button className='mt-2 flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-gray-100'>
                        追加する
                    </button>
                </form>
            </div>

        );
    }
}

export default TaskForm;