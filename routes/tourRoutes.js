const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkID)

// Create a checkbody middleware
// Check if body contains price and name property
// if not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
