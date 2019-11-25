/**
 * Task controller
 */
const Task = require('../models/Task');

module.exports = {

    /**
     * Create a new task
     * @api {post} /tasks/
     * @return Json
     */ 
    async store(req, res){
        // Getting items of the request
        const { user_id } = req.headers;
        const { task_id } = req.params;
        const { date } = req.body;

        // Create a new book 
        const task = await Task.create({
            user: user_id,
            date
        });

        // Populate the query
        await task.populate('task').populate('user').execPopulate();

        // Real time connection
        const ownerSocket = req.connectedUsers[task.user];

        // Verify if it exists
        if(ownerSocket){
            // Emit a event
            req.io.to(ownerSocket).emit('task_request', task);
        }

        // Returning data
        return res.json(task);
    }
};