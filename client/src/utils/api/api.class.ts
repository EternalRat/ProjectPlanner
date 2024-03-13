import axios from 'axios';
import { User } from '../../domains/auth/types';
import { Todo } from '../../domains/projects/types';

const apiClass = {
    async login(user: User) {
        return await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email: user.email,
            password: user.password,
        });
    },

    async register(user: User) {
        return await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/register`,
            {
                email: user.email,
                username: user.username,
                password: user.password,
            },
        );
    },

    async getUserDetails(cookies: any) {
        return await axios.get(`${process.env.REACT_APP_API_URL}/auth`, {
            headers: {
                authorization: cookies.token,
            },
        });
    },

    async getTodos(cookies: any) {
        return await axios.get(`${process.env.REACT_APP_API_URL}/todo`, {
            headers: {
                authorization: cookies.token,
            },
        });
    },

    async getTodo(cookies: any, id: string) {
        return await axios.get(`${process.env.REACT_APP_API_URL}/todo/${id}`, {
            headers: {
                authorization: cookies.token,
            },
        });
    },

    async postTodo(cookies: any, todo: Todo) {
        return await axios.post(
            `${process.env.REACT_APP_API_URL}/todo`,
            {
                label: todo.label,
                description: todo.description,
                limitDate: todo.limitDate,
                color: todo.color,
            },
            {
                headers: {
                    authorization: cookies.token,
                },
            },
        );
    },

    async updateTodo(cookies: any, todo: Todo) {
        return await axios.patch(
            `${process.env.REACT_APP_API_URL}/todo`,
            {
                id: todo.id,
                label: todo.label,
                description: todo.description,
                limitDate: todo.limitDate,
                color: todo.color,
            },
            {
                headers: {
                    authorization: cookies.token,
                },
            },
        );
    },

    async deleteTodos(cookies: any, todos: Array<Todo>) {
        let ids = todos.map((todo) => todo.id);
        return await axios.delete(`${process.env.REACT_APP_API_URL}/todo`, {
            data: {
                ids,
            },
            headers: {
                authorization: cookies.token,
            },
        });
    },

    async deleteTodo(cookies: any, todo: Todo) {
        return await axios.delete(
            `${process.env.REACT_APP_API_URL}/todo/${todo.id}`,
            {
                headers: {
                    authorization: cookies.token,
                },
            },
        );
    },
};

export default apiClass;
