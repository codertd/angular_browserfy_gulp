'use strict';

var chai = require('chai')
  , expect = chai.expect;

var MainControllerModule = require('../../../app/js/controllers/MainController.js');

describe('The MainController', function() {
  var MainController;

  beforeEach(function() {
    MainController = new MainControllerModule();
  });

  it('should have some todos initially', function() {
    var data = MainController.getData();
    expect(todos.length).to.equal(4);
    expect(todos[0].title).to.equal('Buy milk');
  });
});
