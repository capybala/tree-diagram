'use strict';

(function($) {

  var convert = function() {
    var text = srcTextarea.val().replace(/^[\s　]+/, '').replace(/[\s　]+$/, '');
    if (text === prevText) {
      return;
    }
    destTextarea.val(TreeDiagram.indentTextToTreeText(text));
    prevText = text;
  };

  var onTab = function($textarea, e) {
    $textarea.selection('replace', {text: '\t', caret: 'end'});
    e.preventDefault();
  };

  var onEnter = function($textarea, e) {
    var text = $textarea.val();
    var caretPos = $textarea.selection('getPos').start;

    // When the caret is at the tail of line, text.charAt(caretPos) == '\n'
    // So start finding '\n' from caretPos - 1
    // + 1 returns right index of '\n' when found, or returns 0 when not found
    var startLinePos = text.lastIndexOf('\n', caretPos - 1) + 1;
    var line = text.substr(startLinePos, caretPos - startLinePos);

    var match = line.match(/^([ \t　]*)/);
    var tabs = match[1];

    $textarea.selection('replace', {text: '\n' + tabs, caret: 'end'});
    e.preventDefault();
  };

  var prevText = null;
  var srcTextarea = $('#src_text');
  var destTextarea = $('#dest_text');

  srcTextarea.keyup(convert);
  srcTextarea.keydown(function(e) {
    if (e.which == 9) {
      // Tab
      onTab($(this), e);
    } else if (e.which == 13) {
      // Enter
      onEnter($(this), e);
    }
  });

  destTextarea.focus(function() {
    $(this).select();
    // for Chrome, see: http://stackoverflow.com/questions/5797539/jquery-select-all-text-from-a-textarea
    $(this).one('mouseup', function(e) {
      e.preventDefault();
    });
  });

  srcTextarea.val('好きな果物\n' +
                  '\tりんご\n' +
                  '\tみかん');
  convert();

})(jQuery);
