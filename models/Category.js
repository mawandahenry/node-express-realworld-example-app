var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//category schema definition
var Cat = new mongoose.Schema({
  id: {type:mongoose.Schema.Types.ObjectId},
  name: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"]},
  subCategory: { type: String }
}, {timestamps: true});
Cat.plugin(uniqueValidator, {message: "category is already in existance"});
Cat.methods.getCategories = function(){
  return {
    categoryName: this.name,
    subCategory: this.subCategory
  }
}
Cat.methods.checkCat =(cat)=> {
  return this.name === cat || this.subCategory === cat;
}
mongoose.model('Category', Cat);
