const express = require('express');
const router = express.Router();
const Drone = require('./../models/Drone.model')
// require the Drone model here


// Iteration #2: List the drones
router.get('/drones', (req, res, next) => {
  Drone
    .find()
    .then(drones => {

      res.render('drones/list', { drones: drones })
    })
    .catch(err => console.log(err))
})


// Iteration #3: Add a new drone
router.get('/drones/create', (req, res, next) => {

  res.render('drones/create-form')

});


// Iteration #3: Add a new drone
router.post('/drones/create', (req, res, next) => {

  const { name, propellers, maxSpeed } = req.body

  Drone
    .create({ name, propellers, maxSpeed })
    .then(drone => {
      res.redirect(`/drones`)
    })
    .catch(err => console.log(err))
});


// Iteration #4: Update the drone
router.get('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params

  Drone
    .findById(id)
    .then(drone => {
      res.render('drones/update-form', drone)
    })
    .catch(err => console.log(err))
});

//atencion, : usar para req.params
router.post('/drones/:id/edit', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body
  const { id } = req.params
  console.log({ id })
  console.log({ name, propellers, maxSpeed })
  Drone
    .findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => res.redirect(`/drones`))
    .catch(err => console.log(err))

});



// Iteration #5: Delete the drone
router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params

  Drone
    .findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch(err => console.log(err))

});

module.exports = router;
