const pool = require("../config/database") ;

const createProject = async ({ title, description, userId }) => {
    const result = await pool.query(
        `INSERT INTO projects (title, description, user_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [title, description, userId]
    ) ;

    return result.rows[0] ;
} ;

const getAllProjects = async () => {
    const result = await pool.query(
        `SELECT p.*, u.email
        FROM projects p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC`
    ) ;
    return result.rows;
} ;

const getProjectById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM projects WHERE id=$1`,
        [id]
    ) ;
    return result.rows[0];
} ;

const updateProject = async (id, title, description) => {
    const result = await pool.query(
        `UPDATE projects
        SET title=$1, description=$2, updated_at=NOW()
        WHERE id=$3
        RETURNING *`,
        [title, description, id]
    ) ;
    return result.rows[0] ;
} ;

const deleteProject = async (id) => {
    await pool.query(`DELETE FROM projects WHERE id=$1`, [id]) ;
} ;

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} ;