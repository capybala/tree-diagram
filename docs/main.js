"use strict";

(function ($) {
  var convert = function () {
    var text = srcTextarea
      .val()
      .replace(/^[\s　]+/, "")
      .replace(/[\s　]+$/, "");
    if (text === prevText) {
      return;
    }
    destTextarea.val(TreeDiagram.indentTextToTreeText(text));
    prevText = text;
  };

  var onTab = function ($textarea, e) {
    $textarea.selection("replace", { text: "\t", caret: "end" });
    e.preventDefault();
  };

  var onEnter = function ($textarea, e) {
    var text = $textarea.val();
    var caretPos = $textarea.selection("getPos").start;

    // When the caret is at the tail of line, text.charAt(caretPos) == '\n'
    // So start finding '\n' from caretPos - 1
    // + 1 returns right index of '\n' when found, or returns 0 when not found
    var startLinePos = text.lastIndexOf("\n", caretPos - 1) + 1;
    var line = text.substr(startLinePos, caretPos - startLinePos);

    var match = line.match(/^([ \t　]*)/);
    var tabs = match[1];

    $textarea.selection("replace", { text: "\n" + tabs, caret: "end" });
    e.preventDefault();
  };

  var prevText = null;
  var srcTextarea = $("#src_text");
  var destTextarea = $("#dest_text");
  var copyButton = $("#copy_button");

  srcTextarea.on("keyup", convert);
  srcTextarea.on("keydown", function (e) {
    if (e.which == 9) {
      // Tab
      onTab($(this), e);
    } else if (e.which == 13) {
      // Enter
      onEnter($(this), e);
    }
  });

  destTextarea.on("focus", function () {
    $(this).trigger("select");
    // for Chrome, see: http://stackoverflow.com/questions/5797539/jquery-select-all-text-from-a-textarea
    $(this).one("mouseup", function (e) {
      e.preventDefault();
    });
  });

  copyButton.on("click", () => {
    window.navigator.clipboard.writeText(destTextarea.val());
    copyButton.text("Copied!");
  });

  copyButton.on("blur", () => {
    copyButton.text("Copy");
  });
  copyButton.on("mouseleave", () => {
    copyButton.text("Copy");
  });

  srcTextarea.val(
    "テキストエリアに\n" +
      "\tタブや\n" +
      "\t\tスペースで\n" +
      "\t整形したテキストを書くと、\n" +
      "\t\tDendrogramエリアに\n" +
      "\t\t樹形図が表示されます。"
  );
  convert();
})(jQuery);
