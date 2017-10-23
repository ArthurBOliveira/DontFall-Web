var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://user:123123@ds125335.mlab.com:25335/dont-fall';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://user:123123@ds125335.mlab.com:25335/dont-fall';
}