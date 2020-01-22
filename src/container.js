const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');

const {
  GetAllJobFamilies,
  GetJobFamily,
  CreateJobFamily,
  UpdateJobFamily,
  DeleteJobFamily
} = require('./app/jobfamily');

const {
  GetAllJobDesignations,
  GetDesignation,
  CreateDesignation,
  UpdateDesignation,
  DeleteDesignation,
} = require('./app/JobDesignation');

const {
  GetRoles,
  GetRole,
  CreateRole,
  UpdateRole,
  DeleteRole,
} = require('./app/JobRole');

const {
  GetLevel,
  GetLevels,
  UpdateLevel,
  CreateLevel,
  DeleteLevel,
} = require('./app/JobLevel');

const {
  GetCategories,
  GetCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} = require('./app/JobCategory');

const {
  GetCompetencyGroup,
  GetCompetencyGroups,
  CreateCompetencyGroup,
  UpdateCompetencyGroup,
  DeleteCompetencyGroup,
} = require('./app/CompetencyGroup');

const {
  GetCompetencies,
  GetCompetency,
  CreateCompetency,
  UpdateCompetency,
  DeleteCompetency,
} = require('./app/Competency');

const {
  GetUserGroups,
  GetUserGroup,
  CreateUserGroup,
  UpdateUserGroup,
  DeleteUserGroup,
} = require('./app/UserGroup');

const JobFamilySerializer = require('./interfaces/http/jobfamily/JobFamilySerializer');
const JobDesignationSerializer = require('./interfaces/http/jobdesignation/JobDesignationSerializer');
const JobRoleSerializer = require('./interfaces/http/jobrole/JobRoleSerializer');
const JobLevelSerializer = require('./interfaces/http/joblevel/JobLevelSerializer');
const JobCategorySerializer = require('./interfaces/http/jobcategory/JobCategorySerializer');
const CompetencyGroupSerializer = require('./interfaces/http/competencygroup/CompetencyGroupSerializer');
const CompetencySerializer = require('./interfaces/http/competency/CompetencySerializer');
const UserGroupSerializer = require('./interfaces/http/usergroup/UserGroupSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeJobFamilyRepository = require('./infra/jobfamily/SequelizeJobFamiliesRepository');
const SequelizeJobDesignationRepository = require('./infra/jobDesignation/SequelizeJobDesignationRepository');
const SequelizeJobRoleRepository = require('./infra/JobRole/SequelizeJobRoleRepository');
const SequelizeJobLevelRepository = require('./infra/JobLevel/SequelizeJobLevelRepository');
const SequelizeJobCategoryRepository = require('./infra/JobCategory/SequelizeJobCategoryRepository');
const SequelizeCompetencyGroupRepository = require('./infra/CompetencyGroup/SequelizeCompetencyGroupRepository');
const SequelizeCompetencyRepository = require('./infra/Competency/SequelizeCompetencyRepository');
const SequelizeUserGroupRepository = require('./infra/UserGroup/UserGroupRepository');

const { 
  database,
  JobFamily: JobFamilyModel, 
  JobDesignation: JobDesignationModel,
  JobRole: JobRoleModel,
  JobLevel: JobLevelModel,
  JobCategory: JobCategoryModel,
  CompetencyGroup: CompetencyGroupModel,
  Competency: CompetencyModel,
  UserGroup: UserGroupModel,
} = require('./infra/database/models');


const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton(),
  jobFamilyRepository: asClass(SequelizeJobFamilyRepository).singleton(),
  JobDesignationRepository: asClass(SequelizeJobDesignationRepository).singleton(),
  JobRoleRepository: asClass(SequelizeJobRoleRepository).singleton(),
  JobLevelRepository: asClass(SequelizeJobLevelRepository).singleton(),
  JobCategoryRepository: asClass(SequelizeJobCategoryRepository).singleton(),
  CompetencyGroupRepository: asClass(SequelizeCompetencyGroupRepository).singleton(),
  CompetencyRepository: asClass(SequelizeCompetencyRepository).singleton(),
  UserGroupRepository: asClass(SequelizeUserGroupRepository).singleton(),
});

// Database
container.register({
  database: asValue(database),
  JobFamilyModel: asValue(JobFamilyModel),
  JobDesignationModel: asValue(JobDesignationModel),
  JobRoleModel: asValue(JobRoleModel),
  JobLevelModel: asValue(JobLevelModel),
  JobCategoryModel: asValue(JobCategoryModel),
  CompetencyGroupModel: asValue(CompetencyGroupModel),
  CompetencyModel: asValue(CompetencyModel),
  UserGroupModel: asValue(UserGroupModel),
});

// Operations
container.register({
  // Job Family
  getAllJobFamilies: asClass(GetAllJobFamilies),
  getJobFamily: asClass(GetJobFamily),
  createJobFamily: asClass(CreateJobFamily),
  updateJobFamily: asClass(UpdateJobFamily),
  deleteJobFamily: asClass(DeleteJobFamily),

  // Job Designation
  GetAllJobDesignations: asClass(GetAllJobDesignations),
  GetDesignation: asClass(GetDesignation),
  CreateDesignation: asClass(CreateDesignation),
  UpdateDesignation: asClass(UpdateDesignation),
  DeleteDesignation: asClass(DeleteDesignation),

  // Job Role
  GetRoles: asClass(GetRoles),
  GetRole: asClass(GetRole),
  CreateRole: asClass(CreateRole),
  UpdateRole: asClass(UpdateRole),
  DeleteRole: asClass(DeleteRole),

  // Job Level
  GetLevels: asClass(GetLevels),
  GetLevel: asClass(GetLevel),
  CreateLevel: asClass(CreateLevel),
  UpdateLevel: asClass(UpdateLevel),
  DeleteLevel: asClass(DeleteLevel),

  // Job Category
  GetCategories: asClass(GetCategories),
  GetCategory: asClass(GetCategory),
  CreateCategory: asClass(CreateCategory),
  UpdateCategory: asClass(UpdateCategory),
  DeleteCategory: asClass(DeleteCategory),

  // Competency Group
  GetCompetencyGroups: asClass(GetCompetencyGroups),
  GetCompetencyGroup: asClass(GetCompetencyGroup),
  CreateCompetencyGroup: asClass(CreateCompetencyGroup),
  UpdateCompetencyGroup: asClass(UpdateCompetencyGroup),
  DeleteCompetencyGroup: asClass(DeleteCompetencyGroup),

  // Competency
  GetCompetencies: asClass(GetCompetencies),
  GetCompetency: asClass(GetCompetency),
  CreateCompetency: asClass(CreateCompetency),
  UpdateCompetency: asClass(UpdateCompetency),
  DeleteCompetency: asClass(DeleteCompetency),

  // User Group
  GetUserGroups: asClass(GetUserGroups),
  GetUserGroup: asClass(GetUserGroup),
  CreateUserGroup: asClass(CreateUserGroup),
  UpdateUserGroup: asClass(UpdateUserGroup),
  DeleteUserGroup: asClass(DeleteUserGroup),

});


// Serializers
container.register({
  jobFamilySerializer: asValue(JobFamilySerializer),
  JobDesignationSerializer: asValue(JobDesignationSerializer),
  JobRoleSerializer: asValue(JobRoleSerializer),
  JobLevelSerializer: asValue(JobLevelSerializer),
  JobCategorySerializer: asValue(JobCategorySerializer),
  CompetencyGroupSerializer: asValue(CompetencyGroupSerializer),
  CompetencySerializer: asValue(CompetencySerializer),
  UserGroupSerializer: asValue(UserGroupSerializer),
});

module.exports = container;
