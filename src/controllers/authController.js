const pool = require("../config/database") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;

const login = async (req, res) => {
    const { email, password } = req.body ;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" }) ;
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]) ;
        const user = result.rows[0] ;

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" }) ;
        }

        const isMatch = await bcrypt.compare(password, user.password) ;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" }) ;
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        ) ;

        res.json({ token }) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({ message: "Server error" }) ;
    }
}

module.exports = { login } ;