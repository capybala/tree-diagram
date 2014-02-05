'use strict';

var assert = require('assert');

var TreeDiagram = require('../tree-diagram.js').TreeDiagram;

describe('TreeDiagram', function() {
  describe('#parseIndentText', function() {
    it('should parse simple indent', function() {
      assert.deepEqual({
        'children': [{
          'text': 'りんご',
          'children': [{
            'text': 'みかん',
            'children': [{
              'text': 'いちご',
              'children': []
            }]
          }]
        }]
      },
      TreeDiagram.parseIndentText(
        'りんご\n' +
        '\tみかん\n' +
        '\t  いちご'
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
        '　いちご\n' +
        'みかん'
      ));
    });
  });

  describe('#toTreeText', function() {
    it('should stringify simple tree', function() {
      assert.equal(
        TreeDiagram.toTreeText({
          'children': [{
            'text': 'りんご',
            'children': [{
              'text': 'みかん',
              'children': [{
                'text': 'いちご',
                'children': []
              }]
            }]
          }]
        }),
        '└─りんご\n' +
        '　　└─みかん\n' +
        '　　　　└─いちご'
      );
    });

    it('should stringify simple tree without root edge', function() {
      assert.equal(
        TreeDiagram.toTreeText({
          'children': [{
            'text': 'りんご',
            'children': [{
              'text': 'みかん',
              'children': [{
                'text': 'いちご',
                'children': []
              }]
            }]
          }]
        }, true),
        'りんご\n' +
        '└─みかん\n' +
        '　　└─いちご'
      );
    });
  });
});
