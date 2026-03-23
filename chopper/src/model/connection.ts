// //UNCOMMENT THIS AFTER PH1

import {PGlite} from '@electric-sql/pglite';
import ddl from '../../create-tables.sql?raw';


let src = import.meta.env.VITE_DATABASE_URL;

//idb://2452-idle says to use indexedDB as the backing storage for PGlite,
//this is our  permanent storage

// const pgliteDb = await PGlite.create('idb://2452-idle');
const pgliteDb = await PGlite.create(src);


if(src == 'memory://'){
    db().exec(ddl);
}

export default function db() {
    return pgliteDb;
}

