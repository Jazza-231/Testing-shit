let input = "";

const root = document.documentElement;

const buttons = document.querySelectorAll("button");
const output = document.querySelector(".output");

const switchEl = document.querySelector(".switch");

const css = {
  dark: {
    back: "rgb(18, 18, 18)",
    content: "rgb(58, 58, 58)",
    hover: "rgb(48, 48, 48)",
    highlight: "white",
  },
  light: {
    back: "rgb(255, 255, 255)",
    content: "rgb(180, 180, 180)",
    hover: "rgb(200, 200, 200)",
    highlight: "black",
  },
};

const allowedInOutput = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "/",
  "*",
];

const keypresses = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "/",
  "*",
  "=",
  "c",
  "Enter",
];

function evaluate(input) {
  let cleaned = "";
  for (let i = 0; i < input.length; i++) {
    if ((input[i] === "0" && input[i - 1] > 0) || input[i] !== "0") {
      cleaned += input[i];
    }
  }

  return eval(cleaned) === undefined ? "" : eval(cleaned);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (allowedInOutput.includes(button.innerText)) input += button.innerText;
    else if (button.innerText === "C") input = "";
    else if (button.innerText === "=") input = evaluate(input);
    output.textContent = input;
  });
});

switchEl.addEventListener("click", () => {
  if (switchEl.getAttribute("state") === "on") {
    {
      switchEl.setAttribute("state", "off");
      changeCSS("light");
    }
  } else {
    switchEl.setAttribute("state", "on");
    changeCSS("dark");
  }
});

function changeCSS(mode) {
  root.style.setProperty("--back", css[mode].back);
  root.style.setProperty("--content", css[mode].content);
  root.style.setProperty("--hover", css[mode].hover);
  root.style.setProperty("--highlight", css[mode].highlight);
}

document.addEventListener("keypress", (e) => {
  if (keypresses.includes(e.key)) {
    if (allowedInOutput.includes(e.key)) input += e.key;
    else if (e.key === "c") input = "";
    else if (e.key === "=" || "Enter") input = evaluate(input);
    output.textContent = input;
  }
});
