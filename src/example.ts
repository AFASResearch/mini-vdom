import {h, append} from './mini-vdom';

let render = () => {
  return h('Hello...');
};

document.addEventListener('DOMContentLoaded', () => {
  let projector = append(document.body, render);
});