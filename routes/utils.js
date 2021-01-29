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

  function checkBody(body, modelKeys){
    let array1 = Object.keys(modelKeys).toString()
    let array2 = Object.keys(body).toString()
    return array1 === array2

  }

module.exports = { responseHandler, errorHandler, checkBody }