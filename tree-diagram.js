'use strict';

var TreeDiagram = {

  indentTextToTreeText: function(indentText, stripRootEdges) {
    var tree = TreeDiagram.parseIndentText(indentText);
    var treeText = TreeDiagram.toTreeText(tree, stripRootEdges);
    return treeText;
  },

  parseIndentText: function(indentText) {
    var lines = indentText.split('\n');
    var items = [];
    var i;

    for (i = 0; i < lines.length; i++) {
      var line = lines[i];

      var match = line.match(/^([ \t　]*)(.*)$/);
      var tabs = match[1];
      var text = match[2];
      var indent = text === '' ? 0 : tabs.length;

      items.push({'indent': indent, 'text': text});
    }

    var tree = {'children': []};
    var stack = [{'node': tree, 'indent': -1}];

    for (i = 0; i < lines.length; i++) {
      var item = items[i];
      var parent = stack.pop();
      while (parent.indent >= item.indent) {
        parent = stack.pop();
      }

      var node = {'text': item.text, 'children': []};
      parent.node.children.push(node);
      stack.push(parent);
      stack.push({'node': node, 'indent': item.indent});
    }

    return tree;
  },

  toTreeText: function(tree, stripRootEdges) {
    var treeTextLines = [];

    var nodeToTreeText = function(node, prefix) {
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];

        var childPrefix;

        if (child.text === '') {
          childPrefix = prefix + '│　';
        } else if (i == node.children.length - 1) {
          childPrefix = prefix + '└─';
        } else {
          childPrefix = prefix + '├─';
        }

        if (stripRootEdges) {
          childPrefix = childPrefix.substr(2);
        }
        treeTextLines.push(childPrefix + child.text);

        if (child.children.length > 0) {
          var newPrefix;
          if (i == node.children.length - 1) {
            newPrefix = prefix + '　　';
          } else {
            newPrefix = prefix + '│　';
          }
          nodeToTreeText(child, newPrefix);
        }
      }
    };

    nodeToTreeText(tree, '');

    return treeTextLines.join('\n');
  }

};

if (typeof module !== 'undefined') {
  module.exports = {
    'TreeDiagram': TreeDiagram
  };
}
