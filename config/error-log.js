module.exports = (error, req, res, next) => {
  console.error(error.stack)
  res.status(error.status || 500); 
  res.json({
    error: {
      message: error.message,
      friendly_message: error.friendly_message || 'Ops, houve um erro!'
    }
  })
}