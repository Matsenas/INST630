// Two-column scrollytelling: text steps scroll on the left, a sticky image on the right
// crossfades to match the active step. `scrollama` is a global from the <script> tag in index.html.

const steps = [
  {
    title: 'Step one',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.',
    image: 'https://placehold.co/900x1100/2f4858/ffffff?text=Step+1',
    alt: 'Placeholder image for step one',
  },
  {
    title: 'Step two',
    text: 'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum.',
    image: 'https://placehold.co/900x1100/33658a/ffffff?text=Step+2',
    alt: 'Placeholder image for step two',
  },
  {
    title: 'Step three',
    text: 'Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum.',
    image: 'https://placehold.co/900x1100/86bbd8/1d1d1f?text=Step+3',
    alt: 'Placeholder image for step three',
  },
  {
    title: 'Step four',
    text: 'Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo.',
    image: 'https://placehold.co/900x1100/f6ae2d/1d1d1f?text=Step+4',
    alt: 'Placeholder image for step four',
  },
];

const stepsEl = document.querySelector('.scrolly__steps');
const figureEl = document.querySelector('.scrolly__figure');

stepsEl.innerHTML = steps
  .map(({ title, text }, i) => `
    <article class="step" data-step="${i}">
      <h2>${title}</h2>
      <p>${text}</p>
    </article>`)
  .join('');

figureEl.innerHTML = steps
  .map(({ image, alt }, i) => `<img src="${image}" alt="${alt}" data-step="${i}" loading="lazy">`)
  .join('');

const stepEls = [...stepsEl.querySelectorAll('.step')];
const imageEls = [...figureEl.querySelectorAll('img')];

const activate = (index) => {
  stepEls.forEach((el, i) => el.classList.toggle('is-active', i === index));
  imageEls.forEach((el, i) => el.classList.toggle('is-active', i === index));
};

activate(0);

scrollama()
  .setup({ step: '.scrolly .step', offset: 0.5 })
  .onStepEnter(({ index }) => activate(index));
