import { Request, Response, NextFunction } from 'express';

export const requestTimeLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now(); // Capture the start time

    // Hook into the 'finish' event of the response to calculate the duration
    res.on('finish', () => {
        const duration = Date.now() - start; // Calculate duration
        console.log(`${req.method} ${req.originalUrl} - ${duration}ms`); // Log method, URL, and duration
    });

    next(); // Proceed to the next middleware
};

