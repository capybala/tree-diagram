(function($) {

  var convert = function() {
    destTextarea.val(
      TreeDiagram.indentTextToTreeText(srcTextarea.val())
    );
  };

  var srcTextarea = $('#src_text');
  var destTextarea = $('#dest_text');

  srcTextarea.keyup(convert);

  srcTextarea.val('好きな果物\n' +
                  '　りんご\n' +
                  '　みかん');
  convert();

})(jQuery);
