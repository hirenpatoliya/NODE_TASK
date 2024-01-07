const TaskModel = require('../models/task.model')

// create task
const create = async(req,res) => {
    try {        
        const task = await TaskModel.create(req.body)
        return res.status(201).json({ message: 'Task Created Successfully',task})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

// get task
const get = async(req,res) => {
    try {
        const getTask = await ProjectModel.findById(req?.params?.id).lean()
        if(!getProject) return res.status(404).json({message: 'Task Not Found'})
        return res.status(201).json({ message: 'Task get Successfully',getTask})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}


// update task
const update = async(req,res) => {
    try {
        const updateTask = await TaskModel.findByIdAndUpdate(req?.params?.id,req?.body,{new:true}).lean()
        if(!updateTask) return res.status(404).json({message: 'Task Not Found'})
        return res.status(201).json({ message: 'Task Updated Successfully',updateTask})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

// delete task
const deleteTask = async(req,res) => {
    try {
        const deleteTask = await TaskModel.findByIdAndDelete(req?.params?.id).lean()
        if(!deleteTask) return res.status(404).json({message: 'Task Not Found'})
        return res.status(201).json({ message: 'Task deleted Successfully'})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

module.exports = {
    create,
    get,
    update,
    deleteTask
}