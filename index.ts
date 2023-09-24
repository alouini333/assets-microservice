import app from './app';
import { getDbClient } from './getDbClient';

const PORT = 3001;
const HOST = '0.0.0.0';

const client = getDbClient();

app.listen(PORT, HOST, () => {
  console.log(`Connected to database "${client.database}"`);
});
