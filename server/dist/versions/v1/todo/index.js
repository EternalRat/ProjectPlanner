"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_class_1 = __importDefault(require("~/class/jwt.class"));
const todo_class_1 = __importDefault(require("~/class/todo.class"));
const router = express_1.default.Router();
router.get('/', jwt_class_1.default.authToken, async (req, res) => {
    let user = req.user;
    let todos = new todo_class_1.default();
    let todosModel = await todos.findByUser(user.get('id'));
    if (!todosModel) {
        res.status(204).send('No content');
        return;
    }
    res.send(todosModel);
});
router.get('/:id', jwt_class_1.default.authToken, async (req, res) => {
    let user = req.user;
    let todos = new todo_class_1.default();
    let todosModel = await todos.find(req.params.id, user.get('id'));
    if (!todosModel) {
        res.status(204).send('No content');
        return;
    }
    res.send(todosModel);
});
router.post('/', jwt_class_1.default.authToken, async (req, res) => {
    let user = req.user;
    let { label, description, limitDate, color } = req.body;
    let todo = new todo_class_1.default();
    todo.fromPurData(label, description, limitDate, color, user.get('id'));
    try {
        let todoModel = await todo.create();
        res.send(todoModel);
    }
    catch (err) {
        res.status(400).send('Error');
    }
});
router.patch('/:id', jwt_class_1.default.authToken, async (req, res) => {
    let user = req.user;
    let { id } = req.params;
    let { label, description, limitDate, color } = req.body;
    let todo = new todo_class_1.default();
    todo.fromPurData(label, description, limitDate, color, user.get('id'), id);
    try {
        await todo.update();
        res.send('Done with success.');
    }
    catch (err) {
        res.status(400).send('Error');
    }
});
router.delete('/', jwt_class_1.default.authToken, (req, res) => {
    /* let userId = req.user!;
    let {ids} = req.query;
    let todo = new Todo();
    try {
        ids!.forEach(async (id: string) => {
            await todo.delete(id, userId as string);
        });
        res.send("Done with success.");
    } catch(err) {
        res.status(400).send("Error");
    } */
});
router.delete('/:id', jwt_class_1.default.authToken, async (req, res) => {
    let user = req.user;
    let { id } = req.params;
    let todo = new todo_class_1.default();
    try {
        await todo.delete(id, user.get('id'));
        res.send('Done with success.');
    }
    catch (err) {
        res.status(400).send('Error');
    }
});
exports.default = router;
