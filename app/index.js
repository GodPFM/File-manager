import App from "./app.js";
import Cd from "./modules/cd/Cd.js";
import PathController from "./modules/path/PathController.js";
import Ls from "./modules/ls/Ls.js";

const pathController = new PathController();
const app = new App();
const cd = new Cd(app);
const ls = new Ls(app);

app.start();

export { pathController };
