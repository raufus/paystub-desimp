// State-specific template configurations for all 50 US states

export interface StateTemplateConfig {
  stateCode: string
  stateName: string
  defaultTemplate: 'modern' | 'classic' | 'compact' | 'detailed'
  hasStateTax: boolean
  hasSDI: boolean // State Disability Insurance
  sdiLabel?: string // SDI, TDI, DBL, PFL
  hasCityTax: boolean
  requiredFields: string[]
  optionalFields: string[]
  legalNotices?: string[]
  templateColor?: string // Primary color for state branding
  specialRequirements?: string[]
}

export const STATE_TEMPLATE_CONFIGS: Record<string, StateTemplateConfig> = {
  // ALABAMA
  AL: {
    stateCode: 'AL',
    stateName: 'Alabama',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'commission'],
    templateColor: '#C8102E'
  },

  // ALASKA
  AK: {
    stateCode: 'AK',
    stateName: 'Alaska',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Alaska has no state income tax'],
    templateColor: '#0C2340'
  },

  // ARIZONA
  AZ: {
    stateCode: 'AZ',
    stateName: 'Arizona',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#C8102E'
  },

  // ARKANSAS
  AR: {
    stateCode: 'AR',
    stateName: 'Arkansas',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#C8102E'
  },

  // CALIFORNIA
  CA: {
    stateCode: 'CA',
    stateName: 'California',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: true,
    sdiLabel: 'CA SDI/PFL',
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'sdi', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'commission', 'sickLeave', 'vacationHours'],
    legalNotices: [
      'CA Labor Code Section 2810.5 requires itemized wage statements',
      'Paid Sick Leave information must be included'
    ],
    specialRequirements: ['Show sick leave balance', 'Show vacation hours'],
    templateColor: '#003B5C'
  },

  // COLORADO
  CO: {
    stateCode: 'CO',
    stateName: 'Colorado',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#002868'
  },

  // CONNECTICUT
  CT: {
    stateCode: 'CT',
    stateName: 'Connecticut',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#00247D'
  },

  // DELAWARE
  DE: {
    stateCode: 'DE',
    stateName: 'Delaware',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#00247D'
  },

  // FLORIDA
  FL: {
    stateCode: 'FL',
    stateName: 'Florida',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'commission'],
    legalNotices: ['Florida has no state income tax'],
    templateColor: '#FF4500'
  },

  // GEORGIA
  GA: {
    stateCode: 'GA',
    stateName: 'Georgia',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#C8102E'
  },

  // HAWAII
  HI: {
    stateCode: 'HI',
    stateName: 'Hawaii',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: true,
    sdiLabel: 'HI TDI',
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'tdi', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Hawaii Temporary Disability Insurance (TDI) required'],
    templateColor: '#003B5C'
  },

  // IDAHO
  ID: {
    stateCode: 'ID',
    stateName: 'Idaho',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // ILLINOIS
  IL: {
    stateCode: 'IL',
    stateName: 'Illinois',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // INDIANA
  IN: {
    stateCode: 'IN',
    stateName: 'Indiana',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: true,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'countyTax'],
    legalNotices: ['County tax may apply'],
    templateColor: '#003B5C'
  },

  // IOWA
  IA: {
    stateCode: 'IA',
    stateName: 'Iowa',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // KANSAS
  KS: {
    stateCode: 'KS',
    stateName: 'Kansas',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // KENTUCKY
  KY: {
    stateCode: 'KY',
    stateName: 'Kentucky',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // LOUISIANA
  LA: {
    stateCode: 'LA',
    stateName: 'Louisiana',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // MAINE
  ME: {
    stateCode: 'ME',
    stateName: 'Maine',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // MARYLAND
  MD: {
    stateCode: 'MD',
    stateName: 'Maryland',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: true,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'countyTax'],
    legalNotices: ['County tax may apply'],
    templateColor: '#003B5C'
  },

  // MASSACHUSETTS
  MA: {
    stateCode: 'MA',
    stateName: 'Massachusetts',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // MICHIGAN
  MI: {
    stateCode: 'MI',
    stateName: 'Michigan',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: true,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'cityTax'],
    legalNotices: ['City tax may apply'],
    templateColor: '#003B5C'
  },

  // MINNESOTA
  MN: {
    stateCode: 'MN',
    stateName: 'Minnesota',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // MISSISSIPPI
  MS: {
    stateCode: 'MS',
    stateName: 'Mississippi',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // MISSOURI
  MO: {
    stateCode: 'MO',
    stateName: 'Missouri',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // MONTANA
  MT: {
    stateCode: 'MT',
    stateName: 'Montana',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // NEBRASKA
  NE: {
    stateCode: 'NE',
    stateName: 'Nebraska',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // NEVADA
  NV: {
    stateCode: 'NV',
    stateName: 'Nevada',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Nevada has no state income tax'],
    templateColor: '#003B5C'
  },

  // NEW HAMPSHIRE
  NH: {
    stateCode: 'NH',
    stateName: 'New Hampshire',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['New Hampshire has no wage income tax'],
    templateColor: '#003B5C'
  },

  // NEW JERSEY
  NJ: {
    stateCode: 'NJ',
    stateName: 'New Jersey',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: true,
    sdiLabel: 'NJ TDI/FLI',
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'tdi', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['NJ Temporary Disability Insurance (TDI) and Family Leave Insurance (FLI) required'],
    templateColor: '#003B5C'
  },

  // NEW MEXICO
  NM: {
    stateCode: 'NM',
    stateName: 'New Mexico',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // NEW YORK
  NY: {
    stateCode: 'NY',
    stateName: 'New York',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: true,
    sdiLabel: 'NY DBL/PFL',
    hasCityTax: true,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'dbl', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'nycTax'],
    legalNotices: [
      'NY Disability Benefits Law (DBL) and Paid Family Leave (PFL) required',
      'NYC residents subject to city tax'
    ],
    specialRequirements: ['Show NYC tax if applicable'],
    templateColor: '#003B5C'
  },

  // NORTH CAROLINA
  NC: {
    stateCode: 'NC',
    stateName: 'North Carolina',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // NORTH DAKOTA
  ND: {
    stateCode: 'ND',
    stateName: 'North Dakota',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // OHIO
  OH: {
    stateCode: 'OH',
    stateName: 'Ohio',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: true,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'cityTax'],
    legalNotices: ['Local city tax may apply'],
    templateColor: '#003B5C'
  },

  // OKLAHOMA
  OK: {
    stateCode: 'OK',
    stateName: 'Oklahoma',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // OREGON
  OR: {
    stateCode: 'OR',
    stateName: 'Oregon',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // PENNSYLVANIA
  PA: {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: true,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'localTax'],
    legalNotices: ['Local wage tax may apply'],
    templateColor: '#003B5C'
  },

  // RHODE ISLAND
  RI: {
    stateCode: 'RI',
    stateName: 'Rhode Island',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: true,
    sdiLabel: 'RI TDI',
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'tdi', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Rhode Island Temporary Disability Insurance (TDI) required'],
    templateColor: '#003B5C'
  },

  // SOUTH CAROLINA
  SC: {
    stateCode: 'SC',
    stateName: 'South Carolina',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // SOUTH DAKOTA
  SD: {
    stateCode: 'SD',
    stateName: 'South Dakota',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['South Dakota has no state income tax'],
    templateColor: '#003B5C'
  },

  // TENNESSEE
  TN: {
    stateCode: 'TN',
    stateName: 'Tennessee',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Tennessee has no state income tax'],
    templateColor: '#003B5C'
  },

  // TEXAS
  TX: {
    stateCode: 'TX',
    stateName: 'Texas',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus', 'commission'],
    legalNotices: ['Texas has no state income tax'],
    templateColor: '#003B5C'
  },

  // UTAH
  UT: {
    stateCode: 'UT',
    stateName: 'Utah',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // VERMONT
  VT: {
    stateCode: 'VT',
    stateName: 'Vermont',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // VIRGINIA
  VA: {
    stateCode: 'VA',
    stateName: 'Virginia',
    defaultTemplate: 'modern',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // WASHINGTON
  WA: {
    stateCode: 'WA',
    stateName: 'Washington',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Washington has no state income tax'],
    templateColor: '#003B5C'
  },

  // WEST VIRGINIA
  WV: {
    stateCode: 'WV',
    stateName: 'West Virginia',
    defaultTemplate: 'classic',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // WISCONSIN
  WI: {
    stateCode: 'WI',
    stateName: 'Wisconsin',
    defaultTemplate: 'detailed',
    hasStateTax: true,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'stateTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    templateColor: '#003B5C'
  },

  // WYOMING
  WY: {
    stateCode: 'WY',
    stateName: 'Wyoming',
    defaultTemplate: 'compact',
    hasStateTax: false,
    hasSDI: false,
    hasCityTax: false,
    requiredFields: ['grossPay', 'federalTax', 'socialSecurity', 'medicare', 'netPay'],
    optionalFields: ['overtime', 'bonus'],
    legalNotices: ['Wyoming has no state income tax'],
    templateColor: '#003B5C'
  }
}

// Helper function to get state config
export function getStateConfig(stateCode: string): StateTemplateConfig | null {
  return STATE_TEMPLATE_CONFIGS[stateCode.toUpperCase()] || null
}

// Helper function to get recommended template for state
export function getRecommendedTemplate(stateCode: string): string {
  const config = getStateConfig(stateCode)
  return config?.defaultTemplate || 'modern'
}

// Helper function to check if state has specific requirement
export function stateHasSDI(stateCode: string): boolean {
  const config = getStateConfig(stateCode)
  return config?.hasSDI || false
}

export function stateHasStateTax(stateCode: string): boolean {
  const config = getStateConfig(stateCode)
  return config?.hasStateTax || false
}

export function stateHasCityTax(stateCode: string): boolean {
  const config = getStateConfig(stateCode)
  return config?.hasCityTax || false
}

// Get all states grouped by template type
export function getStatesByTemplate(templateType: string): string[] {
  return Object.values(STATE_TEMPLATE_CONFIGS)
    .filter(config => config.defaultTemplate === templateType)
    .map(config => config.stateCode)
}

// Get states with no income tax
export function getNoTaxStates(): string[] {
  return Object.values(STATE_TEMPLATE_CONFIGS)
    .filter(config => !config.hasStateTax)
    .map(config => config.stateCode)
}

// Get states with SDI/TDI requirements
export function getSDIStates(): string[] {
  return Object.values(STATE_TEMPLATE_CONFIGS)
    .filter(config => config.hasSDI)
    .map(config => config.stateCode)
}
