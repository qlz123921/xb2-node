import app from './app/index.js';
import { APP_PORT } from './app/app.config.js';

app.listen(APP_PORT, () => {
  console.log('🚀服务已启动!!');
});
