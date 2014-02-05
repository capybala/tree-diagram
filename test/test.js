'use strict';

var assert = require('assert');


var treeDiagram = require('../tree-diagram.js');
var TreeDiagram = treeDiagram.TreeDiagram;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});

describe('tab_text_to_tree', function() {
  it('should parse simple indent', function() {
    assert.deepEqual({
      'children': [{
        'text': 'りんご',
        'children': [{
          'text': 'みかん',
          'children': []
        }]
      }]
    },
    TreeDiagram.parseIndentText(
      'りんご\n' +
      '\tみかん'
    ));
  });

  it('should parse same indent', function() {
    assert.deepEqual({
      'children': [{
        'text': 'りんご',
        'children': []
      },
      {
        'text': 'いちご',
        'children': []
      },
      {
        'text': 'みかん',
        'children': []
      }]
    },
    TreeDiagram.parseIndentText(
      'りんご\n' +
      'いちご\n' +
      'みかん'
    ));
  });

  it('should parse de-indent', function() {
    assert.deepEqual({
      'children': [{
        'text': 'りんご',
        'children': [{
          'text': 'いちご',
          'children': []
        }]
      },
      {
        'text': 'みかん',
        'children': []
      }]
    },
    TreeDiagram.parseIndentText(
      'りんご\n' +
      '\tいちご\n' +
      'みかん'
    ));
  });
});
