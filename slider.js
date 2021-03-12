const [MIN, MAX] = [0, 255];

const colors = [
  [255, 0, 0],
  [255, 125, 0],
  [255, 255, 0],
  [125, 255, 0],
  [0, 255, 0],
  [0, 255, 125],
  [0, 255, 255],
  [0, 125, 255],
  [0, 0, 255],
];

const [COLOR, BACKGROUND] = ['color', 'background'];

const slider = $('#slider');
const text = $('#text');
const sliderRadio = $('input[type=radio][name=slider]');

let mode = COLOR;
let [r, g, b] = colors[0]

const changeColorsOnCurrent = (r, g, b) => {
  const rgb = `rgb(${r}, ${g}, ${b})`;

  if (mode === COLOR) {
    text.css({color: rgb});
  } else {
    document.body.style.backgroundColor = rgb;
  }
}

$(document).ready(() => {
  changeColorsOnCurrent(r, g, b);
})

sliderRadio.checkboxradio();

sliderRadio.change(function() {
  mode = this.value;
  changeColorsOnCurrent(r, g, b)
})

slider.slider({
  min: MIN,
  max: MAX,
  value: 0,
  slide: (event, ui) => {
    const norma = ui.value / MAX; // 0.0 ... 1.0
    const offset = (colors.length - 1) * norma; // 0.0 ... (colors.length - 1).0
    const index = Math.min(Math.floor(offset), colors.length - 2); // 0 ... (colors.length - 2)

    const currentColorPoint = colors[index];
    const nextColorPoint = colors[index + 1];

    const deltaColor = offset - index;

    const colorComponent = (from, to, delta) => {
      return parseInt(from + (to - from) * delta);
    };

    [r, g, b] = [0, 1, 2].map(i => colorComponent(currentColorPoint[i], nextColorPoint[i], deltaColor));

    changeColorsOnCurrent(r, g, b);
  },
});

slider.css({
  background: `linear-gradient(to right ${colors.reduce((acc, color) => {
    const [r, g, b] = color;
    return acc + `, rgb(${r}, ${g}, ${b})`;
  }, '')})`
});