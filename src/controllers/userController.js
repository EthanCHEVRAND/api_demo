const pool = require("../config/database");
const userService = require("../services/userService") ;

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body) ;
        res.status(201).json(user) ;
    } catch (error) {
        console.error("Error creating user:", error.message) ;
        console.error(error) ;
        res.status(400).json({ message: "Unable to create user", error: error.message }) ;
    }
} ;

const getMe = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id=$1", [req.user.userId]) ;
        res.json(result.rows[0]) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
} ;

const updateMe = async (req, res) => {
    const { firstName, lastName, email } = req.body ;

    try {
        const result = await pool.query(
            `
            UPDATE users
            SET first_name = $1,
            last_name = $2,
            email = $3
            WHERE id = $4
            RETURNING id, email, first_name, last_name, role, created_at
            `,
            [firstName, lastName, email, req.user.userId]
        ) ;

        res.json(result.rows[0]) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
} ;

const deleteMe = async (req, res) => {
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [req.user.userId]) ;
        res.json({ message: "User deleted succesfully" }) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
} ;

module.exports = {
    createUser,
    getMe,
    updateMe,
    deleteMe,
} ;