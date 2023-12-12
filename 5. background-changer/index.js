/*

  다음과 같은 조건을 만족하는 화면을 만들어 주세요!

  📌 버튼 클릭시 랜덤한 HEX CODE가 배경 색으로 변경되어야 합니다.
  📌 현재 HEX CODE가 <p> 태그의 텍스트로 표시되어야 합니다.

*/

const wrapper = document.querySelector(".wrapper");
const button = document.querySelector("button");
const text = document.querySelector("p");
const hex = ["a", "b", "c", "d", "e", "f", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const makeHexCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    code += hex[randomIndex];
  }
  return `#${code}`;
};

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

class Hex {
  constructor(x) {
    this.x = x;
  }
  code() {
    return `${this.x}`;
  }
}

const a = new Color(123, 123, 123);
const b = new Hex(makeHexCode());

// console.log(a.rgb());
// console.log(b.code());

button.addEventListener("click", () => {
  wrapper.style.backgroundColor = makeHexCode();
  text.innerText = `HEX CODE: ${makeHexCode()}`;
});
