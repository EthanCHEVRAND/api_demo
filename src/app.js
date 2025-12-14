require("dotenv").config() ;
const express = require("express") ;
const pool = require("./config/database") ;

const app = express() ;
app.use(express.json()) ;

const swaggerUi = require("swagger-ui-express") ;
const swaggerSpec = require("./config/swagger") ;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)) ;

const userRoutes = require("./routes/userRoutes") ;
app.use("/users", userRoutes) ;

const authRoutes = require("./routes/authRoutes") ;
app.use("/auth", authRoutes) ;

const projectRoutes = require("./routes/projectRoutes") ;
app.use("/projects", projectRoutes) ;

app.get("/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT 1");
        res.json({
            status: "API is running",
            db: "connected",
        }) ;
    } catch (error) {
        console.error("Database error:", error.message);

        res.status(500).json({
            status: "API is running",
            db: "error",
            error: error.message,
        }) ;
    }
}) ;

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`) ;
}) ;