const pool = require("../config/database") ;

const createUser = async (user) => {
    const { email, password, firstName, lastName } = user ;

    const result = await pool.query(
        `
        INSERT INTO users (email, password, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, first_name, last_name, role, created_at
        `,
        [email, password, firstName, lastName]
    ) ;

    return result.rows[0] ;
} ;

module.exports = {
    createUser,
} ;