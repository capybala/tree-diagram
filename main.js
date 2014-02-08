'use strict';

(function($) {

  var prevText = null;
  var convert = function() {
    var text = srcTextarea.val().replace(/^[\s　]+/, '').replace(/[\s　]+$/, '');
    if (text === prevText) {
      return;
    }
    destTextarea.val(TreeDiagram.indentTextToTreeText(text));
    prevText = text;
  };

  var srcTextarea = $('#src_text');
  var destTextarea = $('#dest_text');

  srcTextarea.keyup(convert);
  destTextarea.focus(function() {
    $(this).select();
    // for Chrome, see: http://stackoverflow.com/questions/5797539/jquery-select-all-text-from-a-textarea
    $(this).one('mouseup', function(e) {
      e.preventDefault();
    });
  });

  srcTextarea.val('好きな果物\n' +
                  '　りんご\n' +
                  '　みかん');
  convert();

})(jQuery);
