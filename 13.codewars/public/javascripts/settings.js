CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  theme: "blackboard",
  mode: "javascript",
  autoCloseBrackets: true,
  tapSize: 2,
  matchBrackets: true,
});
