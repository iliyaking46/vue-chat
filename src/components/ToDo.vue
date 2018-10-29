<template>
    <div>
        <form v-on:submit.prevent="addNewTodo">
            <label for="new-todo">Добавить задачу</label>
            <input
                v-model="newTodoText"
                id="new-todo"
                placeholder="Например, покормить кота"
            >
            <button>Добавить</button>
        </form>
        <ul>
            <ToDoItem
                v-for="(todo, index) in todos"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-on:remove="todos.splice(index, 1)"
            />
        </ul>
        <br>

        <input
            @change="change"
            @keydown="keydown"
            v-model="key"
        />

        <br>

        <span>
            code: {{keys.code}}, key: {{keys.key}}, keyCode: {{keys.keyCode}}, which: {{keys.which}}
        </span>
    </div>
</template>

<script>
import ToDoItem from './ToDoItem';

export default {
    name: 'ToDo',
    components: {
        ToDoItem
    },
    data: function() {
        return {
            key:'',
            keys: {},
            newTodoText: '',
            todos: [{
                id: 1,
                title: 'Помыть посуду'
            }, {
                id: 2,
                title: 'Вынести мусор'
            }, {
                id: 3,
                title: 'Подстричь газон'
            }],
            nextTodoId: 4
        };
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            });
            this.newTodoText = ''
        },

        keydown: function (event) {
            const {code, key, keyCode, which} = event;
            this.keys = {
                code,
                keyCode,
                which,
                key
            };
            this.key = '';
        },
        change: function (event) {
        }
    }
}
</script>

<style scoped>
    ul{
        width: 400px;
        margin: auto;
    }
    li{
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        border: 1px dotted #7f7f7f;
        padding: 5px;
    }
    span{

    }
</style>