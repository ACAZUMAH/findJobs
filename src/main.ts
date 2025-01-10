import { config } from 'dotenv';

const main = async () => {
    config();
    const app = await import('./app');
    app.default();
};

main().catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
});