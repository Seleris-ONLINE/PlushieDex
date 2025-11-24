/* ==================================================================== */
/* Charadex
=======================================================================  /

  The charadex namespace. You can use it if you like, but this should
  prevent charadex from messing with any other imported code.
    
======================================================================= */
let charadex = {};

/* ==================================================================== */
/* Site
/* If you don't want to hard code your site information, you
/* can fill this out instead
/* Any preview links will still show Charadex's information
/* ==================================================================== */
charadex.site = {
  title: "Plushiebees",
  url: "https://plushibees.netlify.app/",
  description: `A casual ARPG hosted by Seleris.`
}

/* ==================================================================== */
/* Sheet Config
/* Your sheet configuration
/* ==================================================================== */
charadex.sheet = {

  id: "1O93eOtAU0fM7_RnXM7AoWGugJ8IQQ30quuXyUzpcdzM",

  pages: {
    masterlist:    "masterlist",
    masterlistLog: "masterlist log",
    imageGallery:  "image gallery",
    companions:    "companions",
    companionLog:  "companion log",
    awardcase:     "awardcase",
    inventory:     "inventory",
    inventoryLog:  "inventory log",
    items:         "items",
    traits:        "traits",
    prompts:       "prompts",
    bestiary:      "bestiary",
    faq:           "faq",
    staff:         "mods",
  },

  options: {

    designTypes: ['All', 'Official Design', 'Guest Design', 'MYO Design', 'MYO Slot'],
    statuses: ['All', 'Voided', 'Purchased'],
    rarity: ['All', 'Standard', 'Unusual', 'Rare', 'Epic', 'Modified', 'Seasonal'],
    species: ['All', 'Plushibee', 'MYO Slot'],
    itemTypes: ['All', 'Currency', 'MYO Slot', 'Upgrade', 'Trait', 'Collectible', 'Companion', 'Misc'],
    traitTypes: ['All', 'Antennae', 'Pom-Poms', 'Wings', 'Buttons', 'Tails', 'Modifications'],
    companionCategory: ['All', 'Basic', 'Event', 'Seasonal'],
    promptCategory: ['All', 'Permanent', 'Monthly', 'Event', 'Seasonal'],
    bondLevel: ['Wary (★)', 'Neutral (★★)', 'Warm (★★★)', 'Comfortable (★★★★)', 'BFFs (★★★★★)'],
    giftOptions: ['Yes', 'Ask First', 'No'],

  }

}


/* ==================================================================== */
/* Page configuration
/* ==================================================================== */
charadex.page = {};


/* Item Catalogue
/* --------------------------------------------------------------- */
charadex.page.items = {

  sheetPage: charadex.sheet.pages.items,
  sitePage: 'items',
  dexSelector: 'charadex',
  profileProperty: 'item',

  sort: {
    toggle: true,
    key: "id",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: true,
    parameters: {
      'Type': charadex.sheet.options.itemTypes,
      'Rarity': charadex.sheet.options.rarity,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Type',
    parameters: charadex.sheet.options.itemTypes,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Item', 'Rarity', 'Price']
  },

  prevNext: {
    toggle: true,
  },

};

/* Bestiary
/* --------------------------------------------------------------- */
charadex.page.bestiary = {

  sheetPage: charadex.sheet.pages.bestiary,
  sitePage: 'bestiary',
  dexSelector: 'charadex',
  profileProperty: 'name',

  sort: {
    toggle: true,
    key: "id",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: true,
    parameters: {
      'Rarity': charadex.sheet.options.rarity,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Category',
    parameters: charadex.sheet.options.companionCategory,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Name', 'Rarity', 'Artist']
  },

  prevNext: {
    toggle: true,
  },

};


/* Traits
/* --------------------------------------------------------------- */
charadex.page.traits = {

  sheetPage: charadex.sheet.pages.traits,
  sitePage: 'traits',
  dexSelector: 'charadex',
  profileProperty: 'trait',

  sort: {
    toggle: true,
    key: "id",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: true,
    parameters: {
      'Type': charadex.sheet.options.traitTypes,
      'Rarity': charadex.sheet.options.rarity,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Type',
    parameters: charadex.sheet.options.traitTypes,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Trait', 'Rarity', 'Item']
  },

  prevNext: {
    toggle: true,
  },

};


/* Prompts
/* --------------------------------------------------------------- */
charadex.page.prompts = {

  sheetPage: charadex.sheet.pages.prompts,
  sitePage: 'prompts',
  dexSelector: 'charadex',
  profileProperty: 'title',

  sort: {
    toggle: true,
    key: "enddate",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {
      'TBA': [],
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Category',
    parameters: charadex.sheet.options.promptCategory,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Title', 'Description']
  },

  prevNext: {
    toggle: true,
  },

};


/* Staff
/* --------------------------------------------------------------- */
charadex.page.staff = {

  sheetPage: charadex.sheet.pages.staff,
  sitePage: 'inventories',
  dexSelector: 'charadex',
  profileProperty: 'username',

  sort: {
    toggle: false,
    key: "username",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: false,
    bottomToggle: false,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {
      'TBA': [],
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: false,
    parameters: ['Username']
  },

  prevNext: {
    toggle: false,
  },

};


/* FAQ
/* --------------------------------------------------------------- */
charadex.page.faq = {

  sheetPage: charadex.sheet.pages.faq,
  sitePage: 'faq',
  dexSelector: 'charadex',
  profileProperty: 'id',

  sort: {
    toggle: false,
    key: "id",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {
      'TBA': [],
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Question', 'Answer', 'Tags']
  },

  prevNext: {
    toggle: false,
  },

}



/* Image Gallery
/* --------------------------------------------------------------- */
charadex.page.imageGallery = {

  sheetPage: charadex.sheet.pages.imageGallery,
  sitePage: 'gallery',
  dexSelector: 'charadex',
  profileProperty: 'id',

  sort: {
    toggle: false,
    key: "id",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {
      'TBA': [],
    }
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Designs', 'Artist', 'Tags']
  },

  prevNext: {
    toggle: false,
  },

};



/* Awardcase
/* --------------------------------------------------------------- */
charadex.page.awardcase = {

  sheetPage: charadex.sheet.pages.awardcase,
  sitePage: 'awardcase',
  dexSelector: 'charadex',
  profileProperty: 'award',

  sort: {
    toggle: false,
    key: "id",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: false,
    parameters: {}
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Category',
    parameters: charadex.sheet.options.promptCategory,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Award', 'ID', 'Category']
  },

  prevNext: {
    toggle: false,
  },

  relatedData: {}

};



/* Companions
/* --------------------------------------------------------------- */
charadex.page.companions = {

  sheetPage: charadex.sheet.pages.companions,
  sitePage: 'companions',
  dexSelector: 'charadex',
  profileProperty: 'design',

  sort: {
    toggle: true,
    key: "id",
    order: "desc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: true,
    parameters: {
      'Rarity': charadex.sheet.options.rarity,
      'Bond Level': charadex.sheet.options.bondLevel,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Category',
    parameters: charadex.sheet.options.companionCategory,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Species', 'Owner', 'bondLevel']
  },

  prevNext: {
    toggle: true,
  },

  relatedData: {

    [charadex.sheet.pages.companionLog]: {

      sheetPage: charadex.sheet.pages.companionLog,
      primaryProperty: 'id',
      relatedProperty: 'id',
      dexSelector: 'log',
      profileProperty: 'design',
      profileToggle: false,

      sort: {
        toggle: true,
        key: "timestamp",
        order: "desc",
        parameters: []
      },

      pagination: {
        toggle: true,
        bottomToggle: false,
        amount: 12,
      },

    }

  }

};

/* Masterlist
/* --------------------------------------------------------------- */
charadex.page.masterlist = {

  sheetPage: charadex.sheet.pages.masterlist,
  sitePage: 'masterlist',
  dexSelector: 'charadex',
  profileProperty: 'design',

  sort: {
    toggle: true,
    key: "id",
    order: "desc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 12,
  },

  filters: {
    toggle: true,
    parameters: {
      'Design Type': charadex.sheet.options.designTypes,
      'Status': charadex.sheet.options.statuses,
      'Rarity': charadex.sheet.options.rarity,
      'Gift Art': charadex.sheet.options.giftOptions,
      'Gift Fics': charadex.sheet.options.giftOptions,
    }
  },

  fauxFolder: {
    toggle: true,
    folderProperty: 'Species',
    parameters: charadex.sheet.options.species,
  },

  search: {
    toggle: true,
    filterToggle: true,
    parameters: ['All', 'Design', 'Owner', 'Designer', 'Artist', 'Traits']
  },

  prevNext: {
    toggle: true,
  },

  relatedData: {

    [charadex.sheet.pages.masterlistLog]: {

      sheetPage: charadex.sheet.pages.masterlistLog,
      primaryProperty: 'design',
      relatedProperty: 'design',
      dexSelector: 'log',
      profileProperty: 'design',
      profileToggle: false,

      sort: {
        toggle: true,
        key: "timestamp",
        order: "desc",
        parameters: []
      },

      pagination: {
        toggle: true,
        bottomToggle: false,
        amount: 12,
      },

    },

    [charadex.sheet.pages.imageGallery]: {

      ... charadex.page.imageGallery,

      sheetPage: charadex.sheet.pages.imageGallery,
      primaryProperty: 'design',
      relatedProperty: 'designs',
      dexSelector: 'gallery',
      profileProperty: 'id',
      profileToggle: false,

      sort: {
        toggle: true,
        key: "id",
        order: "asc",
        parameters: []
      },

      pagination: {
        toggle: true,
        bottomToggle: true,
        amount: 9,
      },

    },
  
    [charadex.sheet.pages.awardcase]: {
      ...charadex.page.awardcase,
      
      sheetPage: charadex.sheet.pages.awardcase,
      primaryProperty: 'design', 
      relatedProperty: 'designs',       
      dexSelector: 'awardcase',
      profileProperty: 'award',
      profileToggle: false,
      
      sort: {
        toggle: true,
        key: "id",
        order: "asc",
        parameters: []
      },

    pagination: {
      toggle: true,
      bottomToggle: true,
      amount: 3,
    },
  },
  
    [charadex.sheet.pages.companions]: {
      ...charadex.page.companions,
      
      sheetPage: charadex.sheet.pages.companions,
      primaryProperty: 'design',     // links from the profile
      relatedProperty: 'designs',       
      dexSelector: 'companions',
      profileProperty: 'design',
      profileToggle: false,
      
      sort: {
        toggle: true,
        key: "id",
        order: "asc",
        parameters: []
      },

    pagination: {
      toggle: true,
      bottomToggle: true,
      amount: 6,
    },
  }

  }

};

/* Inventory
/* --------------------------------------------------------------- */
charadex.page.inventory = {

  // Dex Set Up
  sheetPage: charadex.sheet.pages.inventory,
  sitePage: 'inventories',
  dexSelector: 'charadex',
  profileProperty: 'username',

  // Dex Options
  sort: {
    toggle: true,
    key: "username",
    order: "asc",
    parameters: []
  },

  pagination: {
    toggle: true,
    bottomToggle: true,
    amount: 24,
  },

  filters: {
    toggle: false,
    parameters: {}
  },

  fauxFolder: {
    toggle: false,
    folderProperty: '',
    parameters: [],
  },

  search: {
    toggle: true,
    filterToggle: false,
    parameters: ['Username']
  },

  prevNext: {
    toggle: false,
  },


  // Related Data
  relatedData: {

    [charadex.sheet.pages.inventoryLog]: {

      sheetPage: charadex.sheet.pages.inventoryLog,
      sitePage: 'inventories',
      primaryProperty: 'username',
      relatedProperty: 'username',
      dexSelector: 'log',
      profileProperty: 'id',
      profileToggle: false,

      pagination: {
        toggle: true,
        bottomToggle: false,
        amount: 12,
      },

    },
    

    [charadex.sheet.pages.masterlist]: {

      // This imports the config from the masterlist
      // So you dont have to repeat yourself
      ...charadex.page.masterlist, 

      sheetPage: charadex.sheet.pages.masterlist,
      sitePage: 'masterlist',
      primaryProperty: 'username',
      relatedProperty: 'owner',
      dexSelector: 'designs',
      profileProperty: 'design',
      profileToggle: false,

    },

    [charadex.sheet.pages.companions]: {
      ...charadex.page.companions, 

      sheetPage: charadex.sheet.pages.companions,
      sitePage: 'companions',
      primaryProperty: 'username',
      relatedProperty: 'owner',
      dexSelector: 'designs',
      profileProperty: 'design',
      profileToggle: false,

    }

  },

  
  // This is a special config for their inventory
  inventoryConfig: {

    sheetPage: charadex.sheet.pages.items,
    sitePage: 'items',
    dexSelector: 'inventory',
    profileProperty: 'item',
    profileToggle: false,

    sort: {
      toggle: true,
      sortProperty: "item",
      order: "asc",
      parametersKey: 'type', 
      parameters: charadex.sheet.options.itemTypes
    },

    search: {
      toggle: true,
      filterToggle: false,
      parameters: ['Item']
    },

    filters: {
      toggle: true,
      parameters: {
        'Type': charadex.sheet.options.itemTypes,
        'Rarity': charadex.sheet.options.rarity,
      }
    },

  }

};



/* Index
/* --------------------------------------------------------------- */
charadex.page.index = {

  prompts: {
    ... charadex.page.prompts,
    dexSelector: 'prompt',
    amount: 3,
  },

  staff: {
    ... charadex.page.staff,
    dexSelector: 'staff',
    amount: 6,
  },

  designs: {
    ... charadex.page.masterlist,
    dexSelector: 'design',
    amount: 4,

      sort: {
      toggle: true,
      key: "id",
      order: "desc",
      parameters: ['Plushibee']
    },
  }

};


export { charadex };