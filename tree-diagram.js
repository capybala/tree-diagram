'use strict';

var TreeDiagram = {

  indentTextToTreeText: function(indentText) {
    var tree = TreeDiagram.parseIndentText(indentText);
    var treeText = TreeDiagram.toTreeText(tree, false);
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

  toTreeText: function(tree, trim_root_edges) {
    return tree_to_tree_text(tree, trim_root_edges);
  }

};

function transform(text, trim_root_edges) {
  var tree = tab_text_to_tree(text);
  var tree_text = tree_to_tree_text(tree, trim_root_edges);

  return tree_text;
}

function tab_text_to_tree(tab_text) {
  var lines = tab_text.split('\n');

  var items = [];
  var i;

  for (i = 0; i < lines.length; i++) {
    var line = lines[i];

    var match = line.match(/^(\t*)(.*)$/);
    var tabs = match[1];
    var text = match[2];
    var indent = text === '' ? 0 : tabs.length;

    items.push({'indent': indent, 'text': text});
  }

  var prev_indent = -1;
  for (i = lines.length - 1; i >= 0; i--) {
    var item = items[i];
    if (item.text === '') {
      if (prev_indent == -1) {
        lines.pop();
      } else {
        item.indent = prev_indent;
      }
    } else {
      prev_indent = item.indent;
    }
  }


  var tree = {'depth': 0, 'children': []};
  var parent = tree;
  var prev_depth = 1;
  var prev = null;

  for (i = 0; i < lines.length; i++) {
    item = items[i];

    var depth = item.indent + 1;
    var node = {'depth': depth, 'text': item.text, 'children': []};

    if (depth == prev_depth) {
      // do nothing
    } else if (depth > prev_depth) {
      parent = prev;
    } else if (depth < prev_depth) {
      while (parent.depth >= depth) {
        parent = parent.parent;
      }
    }

    node.parent = parent;
    parent.children.push(node);
    prev = node;
    prev_depth = depth;
  }

  return tree;
}

function tree_to_tree_text(tree, trim_root_edges) {
  var tree_text = [];

  var node_to_tree_text = function(node, prefix) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];

      var child_prefix;

      if (child.text === '') {
        child_prefix = prefix + '│　';
      } else if (i == node.children.length - 1) {
        child_prefix = prefix + '└─';
      } else {
        child_prefix = prefix + '├─';
      }

      if (trim_root_edges) {
        child_prefix = child_prefix.substr(2);
      }
      tree_text.push(child_prefix + child.text);

      if (child.children.length > 0) {
        var new_prefix = i == node.children.length - 1 ? (prefix + '　　') : (prefix + '│　');
        node_to_tree_text(child, new_prefix);
      }
    }
  };

  node_to_tree_text(tree, '');

  return tree_text.join('\n');
}

if (typeof module !== 'undefined') {
  module.exports = {
    'TreeDiagram': TreeDiagram,
    'tab_text_to_tree': tab_text_to_tree
  };
}
