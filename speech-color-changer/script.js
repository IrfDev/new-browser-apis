var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;

var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral",
  "crimson",
  "cyan",
  "fuchsia",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lime",
  "linen",
  "magenta",
  "maroon",
  "moccasin",
  "navy",
  "olive",
  "orange",
  "orchid",
  "peru",
  "pink",
  "plum",
  "purple",
  "red",
  "salmon",
  "sienna",
  "silver",
  "snow",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "white",
  "yellow",
];

var recognition = new SpeechRecognition();

if (SpeechGrammarList) {
  var speechRecognitionList = new SpeechGrammarList();
  var grammar =
    "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector(".output");
var confidence = document.querySelector(".confidence-text");
var debugResult = document.querySelector(".debug-result");

var bg = document.querySelector("html");

var hints = document.querySelector(".hints");

var clickButton = document.querySelector(".click-me");

var gridChipOfColors = document.querySelector(".chip-of-colors");

var colorHTML = "";

var classStringColorChip =
  "capitalize duration-500 ease-out flex font-medium hover:ease-in hover:scale-105 hover:shadow-lg items-center justify-center py-2 rounded-md shadow-sm text-center transform transition-all w-full";

var isDark = (colorName) => {
  switch (colorName) {
    case "black":
    case "navy":
    case "navy":
    case "indigo":
    case "maroon":
    case "black":
    case "purple":
      return true;

    default:
      return false;
  }
};

var textColorClass = (colorName) => {
  return isDark(colorName) ? "text-white" : "text-black";
};

colors.forEach(function(colorName, index) {
  colorHTML +=
    `<span style="background-color:${colorName};" class="${classStringColorChip} ${textColorClass(
      colorName
    )}"> ` +
    colorName +
    " </span>";
});

hints.innerHTML =
  "Tap then say a color to change the background color of the app. Try:" + ".";

gridChipOfColors.innerHTML = colorHTML;

clickButton.onclick = function() {
  recognition.start();
  console.log("Ready to receive a color command.");
};

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;

  diagnostic.innerHTML = `Result received: <strong class="text-indigo-200 capitalize"> ${color} </strong> .`;

  bg.style.backgroundColor = color;

  confidence.innerHTML = `Confidence: ${"Confidence: " +
    event.results[0][0].confidence}`;

  console.log("Confidence: " + event.results[0][0].confidence, event.results);
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
};

recognition.onerror = function(event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
};
