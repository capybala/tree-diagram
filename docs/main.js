"use strict";

window.addEventListener("DOMContentLoaded", () => {
  let prevSrcText = null;
  const srcTextarea = document.querySelector("#src_text");
  const destTextarea = document.querySelector("#dest_text");
  const copyButton = document.querySelector("#copy_button");

  const convert = () => {
    const srcText = srcTextarea.value
      .replace(/^[\s　]+/, "")
      .replace(/[\s　]+$/, "");

    if (srcText === prevSrcText) {
      return;
    }
    destTextarea.value = TreeDiagram.indentTextToTreeText(srcText);
    prevSrcText = srcText;
  };

  const insertText = (textarea, text) => {
    const value = textarea.value;
    const selectionStart = textarea.selectionStart;
    const newValue =
      value.substring(0, selectionStart) +
      text +
      value.substring(textarea.selectionEnd);
    textarea.value = newValue;
    const newCaretPos = selectionStart + text.length;
    textarea.setSelectionRange(newCaretPos, newCaretPos);
  };

  const onTab = (textarea) => {
    insertText(textarea, "\t");
  };

  const onEnter = (textarea) => {
    const text = textarea.value;
    const caretPos = textarea.selectionStart;

    // When the caret is at the tail of line, text.charAt(caretPos) == '\n'
    // So start finding '\n' from caretPos - 1
    // + 1 returns right index of '\n' when found, or returns 0 when not found
    const startLinePos = text.lastIndexOf("\n", caretPos - 1) + 1;
    const line = text.substr(startLinePos, caretPos - startLinePos);

    const match = line.match(/^([ \t　]*)/);
    const tabs = match[1];

    insertText(textarea, "\n" + tabs);
  };

  srcTextarea.addEventListener("keyup", convert);
  srcTextarea.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab(e.target);
    } else if (e.keyCode === 13) {
      // Enter
      // Use e.keyCode instead of e.key to prevent wrong detemination when using IME (See: https://qiita.com/ledsun/items/31e43a97413dd3c8e38e)
      e.preventDefault();
      onEnter(e.target);
    }
  });

  destTextarea.addEventListener("focus", (e) => {
    e.target.select();
  });

  copyButton.addEventListener("click", () => {
    window.navigator.clipboard.writeText(destTextarea.value);
    copyButton.textContent = "Copied!";
  });

  const resetButtonLabel = () => {
    copyButton.textContent = "Copy";
  };
  copyButton.addEventListener("blur", resetButtonLabel);
  copyButton.addEventListener("mouseleave", resetButtonLabel);

  srcTextarea.value = `Text indented with
\ttabs
\t\tor spaces
\twill be converted to
\t\tthe dendrogram`;
  convert();
});
