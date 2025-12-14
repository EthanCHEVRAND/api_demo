const express = require("express") ;
const router = express.Router() ;
const projectController = require("../controllers/projectController") ;
const authentificate = require("../middleware/authMiddleware") ;
const isOwnerOrAdmin = require("../middleware/isOwnerOrAdmin");
const swagger = require("../config/swagger");

router.get("/", projectController.getProjects) ;

router.get("/:id", projectController.getProject) ;

/** 
* @swagger
* /projects:
*     post:
*         summary: Create a new project
*         tags: [Projects]
*         security:
*             - bearerAuth: []
*         requestBody:
*             required: true
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         required:
*                             - title
*                         properties:
*                             title:
*                                 type: string
*                             dexcription: 
*                                 type: string
*         responses:
*             201:
*                 description: Project created
*             401:
*                 description: Unauthorized
*/
router.post("/", authentificate, projectController.createProject) ;

router.put("/:id", authentificate, isOwnerOrAdmin, projectController.updateProject) ;

router.delete("/:id", authentificate, isOwnerOrAdmin, projectController.deleteProject) ;

module.exports = router ;