export interface User {
    email?: string;
    username?: string;
    password?: string;
}

export interface Todo {
    id: number;
    label: string;
    description: string;
    limitDate: string;
    color: string;
}