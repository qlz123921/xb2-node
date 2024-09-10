import dotenv from 'dotenv';

dotenv.config();

/**
 * 应用配置
 */
export const APP_PORT = parseInt(process.env.APP_PORT || '3004', 10);
// 如果需要默认导出，可以保留，但主入口应使用命名导出
export default { APP_PORT };
