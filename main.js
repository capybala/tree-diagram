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

  srcTextarea.val('好きな果物\n' +
                  '　りんご\n' +
                  '　みかん');
  convert();

})(jQuery);
