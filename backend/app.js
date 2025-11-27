import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import mongoSanitize from "./utils/mongoSanitize.js";
import sanitizeRequest from "./utils/sanitizeRequest.js";

// Routers
import userRouter from "./routes/userRouter.js";
import interpreterRouter from "./routes/interpreterRouter.js";

const app = express();

// Parse JSON body
app.use(express.json());

// app.js or server.js
app.use("/uploads", express.static("uploads"));

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://lil-reference-interpreters-frontend.onrender.com",
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you're using cookies, auth headers, etc.
};

app.use(cors(corsOptions));

// See HTTP Status Requests
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Secure Express App - Setting HTTP Response Headers
app.use(helmet());

app.use(mongoSanitize);

// Data sanitization against XSS
app.use(sanitizeRequest);

app.use(cookieParser());

// Serve the uploads folder as static
// eslint-disable-next-line no-undef
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/interpreters", interpreterRouter);

// Catch undefined routes
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Error Handling Middleware
app.use(globalErrorHandler);

export default app;
