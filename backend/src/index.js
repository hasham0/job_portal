import "dotenv/config";
import http from "http";
import app from "./app.js";
import connectToDB from "./configurations/db.config.js";

const serverPort = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

/* Database connection and server start */
(async () => {
    try {
        const dbConnection = await connectToDB();
        server.listen(serverPort, () => {
            const { port } = dbConnection.connection;
            console.log(`✅ Database connected at port: ${port}`);
            console.log(`🚀 Server running on port: ${serverPort}`);
        });
    } catch (error) {
        console.error("❌ Failed to start the server:", error);
        process.exit(1);
    }
})();
