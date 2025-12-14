const projectRepository = require("../repositories/projectRepository") ;
const { get } = require("../routes/userRoutes");

const createProject = async (req, res) => {
    try { 
        const { title, description } = req.body ;

        if (!title) {
            return res.status(400).json({ message: "Title is required" }) ;
        }

        const project = await projectRepository.createProject({
            title,
            description,
            userId: req.user.userId,
        }) ;

        return res.status(201).json(project) ;

    } catch (error) {
        console.error("Create project error:", error) ;
        return res.status(500).json({ message: "Server error" }) ;
    }
} ;

const getProjects = async (req, res) => {
    const projects = await projectRepository.getAllProjects() ;
    res.json(projects) ;
} ;

const getProject = async (req, res) => {
    const project = await projectRepository.getProjectById(req.params.id) ;

    if (!project) {
        return res.status(404).json({ message: "Project not found" }) ;
    }

    res.json(project) ;
} ;

const updateProject = async (req, res) => {
    try {
        const { title, description } = req.body ;

        const project = await projectRepository.updateProject(
            req.params.id,
            title,
            description
        ) ;

        if (!project) {
            return res.status(404).json({ message: "Project not found" }) ;
        }

        res.json(project) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
} ;

const deleteProject = async (req, res) => {
    try {
        await projectRepository.deleteProject(req.params.id) ;
        res.json({ message: "Project deleted succesfully" }) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
} ;

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
} ;