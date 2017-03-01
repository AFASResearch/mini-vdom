export interface Projector {
  scheduleRender: () => void;
}

export interface VNodeProperties {
  onkeydown?: (evt: KeyboardEvent) => void;
}

export interface VNode {
  tagName: string;
  properties: VNodeProperties;
  content: string | VNode[] | undefined;
  element?: HTMLElement;
}

export let h = (tagName: string, properties: VNodeProperties, content?: string | VNode[]): VNode => {
  return {
    tagName, properties, content
  };
}

export let append = (element: HTMLElement, render: () => VNode): Projector => {
  let lastVnodeTree = render();
  create(lastVnodeTree);
  element.appendChild(lastVnodeTree.element!);
  return {
    scheduleRender: () => {
      requestAnimationFrame(() => {
        let currentVNodeTree = render();
        diffAndPatch(currentVNodeTree, lastVnodeTree);
        lastVnodeTree = currentVNodeTree;
      });
    }
  };
}

let create = (vnode: VNode) => {
  let result = document.createElement(vnode.tagName);
  vnode.element = result;
  if (typeof vnode.content === 'string') {
    result.textContent = vnode.content;
  } else if (vnode.content !== undefined) {
    vnode.content.forEach(childNode => {
      create(childNode);
      result.appendChild(childNode.element!);
    });
  }
  if (vnode.properties.onkeydown) {
    result.onkeydown = vnode.properties.onkeydown;
  }
}

let diffAndPatch = (newTree: VNode, oldTree: VNode) => {
  // Adopt previous domNode
  let element = newTree.element = oldTree.element!;

  // handle text content
  if (typeof newTree.content === 'string') {
    if (oldTree.content !== newTree.content) {
      element.textContent = newTree.content;
    }
  } else if (Array.isArray(newTree.content)) {
    if (!Array.isArray(oldTree.content)) {
      throw new Error('Not supported');
    }
    let oldChildren = oldTree.content;
    let newChildren = newTree.content;
    let oldIndex = 0;
    let newIndex = 0;
    while (newIndex < newChildren.length) {
      let oldChild = oldChildren[oldIndex];
      let newChild = newChildren[newIndex];

      // Same
      if (same(newChild, oldChild)) {
        diffAndPatch(newChild, oldChild);
        oldIndex ++;
      } else {
        // TODO: Different, nodes were removed

        // Different, new node was inserted
        create(newChild);
        element.insertBefore(newChild.element!, oldChild ? oldChild.element! : null);
      }
      newIndex ++;
    }
    // remove remaining nodes that are no longer present
  }
};

let same = (newChild: VNode, oldChild: VNode | undefined) => oldChild && newChild.tagName === oldChild.tagName;