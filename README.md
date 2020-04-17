# Personnel Service ![CI](https://github.com/Nemocnice-Kvetoslava-Maradsalama/personnel-svc/workflows/CI/badge.svg)

This service is a part of service infrastructure built as a semestral project.
This service handles user authentication as well as hospital personnel.

## Prerequisites

For development, typescript CLI needs to be installed globally.
```shell
npm install -g typescript
```

Access to a running Eureka service needs to be configured in 'config/eureka.ts'.

## Local Development

Typescript files (/src/) need to be compiled to Javascript first (/lib/). Server runs the Javascript version.

To compile Typescript files into Javascript, rebuild and run the containers:
```shell
npm run exec
```

### Additionally:

To compile Typescript files into Javascript: 
```shell
npm run build
```

To start local server (this is executed as a part of the container workflow): 
```shell
npm start
```

## Running the tests

Run 
```shell
npm test
```

## Authors

* **Martin Hula** - *Initial work* - [anakreon](https://github.com/anakreon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details