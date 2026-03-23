--- 
title: Domain Model for Chopper
author: Spencer Brule (brules@myumanitoba.ca)
date: Winter 2026
---

This file contains Minimum Viable Product domain model design for Chopper Idle, a clicker game where you chop wood.



## Domain Model

```mermaid

%% Notes :
%% Upgrades upgrade active clicker
%% Items upgrade the passive auto-clicker


classDiagram
    
    class Player {
        -~String name
        -Int money
        -Int totalClicks
        -Collection~Item~ items
        -Clicker clicker
        -notifyAll()
        +axeUpgrade(Axe)
        +addItem(Item)
        +removeItem(Item)
        +incrementCurrency(float)
    }
    


    class Item {
        -~Serial id
        -String name
        -Player ownedBy
        -Int count
        -Int baseCost 
        -Int costMultiplier 
        -Int clickPower 
        -Int rate

        +buy() void
        +getToolsForPlayer() Item[]
    }
    
    class Axe {
    }


    class Clicker {
        -Int valuePerClick
        +click() return Int
        +increaseValue() return boolean
    }

    note for Player "Invariant Properties:
    <ul>
        <li> name != null
        <li> name.length > 0
        <li> money >= 0
        <li> totalClicks >= 0
        <li> clicker != null 
        <li> loop : no item in items is null
        <li> loop : no upgrade in upgrades is null
    </ul>"

    note for Item "Invariant Properties:
    <ul>
        <li> id > 0
        <li> name != null
        <li> name.length > 0
        <li> baseCost >= 0
        <li> costMultiplier > 0
        <li> clickPower > 0
        <li> count >= 0
        <li> clickPower > 0
        <li> rate >= 0
    </ul>"

    

%% Type	Description
%% <|--	Inheritance
%% *--	Composition
%% o--	Aggregation
%% -->	Association
%% --	Link (Solid)
%% ..>	Dependency
%% ..|>	Realization

%% 1 Only 1
%% 0..1 Zero or One
%% 1..* One or more
%% * Many

    Player "1"o--o"*" Item: "Foreign Key" refers to name
    Player "1"o--*"1" Clicker: "Foreign Key" refers to name
    Item --|> Tool
    Item --|> Team
    Tool --|> Axe
    Tool --|> TwomanSaw
    Tool --|> Chainsaw
    Tool --|> Ponsse
    Tool --|> Helicopter
    Team --|> Woodpecker
    Team --|> Lumberjack
    Team --|> Paulbunyan
    Team --|> Beaver
    Team --|> Godzilla
    
```

