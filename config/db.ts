// config/db.ts
const productConfig = {
  mysql: {
    protocol: 'mysql',
    host: '47.99.93.97',
    user: 'root',
    password: 'admin123456***',
    port: 8836,
    database: 'imadmin',
    connectionLimit: 10, // 连接限制
  },
};

const localConfig = {
  mysql: {
    protocol: 'mysql',
    host: '47.99.93.97',
    user: 'root',
    password: 'admin123456***',
    port: 8836,
    database: 'imadmin',
    connectionLimit: 10, // 连接限制
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
