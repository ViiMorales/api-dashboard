import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import {moment} from 'moment';

import './main.html';

Meteor.subscribe('users');
Meteor.subscribe('accounts');
Meteor.subscribe('transfers');
const Users = new Mongo.Collection('users');
const Accounts = new Mongo.Collection('accounts');
const Transfers = new Mongo.Collection('transfers');

Number.prototype.formatMoney = function(c, d, t){
  var n = this, 
  c = isNaN(c = Math.abs(c)) ? 2 : c, 
  d = d == undefined ? "." : d, 
  t = t == undefined ? "," : t, 
  s = n < 0 ? "-" : "", 
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
  j = (j = i.length) > 3 ? j % 3 : 0;
 return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Template.body.onCreated(function helloOnCreated() {
  // counter starts at 0
  // this.counter = new ReactiveVar(0);
  // console.log(Users);
  
});

Template.body.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  users() {
    return Users.find();
  },
  accounts(userID){
    if(!userID){
      return;
    }
    let mongoID = new Mongo.ObjectID(userID._str);

    return Accounts.find({"owner":mongoID});
  },
  accountsGetNumber(accountID){
    if(!accountID){
      return;
    }
    let mongoID = new Mongo.ObjectID(accountID._str);
    let account = Accounts.findOne({"_id":mongoID})
    return account.number;
  },
  transfers() {
    return Transfers.find();
  },
  toCurrency(amount){
    return (amount).formatMoney(2, '.', ',');
  },
  formatDate(str){
    var date = moment(str).locale('es').format("Do MMMM YYYY");
    var time = moment(str).locale('es').format("h:mm:ss a");
    return `${date}<br>${time}`;
  },
});

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
