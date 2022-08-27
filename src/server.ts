/**
 * server.js is the main entry point for the application
 * any objects or funcionality is imported here
 */

import dotenv from 'dotenv';
import * as Web from './web/web';

dotenv.config();
const port = process.env.PORT;

const app = Web.getApp();
Web.getEndpoints(app);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
