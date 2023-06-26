import App from "./app.js";
import Cd from "./modules/cd/Cd.js";
import PathController from "./modules/path/PathController.js";
import Ls from "./modules/ls/Ls.js";
import Cat from "./modules/cat/Cat.js";
import Add from "./modules/add/Add.js";

const pathController = new PathController();
const app = new App();
const cd = new Cd(app);
const ls = new Ls(app);
const cat = new Cat(app);
const add = new Add(app);

app.start();

export { pathController };
