import express from 'express';
import { Model } from 'sequelize';
import JWT from '~/class/jwt.class';
import Todo from '~/class/todo.class';
const router = express.Router();

router.get('/', JWT.authToken, async (req, res) => {
    let user = req.user! as Model<any, any>;
    let todos = new Todo();
    let todosModel = await todos.findByUser(user.get('id') as string);
    if (!todosModel) {
        res.status(204).send('No content');
        return;
    }
    res.send(todosModel);
});

router.get('/:id', JWT.authToken, async (req, res) => {
    let user = req.user! as Model<any, any>;
    let todos = new Todo();
    let todosModel = await todos.find(req.params.id, user.get('id') as string);
    if (!todosModel) {
        res.status(204).send('No content');
        return;
    }
    res.send(todosModel);
});

router.post('/', JWT.authToken, async (req, res) => {
    let user = req.user! as Model<any, any>;
    let { label, description, limitDate, color } = req.body;
    let todo = new Todo();
    todo.fromPurData(
        label,
        description,
        limitDate,
        color,
        user.get('id') as number,
    );
    try {
        let todoModel = await todo.create();
        res.send(todoModel);
    } catch (err) {
        res.status(400).send('Error');
    }
});

router.patch('/:id', JWT.authToken, async (req, res) => {
    let user = req.user! as Model<any, any>;
    let { id } = req.params;
    let { label, description, limitDate, color } = req.body;
    let todo = new Todo();
    todo.fromPurData(
        label,
        description,
        limitDate,
        color,
        user.get('id') as number,
        id,
    );
    try {
        await todo.update();
        res.send('Done with success.');
    } catch (err) {
        res.status(400).send('Error');
    }
});

router.delete('/', JWT.authToken, (req, res) => {
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

router.delete('/:id', JWT.authToken, async (req, res) => {
    let user = req.user! as Model<any, any>;
    let { id } = req.params;
    let todo = new Todo();
    try {
        await todo.delete(id, user.get('id') as string);
        res.send('Done with success.');
    } catch (err) {
        res.status(400).send('Error');
    }
});

export default router;
