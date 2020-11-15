const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let GamePost = {};

const covertID = mongoose.Types.ObjectIdl
const setTitle = (title)=> _.escape(title).trim();
const set