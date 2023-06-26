import App from "./app.js";
import Cd from "./modules/cd/Cd.js";
import PathController from "./modules/path/PathController.js";
import Ls from "./modules/ls/Ls.js";
import Cat from "./modules/cat/Cat.js";
import Add from "./modules/add/Add.js";
import Rn from "./modules/rn/Rn.js";
import Cp from "./modules/cp/Cp.js";
import Rm from "./modules/rm/Rm.js";
import Mv from "./modules/mv/Mv.js";

const pathController = new PathController();
const app = new App();
const cd = new Cd(app);
const ls = new Ls(app);
const cat = new Cat(app);
const add = new Add(app);
const rn = new Rn(app);
const cp = new Cp(app);
const rm = new Rm(app);
const mv = new Mv(app);

app.start();

export { pathController };
