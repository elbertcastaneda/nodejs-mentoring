import winston, { addColors, createLogger, format, transports } from 'winston';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `[${timestamp}][${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

class Logger {
  private logger: winston.Logger;

  constructor() {
    const transport = new transports.Console({
      format: formatter,
    });
    this.logger = createLogger({
      level: 'trace',
      levels: customLevels.levels,
      transports: [transport],
    });
    addColors(customLevels.colors);
  }

  setLevel(level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal') {
    this.logger.level = level;
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

const logger = new Logger();

export default logger;
