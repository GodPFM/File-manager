import App from "./app.js";
import Cd from "./modules/cd/Cd.js";
import PathController from "./modules/path/PathController.js";

const pathController = new PathController();
const app = new App();
const cd = new Cd(app);

app.start();

export { pathController };
