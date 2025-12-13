const express = require("express") ;
const pool = require("../config/database") ;
const router = express.Router() ;
const userController = require("../controllers/userController") ;
const authentificate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware") ;

router.get("/", authentificate, authorize(["ADMIN"]), async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, email, first_name, last_name, role, created_at FROM users"
        ) ;
        res.json(result.rows) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
}) ;

router.post("/", userController.createUser) ;

router.get("/me", authentificate, userController.getMe) ;

router.put("/me", authentificate, userController.updateMe) ;

router.delete("/me", authentificate, userController.deleteMe) ;

module.exports = router ;