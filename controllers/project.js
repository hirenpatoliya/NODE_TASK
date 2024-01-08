const { getPaginationValues } = require('../helper')
const ProjectModel = require('../models/project.model')

// create project 
const create = async(req,res) => {
    try {
        const { title, description,status } = req.body
        const isProjectExists = await ProjectModel.findOne({title}).lean()
        if(isProjectExists) return res.status(400).json({ message: 'Project Already Exists'})
        const bodyData = {title, description, status, createdBy: req?.user?._id} 
        const project = await ProjectModel.create(bodyData)
        return res.status(201).json({ message: 'Project Created Successfully',project})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

// fetch particular user's project
const get = async(req,res) => {
    try {
        // searching, sorting, filtering on user's projects
        const { start, limit, sorting, search, filter } = getPaginationValues(req.query)

        const query = search ? { title: { $regex: new RegExp('^.*' + search + '.*', 'i') } } : { }

        const filters = filter ? { status: {$in: [filter] } } : {}
        // here i calculate total count because for give count of filtered document dynamically based on that pagination is working
        const [project,totalCount] = await Promise.all([
            ProjectModel.find({ createdBy: req.user._id, ...query, ...filters }).sort(sorting).skip(Number(start)).limit(Number(limit)).lean(),
            ProjectModel.countDocuments({ createdBy: req.user._id, ...query, ...filters })
        ])
        if(!project) return res.status(404).json({message: 'Prject Not Found'})

        const data = [{project,totalCount}]
        
        return res.status(201).json({ message: 'Project get Successfully',data})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

// update project
const update = async(req,res) => {
    try {
        const updateProject = await ProjectModel.findByIdAndUpdate(req?.params?.id,req?.body,{new:true}).lean()
        if(!updateProject) return res.status(404).json({message: 'Prject Not Found'})
        return res.status(201).json({ message: 'Project Updated Successfully',updateProject})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

// delete project by id
const deleteProject = async(req,res) => {
    try {
        const deleteProject = await ProjectModel.findByIdAndDelete(req?.params?.id).lean()
        if(!deleteProject) return res.status(404).json({message: 'Prject Not Found'})
        return res.status(201).json({ message: 'Project deleted Successfully'})
    } catch (error) {
        return res.status(500).json({ message: 'something went wrong',error})
    }
}

module.exports = {
    create,
    get,
    update,
    deleteProject
}