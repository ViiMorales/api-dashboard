import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';



const Users = new Mongo.Collection('users');
const Accounts = new Mongo.Collection('accounts');
const Transfers = new Mongo.Collection('transfers');


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('users', function() {
  return Users.find();
});

Meteor.publish('accounts', function() {
  return Accounts.find();
});

Meteor.publish('transfers', function() {
  return Transfers.find();
});


