export const diamondSortColumns =  [
    { label: "Shape", key: "shape", sortable: false, mobile: true, className: "w-12 sm:w-32" },
    { label: "Carat", key: "diamond_carat_weight", sortable: true, mobile: true, className: "w-[60px] sm:w-28" },
    { label: "Cut", key: "diamond_cut_grade", sortable: false, mobile: true, className: "w-10 sm:w-28" },
    { label: "Color", key: "diamond_color_grade", sortable: true, mobile: true, className: "w-12 sm:w-28 text-center" },
    { label: "Clarity", key: "diamond_clarity_grade", sortable: true, mobile: true, className: "w-14 sm:w-28" },
    // { label: "Pol/Sym", key: ["diamond_polish", "diamond_symmetry"], sortable: false, mobile: false, className: "w-14 sm:w-28" },
    // { label: "Depth/Table", key: ["diamond_depth_percent", "diamond_table_percent"], sortable: false, mobile: false, className: "w-14 sm:w-28" },
    // { label: "Fluorescence", key: "diamond_fluorescence", sortable: false, mobile: false, className: "w-14 sm:w-28" },
    // { label: "Shipping Schedule", key: "shippingDate", sortable: false, mobile: true },
    { label: "Price", key: "price", sortable: true, mobile: true, className: "flex-1" },
    { label: "", key: "none", sortable: false, mobile: true, className: "w-auto" },
];

export const trimmedDiamondValues = {
   'Excellent' : 'EX',
   'Very Good' : 'VG',
   'Good' : 'GD',
   'Fair' : 'FR',   
   'None' : 'N',
   'Faint' : 'F',
   'Medium' : 'M',
   'Strong' : 'S',
   'Very Strong' : 'VS',
   'Affinity': 'AF',
};

export const diamondAttributeToShow = ['product_number', 'diamond_authority', 'diamond_carat_weight', 'diamond_depth_percent', 'diamond_table_percent', 'diamond_polish', 'diamond_symmetry', 'diamond_fluorescence', 'diamond_measurements', 'measurements', 'sku', 'certified_by'];

export const attributeCodes = {
    'carat' : 'diamond_carat_weight',
    'cut' : 'diamond_cut_grade',
    'color' : 'diamond_color_grade',
    'clarity' : 'diamond_clarity_grade',
    'growth' : 'diamond_growth_type',
    'shape' : 'diamond_shape',
    'measurements' : 'measurements',
    'certificate_number' : 'certificate_number',
    'certified_by' : 'certified_by',
    'sku' : 'sku',
    'diamond_lwr' : 'diamond_lwr',
    'labGrownCode': 'lab-grown',
    'diamondOriginCode': 'diamond_origin',
    'diamondShapeCode': 'diamond_shape',
    'ringShapeCode': 'center_stone_shape',
    'diamondCaratCode': 'diamond_carat_weight',
    'diamondPairSlug' : 'diamond-pair',
    'naturalCode' : 'natural',
    'roundCode' : 'round',
    'ringStyleCode' : 'style',
};