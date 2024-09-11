import dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

export const DB_USER = process.env.DB_USER || 'postgres';

export const DB_PASSWORD = process.env.DB_PASSWORD || '';

export const DB_NAME = process.env.DB_NAME || 'xb2-node';
/**
 * 应用配置
 */
export const APP_PORT = parseInt(process.env.APP_PORT || '3004', 10);
// 如果需要默认导出，可以保留，但主入口应使用命名导出
export default { APP_PORT };
