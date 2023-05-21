import React, { Component } from 'react';
import { FaRegTrashAlt, FaPen } from "react-icons/fa";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: this.props.value,
            edit: false
        };
        this.updateHandler = this.updateHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.textHandler = this.textHandler.bind(this);
    }

    updateHandler(evt) {
        evt.preventDefault();
        this.props.updateTodo(this.props.id, this.state.newTask);
        this.setState({ edit: false })
    }

    textHandler(evt) {
        this.setState({
            //input-textのタグが複数あった場合に使いまわしを可能にするために書く
            [evt.target.name]: evt.target.value
        })
    }

    deleteHandler(evt) {
        this.props.deleteTodo(this.props.id);
    }

    editHandler() {
        this.setState(pre => ({
            edit: !pre.edit
        }));
    }

    render() {

        let form;
        if (this.state.edit) {
            form = (
                <form onSubmit={this.updateHandler} className='flex mx-4'>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
                        type='text'
                        value={this.state.newTask}
                        name='newTask'
                        onChange={this.textHandler}
                    />
                    <button className='hover:bg-gray-100 bg-white rounded p-2'>Save</button>
                </form>
            );
        } else {
            form = (
                <div>
                    <li className='text-3xl pl-3' key={this.props.id}>{this.props.value}</li>
                </div>
            );
        }


        return (

            <div className='flex justify-between align-middle m-2 bg-orange-200 rounded py-6'>
                {form}
                <div className=''>
                    <button className='text-2xl pr-2' onClick={this.deleteHandler}><FaRegTrashAlt /></button>
                    <button className='text-2xl pr-2' onClick={this.editHandler}><FaPen /></button>
                </div>
            </div >
        );
    }
}

export default Todo;