import { requiresAdmin, requiresStaff, requiresAuth } from './helpers/permission'
 
export const queries = {
  accessLevel: {
    before: requiresAdmin
  },
  accessLevels: {
    before: requiresAdmin
  },
  antennaModel: {
    before: requiresStaff
  },
  antennaModels: {
    before: requiresStaff
  },
  antenna: {
    before: requiresStaff
  },
  antennas: {
    before: requiresStaff
  },
  campaignLogsheet: {
    before: requiresStaff
  },
  campaignLogsheets: {
    before: requiresStaff
  },
  contactNumber: {
    before: requiresStaff
  },
  contactNumbers: {
    before: requiresStaff
  },
  continuousLogsheet: {
    before: requiresStaff
  },
  continuousLogsheets: {
    before: requiresStaff
  },
  division: {
    before: requiresStaff
  },
  divisions: {
    before: requiresStaff
  },
  email: {
    before: requiresStaff
  },
  emails: {
    before: requiresStaff
  },
  equipmentBrand: {
    before: requiresStaff
  },
  equipmentBrands: {
    before: requiresStaff
  },
  marker: {
    before: requiresStaff
  },
  markers: {
    before: requiresStaff
  },
  nonStaffPosition: {
    before: requiresStaff
  },
  nonStaffPositions: {
    before: requiresStaff
  },
  officeLocation: {
    before: requiresStaff
  },
  officeLocations: {
    before: requiresStaff
  },
  person: {
    before: requiresStaff
  },
  people: {
    before: requiresStaff
  },
  personType: {
    before: requiresStaff
  },
  personTypes: {
    before: requiresStaff
  },
  position: {
    before: requiresStaff
  },
  positions: {
    before: requiresStaff
  },
  receiverModel: {
    before: requiresStaff
  },
  receiverModels: {
    before: requiresStaff
  },
  receiver: {
    before: requiresStaff
  },
  receivers: {
    before: requiresStaff
  },
  site: {
    before: requiresStaff
  },
  sites: {
    before: requiresStaff
  },
  surveyType: {
    before: requiresStaff
  },
  surveyTypes: {
    before: requiresStaff
  },
  user: {
    before: requiresAdmin
  },
  users: {
    before: requiresAdmin
  },
  campaignObservers: {
    before: requiresStaff
  },
  continuousObservers: {
    before: requiresStaff
  }
}