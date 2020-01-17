const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');

const {
  GetAllJobFamilies,
  GetJobFamily,
  CreateJobFamily,
} = require('./app/jobfamily');


const JobFamilySerializer = require('./interfaces/http/jobfamily/JobFamilySerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeJobFamilyRepository = require('./infra/jobfamily/SequelizeJobFamiliesRepository');

const { 
  database,
  JobFamily: JobFamilyModel, 
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
  jobFamilyRepository: asClass(SequelizeJobFamilyRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  // UserModel: asValue(UserModel),
  JobFamilyModel: asValue(JobFamilyModel)
});

// Operations
container.register({
  getAllJobFamilies: asClass(GetAllJobFamilies),
  getJobFamily: asClass(GetJobFamily),
  createJobFamily: asClass(CreateJobFamily),
});


// Serializers
container.register({
  // userSerializer: asValue(UserSerializer)
  jobFamilySerializer: asValue(JobFamilySerializer)
});

module.exports = container;
