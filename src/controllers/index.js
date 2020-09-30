const index = (req, res) => {
  return res.status(200).json({
    name: 'CC RESTful API',
    version: '1.0'
  })
}

module.exports = { index }
