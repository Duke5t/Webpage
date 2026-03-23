-- Create all tables for SQL/Database storage here.

--NOTE: to delete database in browser, go to inspect>Application>IndexedDB>/pglite/2452-idle>"Delete database"

--if not exists says make this table if it isnt already in storage
-- player must be created first because item references it
create table if not exists player (
    id serial not null unique,
    name varchar(255) not null unique,
    password varchar(255) not null,
    money float not null
);

create table if not exists item (
    --Serial is a unique key type
    id serial not null unique,
    name varchar(255) not null,
    ownedBy varchar(255) not null,
    count integer not null,
    rate integer,
    baseCost float not null,
    costMultiplier float not null,
    itemType varchar(255) not null, 
    clickPower float,
    foreign key (ownedBy) references player(name)
);  

create table if not exists clicker (
    id serial not null unique,
    ownedBy varchar(255) not null unique,
    valuePerClick integer not null,
    foreign key (ownedBy) references player(name)
);

insert into player(id, name, password, money) values(default, 'Duke', 'ac18ba1a7abc433a94efabbe08cd0d45a48f05a163526e787e78c45ece0f54d2', 50000) on conflict (name) do nothing;
insert into item(id, name, ownedBy, count, rate, baseCost, costMultiplier, itemType, clickPower) values(default, 'Axe', 'Duke', 1, 0, 1, 1, 'axe', 1);
--Table of all available items/upgrade/tools/team
create table if not exists inventory (
    id serial not null unique,
    name varchar(255) not null,
    ownedBy varchar(255) not null,
    count integer not null,
    baseCost float not null,
    costMultiplier float not null,
    itemType varchar(255) not null, 
    rate integer,
    clickPower float,
    foreign key (ownedBy) references player(name)
);

insert into inventory(id, name, ownedBy, count, baseCost, costMultiplier, itemType, clickPower, rate) values
    (default, 'Axe', 'Duke', 0, 10, 4, 'axe', 1, 0),
    (default, 'Twomansaw', 'Duke', 0, 75, 3, 'twomansaw', 5, 0),
    (default, 'Chainsaw', 'Duke', 0, 400, 3, 'chainsaw', 20, 0),
    (default, 'Ponsse', 'Duke', 0, 2000, 3, 'ponsse', 75, 0),
    (default, 'Helicopter', 'Duke', 0, 12000, 3, 'helicopter', 250, 0),
    (default, 'Woodpecker', 'Duke', 0, 25, 4, 'woodpecker', 1, 1),
    (default, 'Lumberjack', 'Duke', 0, 150, 3, 'lumberjack', 5, 1),
    (default, 'Paulbunyan', 'Duke', 0, 900, 3, 'paulbunyan', 3, 10),
    (default, 'Beaver', 'Duke', 0, 4500, 3, 'beaver', 100, 1),
    (default, 'Godzilla', 'Duke', 0, 25000, 2, 'godzilla', 500, 2)
    on conflict do nothing;