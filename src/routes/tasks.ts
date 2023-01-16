const router = require('express').Router({ mergeParams: true });
import prisma from '../../src/prismaClient';

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

//List all tasks
router.get('/:id/list-tasks', async (req: any, res: any) => {
  try {
    const userId = req.params.id;

    const page = req.query.page;
    const size = req.query.size;

    const listTasks = await prisma.tasks.findMany();

    res.status(200).send(listTasks);
  } catch (error: any) {
    console.error(error.message);
  }
});

module.exports = router;
