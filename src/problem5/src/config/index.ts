export interface AppConfig {
  port: number;
  database: {
    name: string;
    synchronize: boolean;
    logging: boolean;
  };
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    name: process.env.DB_NAME || 'todos.db',
    synchronize: process.env.DB_SYNCHRONIZE === 'false' ? false : true,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
  },
};

export default config;