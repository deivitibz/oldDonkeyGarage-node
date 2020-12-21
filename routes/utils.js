function responseHandler(req, res, message) {
    res.status(201);
    return {
      status: 201,
      data: {
        message: message,
        body: req.body,
        headers: req.headers,
      }
    }
    res.json();
  }
  
  function errorHandler(req, res, message) {
    res.status(404);
  
    return {
      status: 404,
      error: message,
      body: req.body,
      headers: req.headers,
    };
  }

module.exports = { responseHandler, errorHandler }