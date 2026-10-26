const diamondPairFilters = {
    diamond_shape: 'round',
    diamond_origin: 'natural',
    sort_column: 'price',
    sort_direction: 'asc',
};

const diamondFilters = {
    diamond_shape: 'round',
    diamond_cut_grade: 'excellent',
    diamond_color_grade: 'h',
    diamond_clarity_grade: 'vs2',
    sort_column: 'price',
    sort_direction: 'asc',
    diamond_carat_weight: { min: 1.00, max: null },
};

const diamondSortingOptions = {
    published_at: {
        code: 'published_at',
        value: 'Newest',
        colName: 'published_at',
        colValue: null
    },
    // most_popular: {
    //     code: 'most_popular',
    //     value: 'Most Popular',
    //     colName: 'most_popular',
    //     colValue: null
    // },
    carat_asc: {
        code: 'carat_asc',
        value: 'Carat: Low to High',
        colName: 'diamond_carat_weight',
        colValue: 'asc'
    },
    carat_desc: {
        code: 'carat_desc',
        value: 'Carat: High to Low',
        colName: 'diamond_carat_weight',
        colValue: 'desc'
    },
    color_asc: {
        code: 'color_asc',
        value: 'Color: Low to High',
        colName: 'diamond_color_grade',
        colValue: 'asc'
    },
    color_desc: {
        code: 'color_desc',
        value: 'Color: High to Low',
        colName: 'diamond_color_grade',
        colValue: 'desc'
    },
    clarity_asc: {
        code: 'clarity_asc',
        value: 'Clarity: Low to High',
        colName: 'diamond_clarity_grade',
        colValue: 'asc'
    },
    clarity_desc: {
        code: 'clarity_desc',
        value: 'Clarity: High to Low',
        colName: 'diamond_clarity_grade',
        colValue: 'desc'
    },
    price_asc: {
        code: 'price_asc',
        value: 'Price: Low to High',
        colName: 'price',
        colValue: 'asc'
    },
    price_desc: {
        code: 'price_desc',
        value: 'Price: High to Low',
        colName: 'price',
        colValue: 'desc'
    },
};

const ringFilters = {
    center_stone_shape: 'round'
};

const defaultValues = {
  'length/width': {
    min: 0.5,
    max: 3.0,
  },
  'diamond_depth_percent': {
    min: 45,
    max: 85,
  },
  'diamond_table_percent': {
    min: 40,
    max: 92,
  },
  'diamond_carat_weight': {
    min: 0.15,
    max: 15.0,
  },
};

const reverseOrder = {
  'diamond_fluorescence': true
}

const settingSotingOptions = {
  adiamor_fvt: {
    code: "adiamor_fvt",
    value: "Adiamor Favorites",
    colName: "sort_order",
    colValue: null,
  },
  published_at: {
    code: "published_at",
    value: "Newest",
    colName: "published_at",
    colValue: null,
  },
  most_popular: {
    code: "most_popular",
    value: "Most Popular",
    colName: "most_popular",
    colValue: null,
  },
  price_asc: {
    code: "price_asc",
    value: "Price: Low to High",
    colName: "price",
    colValue: "asc",
  },
  price_desc: {
    code: "price_desc",
    value: "Price: High to Low",
    colName: "price",
    colValue: "desc",
  },
};

const advancedFilters = {
"length/width" : "Length/Width" ,
"diamond_fluorescence" : "Fluorescence",
"diamond_polish" : "Polish",
"diamond_symmetry" : "Symmetry",
"diamond_depth_percent" : "Depth",
"diamond_table_percent" : "Table",
"diamond_authority" : "Certified By"
};


const topPanelFilter =  ['diamond_shape' ];

const diamondDynamicFilter = {
  diamond_cut_grade: {
    targetCode: 'diamond_shape',
    exclude: ['affinity'],
    excludeFor : ['marquise', 'heart', 'pear', 'radiant', 'oval', 'cushion'],
  }
};

const diamondPairLabels = {
  'diamond_carat_weight': 'CT. TW.',
};

const diamondInfoPanel = {
  round: {
    question: 'How will you know you received the right round diamond?',
    answer: 'Under magnification, you’ll see the certificate number laser inscribed on the girdle.'
  },
  princess: {
    question: 'Diamond rings from Adiamor are manufactured at our casting facility in Los Angeles, California.',
    answer: null
  },
  emerald: {
    question: 'Diamond rings from Adiamor are manufactured at our casting facility in Los Angeles, California.',
    answer: null
  },
  marquise: {
    question: 'Diamond rings from Adiamor are manufactured at our casting facility in Los Angeles, California.',
    answer: null
  },
  heart: {
    question: 'Adiamor adheres to a strict, zero-tolerance policy towards conflict diamonds.',
    answer: null
  },
  pear: {
    question: 'Your purchase from Adiamor includes free overnight shipping and 30-day returns.',
    answer: null
  },
  cushion: {
    question: 'Adiamor adheres to a strict, zero-tolerance policy towards conflict diamonds.',
    answer: null
  },
  oval: {
    question: 'Diamond rings from Adiamor are manufactured at our casting facility in Los Angeles, California.',
    answer: null
  },
  radiant: {
    question: 'Diamond rings from Adiamor are manufactured at our casting facility in Los Angeles, California.',
    answer: null
  },
  asscher: {
    question: 'How will you know you received the right asscher cut diamond?',
    answer: 'Under magnification, you’ll see the certificate number laser inscribed on the girdle.'
  },
  default: {
    question: 'Your purchase from Adiamor includes free overnight shipping and 30-day returns.',
    answer: null
  }
};

export {
  diamondSortingOptions,
  diamondFilters,
  ringFilters,
  diamondPairFilters,
  defaultValues,
  settingSotingOptions,
  advancedFilters,
  reverseOrder,
  topPanelFilter,
  diamondDynamicFilter,
  diamondPairLabels,
  diamondInfoPanel
};
