const projectRepository = require("../repositories/projectRepository") ;

const createProject = (data, userId) => {
    return projectRepository.createProject({
        ...data,
        userId,
    }) ;
} ;

module.exports = { createProject } ;