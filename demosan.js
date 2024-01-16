/*** Setup project command dependencies ***/
import { Command } from 'commander';
import { exec, execSync } from 'child_process';
import pkg from 'fs-extra';
import readline from 'readline';
import path from 'path';

const {
  writeFile,
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  unlink,
  rm,
} = pkg;
const program = new Command();

/*** Project command version */
program.version('1.0.0', '-v -version');

/*** Remove the developers folders, files, & dependencies ***/
program
  .command('clean')
  .description("Remove 'src' folder, .env file, & initial package dependencies")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      "Are you sure you want to remove 'src' folder, '.env' file, & initial package dependencies? (y/n) ",
      (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          console.log('cleaning...');

          /*** Remove 'data-seed' folder if exist ***/
          if (existsSync('./data-seed')) {
            rm('./data-seed', { recursive: true }, (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove 'src' folder if exist ***/
          if (existsSync('./src')) {
            rm('./src', { recursive: true }, (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove .env file if exist ***/
          if (existsSync('./.env')) {
            unlink('./.env', (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove .gitignore file if exist ***/
          if (existsSync('./.gitignore')) {
            unlink('./.gitignore', (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove Dockerfile file if exist ***/
          if (existsSync('./Dockerfile')) {
            unlink('./Dockerfile', (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove docker-compose file if exist ***/
          if (existsSync('./docker-compose.yml')) {
            unlink('./docker-compose.yml', (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove .dockerignore file if exist ***/
          if (existsSync('./.dockerignore')) {
            unlink('./.dockerignore', (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Remove README file if exist ***/
          if (existsSync('./README.md')) {
            unlink('./README.md', (error) => {
              if (error) {
                console.error('Error encounter while cleaning.');
                return;
              }
            });
          }

          /*** Uninstall initial package dependencies ***/
          const packageDependencies = [
            'npm uninstall --save dotenv',
            'npm uninstall --save express',
            'npm uninstall --save express-session',
            'npm uninstall --save bcrypt',
            'npm uninstall --save jsonwebtoken',
            'npm uninstall --save nodemon',
            'npm uninstall --save http-errors',
            'npm uninstall --save uuid',
            'npm uninstall --save multer',
            'npm uninstall --save aws-sdk',
            'npm uninstall --save axios',
            'npm uninstall --save cors',
            'npm uninstall --save nodemailer',
            'npm uninstall --save payload-validator',
            'npm uninstall --save-dev @types/express',
            'npm uninstall --save-dev @types/express-session',
            'npm uninstall --save-dev @types/bcrypt',
            'npm uninstall --save-dev @types/jsonwebtoken',
            'npm uninstall --save-dev @types/http-errors',
            'npm uninstall --save-dev @types/uuid',
            'npm uninstall --save-dev @types/multer',
            'npm uninstall --save-dev @types/cors',
            'npm uninstall --save-dev @types/nodemailer',
          ];
          packageDependencies.forEach((packageDependency) => {
            try {
              // @ts-ignore
              execSync(packageDependency, (error) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  return;
                }
              });
            } catch (error) {
              console.error('Error encounter while initializing.');
              return;
            }
          });

          /*** Modify package.json file ***/
          const packageJsonFilePath = './package.json';
          // @ts-ignore
          const packageJson = JSON.parse(readFileSync(packageJsonFilePath));

          packageJson.scripts.start = 'ts-node src/index.ts';
          packageJson.scripts.typeorm = 'typeorm-ts-node-commonjs';
          writeFileSync(
            packageJsonFilePath,
            JSON.stringify(packageJson, null, 2)
          );

          console.log('clean successfully!');

          rl.close();
        } else {
          console.log('clean cancelled');
          rl.close();
        }
      }
    );
  });

/*** Initialize ***/
program
  .command('init')
  .description('Setup initial folders, files, & package dependencies')
  .action(() => {
    console.log('Project initializing...');

    /*** Create new 'data-seed' folder ***/
    // @ts-ignore
    mkdirSync('./data-seed', { recursive: true }, (error) => {
      if (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Create new 'src' folder ***/
    // @ts-ignore
    mkdirSync('./src', { recursive: true }, (error) => {
      if (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Create 'src' sub folders ***/
    const subFolders = [
      'config',
      'constants',
      'controllers',
      'middlewares',
      'migrations',
      'models',
      'repositories',
      'routes',
      'services',
      'utils',
    ];
    subFolders.forEach((subFolder) => {
      try {
        mkdirSync(`./src/${subFolder}`);
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Create sub folder for 'middlewares' folder ***/
    mkdirSync(
      './src/middlewares/authenticator',
      { recursive: true },
      // @ts-ignore
      (error) => {
        if (error) {
          console.error('Error encounter while initializing.');
          return;
        }
      }
    );

    /*** Create initial files ***/
    const initialFiles = [
      {
        filepath: './src/index.ts',
        content: generateIndexContent(),
      },
      {
        filepath: './src/config/data-source.config.ts',
        content: generateDsConfigContent(),
      },
      {
        filepath: './src/constants/config.constant.ts',
        content: generateConfigConstantContent(),
      },
      {
        filepath: './src/constants/status-codes.constant.ts',
        content: generateStatusCodesConstantContent(),
      },
      {
        filepath: './src/middlewares/authenticator/auth.middleware.ts',
        content: generateAuthMiddlewareContent(),
      },
      {
        filepath: './src/routes/index.route.ts',
        content: generateIndexRouteContent(),
      },
    ];
    initialFiles.forEach((data) => {
      try {
        // @ts-ignore
        writeFileSync(data.filepath, data.content, function (error) {
          if (error) {
            console.error('Error encounter while initializing.');
            return;
          }
        });
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Create .env file ***/
    // @ts-ignore
    writeFileSync('./.env', generateDotEnvContent(), function (error) {
      if (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Create .gitignore file ***/
    writeFileSync(
      './.gitignore',
      generateDotGitignoreContent(),
      // @ts-ignore
      function (error) {
        if (error) {
          console.error('Error encounter while initializing.');
          return;
        }
      }
    );

    /*** Create Dockerfile file ***/
    writeFileSync(
      './Dockerfile',
      generateDockerfileContent(),
      // @ts-ignore
      function (error) {
        if (error) {
          console.error('Error encounter while initializing.');
          return;
        }
      }
    );

    /*** Create docker-compose file ***/
    writeFileSync(
      './docker-compose.yml',
      generateDockerComposeContent(),
      // @ts-ignore
      function (error) {
        if (error) {
          console.error('Error encounter while initializing.');
          return;
        }
      }
    );

    /*** Create docker-compose file ***/
    writeFileSync(
      './.dockerignore',
      generateDotDockerignoreContent(),
      // @ts-ignore
      function (error) {
        if (error) {
          console.error('Error encounter while initializing.');
          return;
        }
      }
    );

    /*** Create README file ***/
    // @ts-ignore
    writeFileSync('./README.md', '# Sugoi!!', function (error) {
      if (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Install initial package dependencies ***/
    const packageDependencies = [
      'npm install --save dotenv@16.0.3',
      'npm install --save express@4.18.2',
      'npm install --save express-session@1.17.3',
      'npm install --save bcrypt@5.1.0',
      'npm install --save jsonwebtoken@9.0.0',
      'npm install --save nodemon@2.0.22',
      'npm install --save http-errors@2.0.0',
      'npm install --save uuid@9.0.0',
      'npm install --save multer@1.4.5-lts.1',
      'npm install --save aws-sdk@2.1400.0',
      'npm install --save axios@1.3.5',
      'npm install --save cors@2.8.5',
      'npm install --save nodemailer@6.9.3',
      'npm install --save payload-validator@1.0.4',
      'npm install --save-dev @types/express@4.17.17',
      'npm install --save-dev @types/express-session@1.17.7',
      'npm install --save-dev @types/bcrypt@5.0.0',
      'npm install --save-dev @types/jsonwebtoken@9.0.1',
      'npm install --save-dev @types/http-errors@2.0.1',
      'npm install --save-dev @types/uuid@9.0.1',
      'npm install --save-dev @types/multer@1.4.7',
      'npm install --save-dev @types/cors@2.8.13',
      'npm install --save-dev @types/nodemailer@6.4.8',
    ];
    packageDependencies.forEach((packageDependency) => {
      try {
        // @ts-ignore
        execSync(packageDependency, (error) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });

    /*** Modify package.json file ***/
    const packageJsonFilePath = './package.json';
    // @ts-ignore
    const packageJson = JSON.parse(readFileSync(packageJsonFilePath));

    packageJson.version = '1.0.0';
    packageJson.scripts.start = 'nodemon src/index.ts';
    packageJson.scripts.typeorm =
      'typeorm-ts-node-commonjs -d src/config/data-source.config.ts';
    const fixPackageVersions = JSON.stringify(packageJson, null, 2).replace(
      /\^/g,
      ''
    );
    writeFileSync(packageJsonFilePath, fixPackageVersions);

    console.log('Project initialized successfully!');
  });

/*** Migration generate ***/
program
  .command('migration-generate')
  .description('Create new migration file')
  .action(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let migrationName = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      migrationName += letters.charAt(randomIndex);
    }

    exec(
      `npm run typeorm migration:generate ./src/migrations/${migrationName}`,
      (error, stdout) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(stdout);
      }
    );
  });

/*** Migration run ***/
program
  .command('migration-run')
  .description('Execute all migration files')
  .action(() => {
    exec('npm run typeorm migration:run', (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(stdout);
    });
  });

/*** Make model ***/
program
  .command('make-model <filename>')
  .description('Create new model file')
  .action((filename) => {
    if (filename.includes('.')) {
      console.log('permission denied.');
    } else {
      const modelFilePath = path.join('./src/models/', filename + '.model.ts');

      if (existsSync(modelFilePath)) {
        console.log(`Model: ${filename} already exists in models!`);
      } else {
        writeFile(
          modelFilePath,
          generateModelContent(filename),
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Model: ${filename}.model.ts created successfully!`);
            }
          }
        );
      }
    }
  });

/*** Make repository ***/
program
  .command('make-repository <filename>')
  .description('Create new repository file')
  .action((filename) => {
    if (filename.includes('.')) {
      console.log('permission denied.');
    } else {
      const repositoryFilePath = path.join(
        './src/repositories/',
        filename + '.repository.ts'
      );

      if (existsSync(repositoryFilePath)) {
        console.log(
          `Repository: ${filename}.repository.ts already exists in repositories!`
        );
      } else {
        writeFile(
          repositoryFilePath,
          generateRepositoryContent(),
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Repository: ${filename}.repository.ts created successfully!`
              );
            }
          }
        );
      }
    }
  });

/*** Make controller ***/
program
  .command('make-controller <filename>')
  .description('Create new controller file')
  .action((filename) => {
    if (filename.includes('.')) {
      console.log('permission denied.');
    } else {
      let dataSourcePath = '../config/data-source.config.js';
      let statusResponsePath = '../constants/status-codes.constant.js';

      if (filename.includes('/')) {
        let thisDataArr = filename.split('/');
        let countDataArr = thisDataArr.length - 1;
        // @ts-ignore
        let thisSubFolders = [];
        let thisSubFoldersPath = '';
        let thisPath = '';
        let thisFilename = '';

        // @ts-ignore
        thisDataArr.forEach((thisData, i) => {
          if (thisData) {
            if (i === countDataArr) {
              thisFilename = thisData;
              return;
            }

            dataSourcePath = '../' + dataSourcePath;
            statusResponsePath = '../' + statusResponsePath;
            thisSubFolders.push(thisData);
            thisSubFoldersPath += '/' + thisData;
            thisPath = './src/controllers' + thisSubFoldersPath;

            if (!existsSync(thisPath)) {
              // @ts-ignore
              mkdirSync(thisPath, { recursive: true }, (error) => {
                if (error) {
                  console.error('Error encounter while initializing.');
                  return;
                }
              });
            }
          }
        });

        // @ts-ignore
        thisSubFolders = thisSubFolders.join('/');
        thisFilename = '/' + thisFilename + '.controller.ts';

        const controllerFilePath = path.join(thisPath, thisFilename);

        if (existsSync(controllerFilePath)) {
          console.log(
            `Controller: ${filename}.controller.ts already exists in controllers!`
          );
        } else {
          writeFile(
            controllerFilePath,
            generateControllerContent(dataSourcePath, statusResponsePath),
            function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  `Controller: ${filename}.controller.ts created successfully!`
                );
              }
            }
          );
        }

        return;
      }

      const controllerFilePath = path.join(
        './src/controllers/',
        filename + '.controller.ts'
      );

      if (existsSync(controllerFilePath)) {
        console.log(
          `Controller: ${filename}.controller.ts already exists in controllers!`
        );
      } else {
        writeFile(
          controllerFilePath,
          generateControllerContent(dataSourcePath, statusResponsePath),
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `Controller: ${filename}.controller.ts created successfully!`
              );
            }
          }
        );
      }
    }
  });

/*** Make route ***/
program
  .command('make-route <filename>')
  .description('Create new route file')
  .action((filename) => {
    if (filename.includes('.')) {
      console.log('permission denied.');
    } else {
      const routeFilePath = path.join('./src/routes/', filename + '.route.ts');

      if (existsSync(routeFilePath)) {
        console.log(`Route: ${filename}.route.ts already exists in routes!`);
      } else {
        writeFile(routeFilePath, generateRouteContent(), function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Route: ${filename}.route.ts created successfully!`);
          }
        });
      }
    }
  });

/*** Docker commands ***/
program
  .command('docker-build')
  .description('Build docker containers (Experimental)')
  .action(() => {
    console.log('Building project in docker...');

    const dockerCommands = [
      'docker-compose down',
      'docker-compose build',
      'docker image prune -f',
    ];
    dockerCommands.forEach((dockerCommand) => {
      try {
        // @ts-ignore
        execSync(dockerCommand, (error) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });
  });

program
  .command('docker-start')
  .description('Start docker containers (Experimental)')
  .action(() => {
    console.log('Starting the project in docker...');

    const dockerCommands = ['docker-compose up -d', 'docker image prune -f'];
    dockerCommands.forEach((dockerCommand) => {
      try {
        // @ts-ignore
        execSync(dockerCommand, (error) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });
  });

program
  .command('docker-restart')
  .description('Restart docker containers (Experimental)')
  .action(() => {
    console.log('Restarting project in docker...');

    const dockerCommands = [
      'docker-compose down',
      'docker-compose build',
      'docker-compose up -d',
      'docker image prune -f',
    ];
    dockerCommands.forEach((dockerCommand) => {
      try {
        // @ts-ignore
        execSync(dockerCommand, (error) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });
  });

program
  .command('docker-stop')
  .description('Stop docker containers (Experimental)')
  .action(() => {
    console.log('Stopping the project in docker...');

    const dockerCommands = ['docker-compose down', 'docker image prune -f'];
    dockerCommands.forEach((dockerCommand) => {
      try {
        // @ts-ignore
        execSync(dockerCommand, (error) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
      } catch (error) {
        console.error('Error encounter while initializing.');
        return;
      }
    });
  });

/*** Execute project command ***/
program.parse(process.argv);

/*** All File Contents ***/
// @ts-ignore
function generateModelContent(filename) {
  const modelNameArr = filename.split('-');
  let modelName = '';
  let entityName = '';

  // @ts-ignore
  for (var i = 0; i < modelNameArr.length; i++) {
    modelName +=
      // @ts-ignore
      modelNameArr[i].charAt(0).toUpperCase() + modelNameArr[i].slice(1);
  }

  // @ts-ignore
  for (var i = 0; i < modelNameArr.length; i++) {
    // @ts-ignore
    entityName += modelNameArr[i] + '_';
  }

  entityName += 'tb';

  return `/*** Setup model dependencies here ***/
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/*** Declare your model columns here ***/
@Entity({ name: '${entityName}' })
export class ${modelName} {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'datetime',
    precision: 0,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  datetime_created!: string;

  @Column({
    type: 'datetime',
    precision: 0,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  datetime_updated!: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  archive_flag!: number;
}
`;
}

function generateRepositoryContent() {
  return `/*** Setup repository dependencies & models here ***/
import { dbSource } from '../config/data-source.config.js';

/*** Export repository functions here ***/
export async function index() {
  return;
}
`;
}

// @ts-ignore
function generateControllerContent(dataSourcePath, statusResponsePath) {
  return `/*** Setup controller dependencies here ***/
import { dbSource } from '${dataSourcePath}';
import { Request, Response } from 'express';
import statusResponse from '${statusResponsePath}';

/*** Import repositories here ***/

/*** Import models here ***/

/*** Export controller functions here ***/
export async function index(_req: Request, res: Response) {
  try {
    // Do something here
  } catch (error) {
    console.error(error);

    res.status(statusResponse.CODE[500]).json({
      error: true,
      message: statusResponse.NAME[500],
    });
  }
}
`;
}

function generateRouteContent() {
  return `/*** Setup router dependencies here ***/
import { Router } from 'express';
const routes = Router();

/*** Import middlewares here ***/

/*** Import controllers here ***/

/*** Add routes here ***/

/*** Export routes ***/
export default routes;
`;
}

function generateAuthMiddlewareContent() {
  return `/*** Setup auth middleware ***/
import { dbSource } from '../../config/data-source.config.js';
import config from '../../constants/config.constant.js';
import statusResponse from '../../constants/status-codes.constant.js';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/*** Jwt data lists ***/
function jwtDataLists(data: Object) {
  return {
    uuid: data['uuid'],
  };
}

/*** Create jwt ***/
export async function createAuthToken(req: Request, data: Object) {
  return {
    accessToken: jwt.sign(jwtDataLists(data), config.AUTH.ACCESS_SECRET_KEY, {
      expiresIn: '24h',
    }),
    refreshToken: jwt.sign(jwtDataLists(data), config.AUTH.REFRESH_SECRET_KEY),
  };
}

/*** Verify jwt ***/
export async function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(statusResponse.CODE[401]).json({
      error: true,
      message: 'Token not found',
    });
  } else {
    jwt.verify(token, config.AUTH.ACCESS_SECRET_KEY, (err, data) => {
      if (err) {
        /*** Either 'Invalid signature' or 'Jwt expired' ***/
        const errorMessage =
          err.message.charAt(0).toUpperCase() + err.message.slice(1);

        console.error(errorMessage);

        res.status(statusResponse.CODE[403]).json({
          error: true,
          message: errorMessage,
        });
      } else {
        req.session.user = jwtDataLists(data);
        next();
      }
    });
  }
}

/*** Renew jwt ***/
export async function refreshAuthToken(req: Request, res: Response) {
  const currentRefreshToken = req.body.refreshToken;

  /*** Find refresh token from database ***/
  const userSession = false; // await findUserByRefreshToken(currentRefreshToken);

  if (userSession) {
    /*** Generate new access and refresh token ***/
    const tokens = await createAuthToken(req, userSession);

    /*** Update users access and refresh token in database ***/
    // userSession.access_token = tokens.accessToken;
    // userSession.refresh_token = tokens.refreshToken;
    // await dbSource.manager.save(userSession);

    const userInfo = false; // await findUserById(userSession.user_id);
    if (userInfo) {
      /*** Update user's session details ***/
      req.session.user = jwtDataLists(userInfo);
    }

    res.status(statusResponse.CODE[200]).json({
      error: false,
      message: 'Token refreshed successfully',
      token: tokens,
    });
  } else {
    res.status(statusResponse.CODE[403]).json({
      error: true,
      message: 'Invalid signature',
    });
  }
}

/*** Generate encrypted value ***/
export async function encryptPassword(password: any) {
  return await bcrypt.hash(password, 10);
}

/*** Verify encrypted value ***/
export async function verifyPassword(password: any, userPassword: any) {
  if (!(await bcrypt.compare(password, userPassword))) {
    return false;
  }

  return true;
}

/*** Jwt decoder ***/
export async function jwtDecoder(req: Request, res: Response) {
  const accessToken = req.body.accessToken;
  const decodedToken = jwt.decode(accessToken);

  if (decodedToken) {
    res.status(statusResponse.CODE[200]).json({
      error: false,
      message: 'Token decoded',
      data: decodedToken,
    });
  } else {
    res.status(statusResponse.CODE[403]).json({
      error: true,
      message: 'Invalid signature',
    });
  }
}
`;
}

function generateIndexRouteContent() {
  return `/*** Setup router dependencies here ***/
import { Router } from 'express';
const routes = Router();

/*** Import all routes here ***/

/*** Use all imported routes here ***/

/*** Export routes ***/
export default routes;
`;
}

function generateIndexContent() {
  return `/*** Setup Index.ts dependencies here ***/
import * as createError from 'http-errors';
import config from './constants/config.constant.js';
import { SessionData } from 'express-session';
import * as session from 'express-session';
import express = require('express');
import cors = require('cors');
import multer = require('multer');

interface CustomSessionData extends SessionData {
  user?: object;
}

declare module 'express-session' {
  interface Session extends CustomSessionData {}
}

const port = config.SERVER.PORT || 3000;
const app = express();
const upload = multer();

app.use(
  cors({
    origin: config.SERVER.URL,
    methods: 'GET,POST,PUT',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: config.AUTH.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

/*** Import and use index.route.ts here ***/
import allRoutes from './routes/index.route';
app.use(upload.any(), allRoutes);

/*** Routes not found ***/
app.use((req: any, res: any, next: any) => {
  next(createError.NotFound());
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.send({
    error: true,
    status: err.status || 500,
    message: err.message,
  });
});

/*** Execute ***/
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
`;
}

function generateDsConfigContent() {
  return `/*** Setup data source dependencies here ***/
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../constants/config.constant.js';

/*** Export data source ***/
export const dbSource = new DataSource({
  type: config.DB.TYPE,
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USERNAME,
  password: config.DB.PASSWORD,
  database: config.DB.DBNAME,
  synchronize: false,
  logging: false,
  entities: ['src/models/*.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations_tb',
});

dbSource.initialize();
`;
}

function generateConfigConstantContent() {
  return `/*** Setup config constant ***/
import * as dotenv from 'dotenv';
dotenv.config();

/*** Add variables for config constant ***/
const config = {
  SERVER: {
    PORT: process.env.PORT,
    URL: process.env.URL,
  },
  DB: {
    TYPE: process.env.DATABASE_TYPE as any,
    HOST: process.env.DATABASE_HOST,
    PORT: process.env.DATABASE_PORT as any,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DBNAME: process.env.DATABASE_NAME,
  },
  AUTH: {
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  },
};

/*** Export config constant ***/
export default config;  
`;
}

function generateStatusCodesConstantContent() {
  return `/*** Add variables for status code constant ***/
const statusResponse = {
  CODE: {
    /*** Information responses ***/
    100: 100,
    101: 101,
    102: 102,
    103: 103,
    /*** Successful responses ***/
    200: 200,
    201: 201,
    202: 202,
    203: 203,
    204: 204,
    205: 205,
    206: 206,
    207: 207,
    208: 208,
    226: 226,
    /*** Redirection messages ***/
    300: 300,
    301: 301,
    302: 302,
    303: 303,
    304: 304,
    305: 305,
    306: 306,
    307: 307,
    308: 308,
    /*** Client error responses ***/
    400: 400,
    401: 401,
    402: 402,
    403: 403,
    404: 404,
    405: 405,
    406: 406,
    407: 407,
    408: 408,
    409: 409,
    410: 410,
    411: 411,
    412: 412,
    413: 413,
    414: 414,
    415: 415,
    416: 416,
    417: 417,
    418: 418,
    421: 421,
    422: 422,
    423: 423,
    424: 424,
    425: 425,
    426: 426,
    428: 428,
    429: 429,
    431: 431,
    451: 451,
    /*** Server error responses ***/
    500: 500,
    501: 501,
    502: 502,
    503: 503,
    504: 504,
    505: 505,
    506: 506,
    507: 507,
    508: 508,
    510: 510,
    511: 511,
  },
  NAME: {
    /*** Information responses ***/
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    /*** Successful responses ***/
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    /*** Redirection messages ***/
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    306: 'Unused',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    /*** Client error responses ***/
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I'm a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Content',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    /*** Server error responses ***/
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
  },
};

/*** Export config constant ***/
export default statusResponse;
`;
}

function generateDotEnvContent() {
  return `# Server port
PORT=3001
URL=http://localhost:3001

# Database creds
DATABASE_TYPE=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=

# Session secret key
SESSION_SECRET_KEY=

# Jwt secret keys
ACCESS_SECRET_KEY=
REFRESH_SECRET_KEY=

# Additional constants starts here and add it in ./src/constants/config.constant.ts

# Docker constants starts here and use it only in ./docker-compose.yml
API_IMAGE_NAME=
API_IMAGE_VER=`;
}

function generateDotGitignoreContent() {
  return `.DS_Store
.idea/
.vscode/
node_modules/
mysql/
build/
tmp/
temp/
.env`;
}

function generateDockerfileContent() {
  return `FROM node:19.6.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .`;
}

function generateDockerComposeContent() {
  return `version: '3.9'
services:

  api:
    image: \${API_IMAGE_NAME}:\${API_IMAGE_VER}
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    command: npm start
    ports:
      - 3001:3001
    volumes:
      - .:/app
      - '/app/node_modules'
    environment:
      DATABASE_HOST: dbsource
    depends_on:
      - dbsource

  dbsource:
    image: mysql:5.7.39
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_DATABASE:
      MYSQL_USER:
      MYSQL_PASSWORD:
      MYSQL_ROOT_PASSWORD:
      MYSQL_ALLOW_EMPTY_PASSWORD: yes
    command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    volumes:
      - ./mysql:/var/lib/mysql
`;
}

function generateDotDockerignoreContent() {
  return `node_modules
data-seed
.DS_Store
.gitignore`;
}
