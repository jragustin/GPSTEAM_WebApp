import Sequelize from 'sequelize';

// clear terminal window
process.stdout.write("\u001b[2J\u001b[0;0H");

const env = process.env.NODE_ENV || 'prod';
let dbname;

if (env === 'dev') {
  dbname = 'gpsdb';
} else {
  dbname = 'gpsdb';
}

// define the database
export let db = new Sequelize(dbname, 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306',
  define: {
    underscored: true,
    createdAt: false,
    updatedAt: false
  }
});

// set models
export const AccessLevel = db.import("./models/access_levels")
export const AntennaModel = db.import("./models/antenna_models")
export const Antenna = db.import("./models/antennas")
export const CampaignLogsheet = db.import("./models/campaign_logsheets")
export const ContactNumber = db.import("./models/contact_numbers")
export const ContinuousLogsheet = db.import("./models/continuous_logsheets")
export const Division = db.import("./models/divisions")
export const Email = db.import("./models/emails")
export const EquipmentBrand = db.import("./models/equipment_brands")
export const Marker = db.import("./models/markers")
export const NonStaffPosition = db.import("./models/non_staff_positions")
export const OfficeLocation = db.import("./models/office_locations")
export const Person = db.import("./models/people")
export const PersonType = db.import("./models/person_types")
export const Position = db.import("./models/positions")
export const ReceiverModel = db.import("./models/receiver_models")
export const Receiver = db.import("./models/receivers")
export const Site = db.import("./models/sites")
export const SurveyType = db.import("./models/survey_types")
export const User = db.import("./models/users")

// set relationships
// user, person, access_level
AccessLevel.hasMany(User)
User.belongsTo(Person)

/* (Staff) position, division, person 
email, contact_number
*/
Position.hasMany(Person)
Person.belongsTo(Position)
Division.hasMany(Person)
Person.belongsTo(Division)
Person.hasMany(Email)
Person.hasMany(ContactNumber)

/* (non Staff) site, person_type, non_staff_position, person */
Site.hasMany(Person)
PersonType.hasMany(Person)
Person.belongsTo(PersonType)
NonStaffPosition.hasMany(Person)
Person.belongsTo(NonStaffPosition)
Person.belongsTo(OfficeLocation)
OfficeLocation.hasMany(Person)

/* site, survey_type, campaign_logsheet, continuous_logsheet, marker */
Site.belongsTo(SurveyType)
CampaignLogsheet.belongsTo(Site)
Site.hasMany(CampaignLogsheet)
ContinuousLogsheet.belongsTo(Site)
Site.hasMany(ContinuousLogsheet)
Site.belongsTo(Marker)
Marker.hasMany(Site)

/* receiver receiver_model equipment_brand */
Antenna.belongsTo(AntennaModel)
AntennaModel.hasMany(Antenna)
AntennaModel.belongsTo(EquipmentBrand)
EquipmentBrand.hasMany(AntennaModel)

/* antenna receiver_model equipment_brand */
Receiver.belongsTo(ReceiverModel)
ReceiverModel.hasMany(Receiver)
ReceiverModel.belongsTo(EquipmentBrand)
EquipmentBrand.hasMany(ReceiverModel)

/* receiver antenna campaign_logsheet continuous_logsheet */
CampaignLogsheet.belongsTo(Antenna)
CampaignLogsheet.belongsTo(Receiver)
ContinuousLogsheet.belongsTo(Antenna)
ContinuousLogsheet.belongsTo(Receiver)

/* campaign_logsheet continuous_logsheet observers*/
CampaignLogsheet.belongsToMany(Person, { through: 'campaign_observers' })
Person.belongsToMany(CampaignLogsheet, { through: 'campaign_observers' })
ContinuousLogsheet.belongsToMany(Person, { through: 'continuous_observers' })
Person.belongsToMany(ContinuousLogsheet, { through: 'continuous_observers' })

// uncommment this lines below to create the database tables
db.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then((res) => {
  db.sync({
    logging: console.log,
    // warning: setting force to true will delete all the data
    // make backup of the database first
    // only enable force to true if you know what you are doing.
    // force: true,
  });
})

// console.log('\nAssociations');
// for (const assoc of Object.keys(Site.associations)) {
//   for (const accessor of Object.keys(Site.associations[assoc].accessors)) {
//     console.log(`${Site.name}.${Site.associations[assoc].accessors[accessor]}()`);
//   }
// }
