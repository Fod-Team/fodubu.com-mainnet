module.exports = {
  apps: [
    {
      name: "fodubu-mainnet",
      script: "server.js",
      cwd: "/usr/src/app",
      env: {
        Node .env= "production",
        Port =:5000,
        # placeholder: real envs are provided by docker-compose env_file
      },
      instances: 1,
      exec_mode: "fork",
      watch: false
    },
    {
      name: "fodubu-testnet",
      script: "server.js",
      cwd: "/usr/src/app",
      env: {
        NODE_ENV: "testnet",
        PORT: 5001
      },
      instances: 1,
      exec_mode: "fork",
      watch: false
    }
  ]
};
