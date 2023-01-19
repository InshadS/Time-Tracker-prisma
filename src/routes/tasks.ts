const router = require('express').Router({ mergeParams: true });
import prisma from '../../src/prismaClient';

//Add a task
router.post('/:id/add-task', async (req: any, res: any) => {
  try {
    const { task, start_time, end_time, task_duration } = req.body;
    const userId = req.params.id;

    const addTask = await prisma.tasks.create({
      data: {
        task: task,
        user_id: userId,
        start_time: start_time,
        end_time: end_time,
        task_duration: task_duration,
      },
    });

    console.log(addTask);

    res.status(200).send(addTask);
  } catch (error: any) {
    console.error(error.message);
  }
});

//Update task
router.post('/update-task/:id', async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const { task } = req.body;

    const updateTask = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        task: task,
      },
    });

    res.status(200).json(updateTask);
  } catch (error: any) {
    console.error(error.message);
  }
});

//Delete task
router.delete('/delete-task/:id', async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);

    await prisma.tasks.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send('task deleted');
  } catch (error: any) {
    console.error(error.message);
  }
});

//List all tasks
router.get('/:id/list-tasks', async (req: any, res: any) => {
  try {
    const listTasks = await prisma.tasks.findMany();

    res.status(200).send(listTasks);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
