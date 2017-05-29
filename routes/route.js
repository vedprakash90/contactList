const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/contacts', (req, res, next) => {
  Contact.find((err, data) => {
    if (err) {
      console.log("retrieving issue" + err)
    }
    else
      res.json(data);
  })

});
router.post('/contacts', (req, res, next) => {
  console.log(req.body);
  let newcontact = new Contact(
  {
    first_name : req.body.first_name,
    last_name :req.body.last_name,
    phone : req.body.phone

  });
  console.log(newcontact.first_name);
  newcontact.save((err, contact) => {
    if (err) {
      console.log("issue in ading contacts" + err);
      //res.json(msg:'Failed to add contacts');
      res.status(400).json('failed to add contacts');

    }
    else {
      console.log('contacts added succesfully');
      res.status(201).json('contacts added succesfully');

    }
  });

});
router.delete('/contacts/:id', (req, res, next) => {
  // res.re("Retrieving contact details");
  Contact.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      console.log("deleted succcesfully");
      res.json(result);
    

    }
  });
});
module.exports = router;