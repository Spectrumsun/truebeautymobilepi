exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500).json({ message: 'error', errorDetails });
};


exports.productionErrors = (err, req, res, next) => {
  const errmessage = err.message;
  res.status(err.status || 500).json({
    message: 'error',
    errmessage,
  });
};
