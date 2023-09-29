module.exports = {
  apps: [
    {
      name: 'nest-serve',
      script: './dist/src/main.js', // 写本来启动的入口路径就好
      autorestart: true,
      watch: true,
      ignore_watch: [
        // 不⽤监听的⽂件
        'node_modules',
        'logs',
      ],

      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        HOST: '47.99.93.97',
      },
    },
  ],

  deploy: {
    production: {
      key: '~/.ssh/wxfeiang', // 配置后key
      user: 'root',
      host: ['47.99.93.97'],
      port: '22',
      ssh_options: 'StrictHostKeyChecking=no',
      ref: 'origin/main',
      repo: 'git@github.com:wxfeiang/nest-serve.git',
      path: '/home/nest-serve', // path 指定项目目录
      'pre-deploy': 'git fetch --all',
      // Pre-setup 在 setup 之前执行，如安装 git
      'pre-setup': 'pnpm install ; ls -la',
      // Post-setup 在 setup 之后执行
      'post-setup': 'ls -la',
      // 每次 update 都会执行
      'pre-deploy-local': "echo '生产环境部署中'",
      'post-deploy':
        'pnpm install && pnpm build &&  pm2 startOrRestart ecosystem.config.js --env production && pm2 flush ',
    },
    // 可配置不同env 环境
  },
};
