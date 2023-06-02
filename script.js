`use strict`;

const slider = document.querySelector(".slider");
const outputNum = document.querySelector(".line-num");
const checkboxes = document.querySelectorAll(`input[type="checkbox"`);
const generateBtn = document.querySelector(".btn");
const passwordEl = document.querySelector(".title-password");
const elements = document.querySelectorAll(".bar");
const levelName = document.querySelector(".level-name");
const copy = document.querySelector(".copy-icon");

let checked = false;

const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

const helper = function (text, el, color) {
  levelName.textContent = text;
  el.style.border = `none`;
  el.style.backgroundColor = color;
};

slider.oninput = function () {
  const backgroundSize = (this.value * 100) / this.max + "% 100%";
  document.querySelector('input[type="range"]').style.backgroundSize =
    backgroundSize;

  outputNum.textContent = this.value;
  const number = +outputNum.value;

  elements.forEach((el, index) => {
    if (number > 15) {
      helper("STRONG", el, `#A4FFAF`);
    } else if (number >= 10 && index < 3) {
      helper(`MEDIUM`, el, `#F8CD65`);
    } else if (number >= 5 && index < 2) {
      helper(`WEAK`, el, `#FB7C58`);
    } else if (number < 5 && index < 1) {
      helper(`TOO WEAK!`, el, `#F64A4A`);
    } else {
      el.style.border = `1px solid white`;
      el.style.backgroundColor = `transparent`;
    }
  });
};
const arr = Array.from(checkboxes);

const generatePassword = function (length) {
  let password = "";
  const selectedCharSets = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => charSets[checkbox.id])
    .join("");
  if (selectedCharSets.length === 0) {
    return "";
  }
  Array.from({ length }).forEach(() => {
    password += selectedCharSets.charAt(
      Math.floor(Math.random() * selectedCharSets.length)
    );
  });
  return password;
};

generateBtn.addEventListener("click", function (e) {
  checkboxes.forEach((checkbox) => {
    const checkedCount = document.querySelectorAll(
      `input[type="checkbox"]:checked`
    ).length;

    if (checkedCount !== 0) {
      // document.querySelector(".copied").textContent = "";
      const generatedPassword = generatePassword(+outputNum.value);
      passwordEl.style.color = "#E6E5EA";
      passwordEl.innerHTML = generatedPassword;
    }
  });
});

copy.addEventListener("click", function () {
  if (!passwordEl.textContent || passwordEl.textContent === `P4$5W0rD!`) return;
  navigator.clipboard.writeText(passwordEl.textContent);
  document.querySelector(".copied").textContent = `COPIED`;
});
