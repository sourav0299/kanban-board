import dbConnect from '../../../lib/db';
import Task from '../../../models/task';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        console.log('Request body:', req.body);
        const task = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!task) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        console.log('Updated task:', task);
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
