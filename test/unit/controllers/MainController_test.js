'use strict';

var chai = require('chai')
  , expect = chai.expect;

var MainControllerModule = require('../../../app/scripts/controllers/MainController.js');

describe('The MainController', function() {
  var MainController;

  beforeEach(function() {
    MainController = new MainControllerModule();
  });

  it('should have some data initially', function() {
    var data = MainController.data();
    expect(data.length).to.equal(2);
    expect(data[0].title).to.equal('test123');
  });
});
