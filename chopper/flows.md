--- 
title: Flows of interaction for Chopper
author: Spencer Brule (brules@myumanitoba.ca)
date: Winter 2026
---

This file contains Minimum Viable Product flow of interaction design for Chopper Idle, a clicker game where you chop wood.

# Flow of Interaction


```mermaid 
flowchart
subgraph Login

    home[[Home Screen]]

    home ==Select Login==> login
    home ==Select Create Player==> create

    login[Login Screen]
    create[Create User Screen]

    create==credentials==>createvalidate
    createvalidate -.invalid credentials.-> create

    createvalidate{Validate User/Pass}

    createvalidate ====> setupUI

    login ==credentials==> validate
    validate ==valid credentials==> load
    validate -.invalid credentials.-> login
    load ====> setupUI
    setupUI ====> success

    setupUI{Setup UI}
    validate{Validate User/Pass}
    load{Load Player Resources}
    success[[Display UI]]

end
```

```mermaid 
flowchart
subgraph Click

    clicker[[Click On Tree]]

    clicker ====> increment
    increment ====> success

    increment{Add Funds}
    success[[Display UI]]

end
```

```mermaid 
flowchart
subgraph Buy Item

    select[[Buy Item]]

    select == Click Item==> check

    check -.Insufficient Funds.-> exit
    check ==Sufficient Funds==> pay
    pay ===> persist
    persist ===> exit

    check{Check Funds}
    pay{Pay and Apply Item}
    persist{Persist Data}

    exit[[Return to UI]]
end
```

```mermaid 
flowchart
subgraph Buy Team Member

    select[[Buy Member]]

    select == Click Member==> check

    check -.Insufficient Funds.-> exit
    check ==Sufficient Funds==> pay
    pay ===> persist
    persist ===> exit

    persist{Persist Data}
    check{Check Funds}
    pay{Pay and Recruit Member}

    exit[[Return to UI]]
end
```
