import {h, append, Projector} from './mini-vdom';

let projector: Projector;

let todos = ['Buy Milk', 'Go vote'];

let handleKeyDown = (evt: KeyboardEvent) => {
  if (evt.which === 13) {
    let inputElement = evt.target as HTMLInputElement
    todos.push(inputElement.value);
    inputElement.value = '';
    projector.scheduleRender();
  }
}

let render = () => {
  return h('div', {}, [
    h('ul', {}, todos.map((todo, index) => {

      let handleClick = (evt: MouseEvent) => {
        evt.preventDefault();
        todos.splice(index, 1);
        projector.scheduleRender();
      }

      return h('li', {}, [
        h('button', { onclick: handleClick }, 'Done'),
        h('span', {}, todo)
      ])
    })),
    h('input', {onkeydown: handleKeyDown})
  ]);
};

document.addEventListener('DOMContentLoaded', () => {
  projector = append(document.body, render);
});