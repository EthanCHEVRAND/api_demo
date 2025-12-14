const pool = require("../config/database") ;

const isOwnerOrAdmin = async (req, res, next) => {
    const projectId = req.params.id ;
    const userId = req.user.userId ;
    const role = req.user.role ;

    if (role === "ADMIN") {
        return next() ;
    }

    try {
        const result = await pool.query(
            "SELECT user_id FROM projects WHERE id=$1",
            [projectId]
        ) ;

        const project = result.rows[0] ;

        if (!project) {
            return res.status(404).json({ message: "Project not found" }) ;
        }

        if (project.user_id !== userId) {
            return res.status(403).json({ message: "Forbidden" }) ;
        }

        next() ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
} ;

module.exports = isOwnerOrAdmin ;