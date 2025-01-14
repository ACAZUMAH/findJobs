import winston from "winston";
const { combine, colorize, timestamp, json, errors } = winston.format

export const logger = winston.createLogger({
    format: combine(
        colorize({ all: true }),
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss'}),
        json()
    ),
    transports:[
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combine.log', level: 'info' })
    ]
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(
        new winston.transports.Console({ format: winston.format.simple() })
    );
}; 