const express = require("express") ;
const router = express.Router() ;
const projectController = require("../controllers/projectController") ;
const authentificate = require("../middleware/authMiddleware") ;
const isOwnerOrAdmin = require("../middleware/isOwnerOrAdmin");

router.get("/", projectController.getProjects) ;

router.get("/:id", projectController.getProject) ;

router.post("/", authentificate, projectController.createProject) ;

router.put("/:id", authentificate, isOwnerOrAdmin, projectController.updateProject) ;

router.delete("/:id", authentificate, isOwnerOrAdmin, projectController.deleteProject) ;

module.exports = router ;