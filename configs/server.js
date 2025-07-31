'use strict';
 
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticion.js';
import authRoutes from '../src/auth/auth.routes.js';
import materialRoutes from '../src/material/material.routes.js';
import categoryRoutes from '../src/category/category.routes.js';
import courseRoutes from '../src/course/course.routes.js';
import quizRoutes from '../src/quiz/quiz.routes.js';
import progressRoutes from '../src/progress/progress.routes.js';
import forumRoutes from '../src/forum/forum.routes.js';
import postRoutes from '../src/post/post.routes.js';
import userRoutes from '../src/user/user.routes.js'; 
import commentRoutes from '../src/comment/comment.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes =(app) => {
    app.use('/Propuesta/v1/auth', authRoutes);
    app.use('/Propuesta/v1/material', materialRoutes);
    app.use('/Propuesta/v1/category', categoryRoutes);
    app.use('/Propuesta/v1/course', courseRoutes);
    app.use('/Propuesta/v1/quiz', quizRoutes);
    app.use('/Propuesta/v1/progress', progressRoutes);
    app.use('/Propuesta/v1/forum', forumRoutes);
    app.use('/Propuesta/v1/post', postRoutes);
    app.use('/Propuesta/v1/user', userRoutes);
    app.use('/Propuesta/v1/comment', commentRoutes);
}
 
 
const conectarDB = async () => {
    try{
        await dbConnection();
        console.log("Conexion a la base de datos exitosa ✅");
    }catch(error){
        console.error('Error Conectando a la base de datos ❌', error);
        process.exit(1);
    }  
}
 
export const initServer = async () =>{
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port: ${port} 🚀`);
    } catch (err) {
        console.log(`Server init failed: ${err} ⚠️`);
    }
 
    
}