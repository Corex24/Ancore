// 📦 Ancore - PM2 Configuration
// 🔁 Ensures Ancore stays alive forever (production mode)

module.exports = {
  apps: [
    {
      name: 'ancore',
      script: 'index.js',
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        TZ: 'Africa/Lagos',
      },
    },
  ],
};
