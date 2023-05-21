import React, { Component } from 'react';
import TaskForm from './TaskForm';
import Todo from './Todo';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    //新規タスク作成処理。Task.jsで発火
    create(obj) {
        //以前のタスクに新しいタスクを追加して保存
        this.setState(pre => ({
            todos: [...pre.todos, obj]
        }))
    }
    //タスクの文言変更処理。Todo.jsで発火
    update(id, newValue) {
        let newTodo = this.state.todos.map(v => {
            if (v.id === id) {
                return { ...v, task: newValue }
            }
            return v;
        })
        this.setState({
            todos: newTodo
        })
    }
    //タスクの削除処理。Todo.jsで発火
    delete(id) {
        //渡されたid以外のものを返す
        this.setState(pre => ({
            todos: pre.todos.filter(v => v.id !== id)
        }))
    }

    render() {
        let todos = this.state.todos.map(v => {
            return <Todo value={v.task} id={v.id} deleteTodo={this.delete} updateTodo={this.update} />
        })

        return (
            <div class="h-100 w-full flex items-center justify-center font-sans">
                <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className='mb-4'>
                        <h1 className='text-grey-darkest'>
                            タスクボード:  <span>今日やることを書き出しましょう</span>
                        </h1>
                        <TaskForm createTodo={this.create} />
                        <ul>
                            {(todos.length > 0) && todos}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;