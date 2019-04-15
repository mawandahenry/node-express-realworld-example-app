var router = require('express').Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var Cat     = mongoose.model('Category');

// The route responsible for getting all the categories in the database
router.get('/', function(req, res, next) {
  Cat.find().distinct('name').then(function(category){
    return res.json({Categories: category});
  }).catch(next);
});

//The route responsible for adding a new category. it returns the added category in json form
router.post('/', function(req, res, next) {
  const Cat_1 = new Cat(req.body.category);
  return Cat_1.save().then(function(){
    return res.json({category: Cat_1.getCategories()});
  }).catch(next);
});
//The route for deleting a category from the database
router.delete('/', function(req, res, next){
  Cat.remove({name: req.query.name}).then(
    function(){
      return res.json({
        message: `successfully removed ${req.query.name}`
      })
    }
  ).catch(function(){
    return res.json({
      err: "Opppps something wrong has occured"
    })
  });

});

//this route is responsible for aditing categories in the database
router.put('/', function(req, res, next){
const names = req.body.category.name;
const sub  = req.body.category.subCategory;
Cat.findOneAndUpdate({ name: names }, { name: names,subCategory:sub }).then(function(err, res){
  if(err){
    return res.json({
      err: "updating could not occur"
    })
  }
  return res.json({
    DocsMatched: res.n,
    DocsModified:res.nModified

  });
}).catch(function(){
  return res.json({
    er: "query not executed"
  })
});

})

module.exports = router;
