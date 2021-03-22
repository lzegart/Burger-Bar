const express = require('express');
const burger = require('../models/burger');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect("/burgers")  
});

router.get("/burgers", (req, res) => {
   burger.selectAll((burgerData) => {
     console.log(burgerData)
     res.render("index", {burger_data: burgerData})
  });
})
  
  router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name'], [req.body.burger_name], (result) => {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    console.log('condition', condition);
  
    burger.updateOne(
      {
        devoured: req.body.devoured,
      },
      condition,
      (result) => {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
  
  module.exports = router;