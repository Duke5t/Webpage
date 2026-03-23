import '../src/model/axe.ts';
import '../src/model/twomansaw.ts';
import '../src/model/chainsaw.ts';
import '../src/model/ponsse.ts';
import '../src/model/helicopter.ts';
import '../src/model/woodpecker.ts';
import '../src/model/lumberjack.ts';
import '../src/model/paulbunyan.ts';
import '../src/model/beaver.ts';
import '../src/model/godzilla.ts';
import PlayerController from "./controller/playerController.ts";
import ddl from '../create-tables.sql?raw';
import db from './model/connection.ts';

// load tables into db
await db().exec(ddl);

//3. Initialize the controller
let playerController = new PlayerController();

