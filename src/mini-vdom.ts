export interface VNode {
  content: string;
}

export let h = (content: string): VNode => {
  return {
    content: content
  };
}

export let append = (element: HTMLElement, render: () => VNode) => {

  // Temporary dummy implementation
  element.textContent = render().content;

  return {};
}





// Skeleton of the function that we are going to use.
// let diffAndPatch = (newTree: VNode, oldTree: VNode) => {
//   // Adopt previous domNode
//
//   // handle text content
//
//   let oldChildren = oldTree.content;
//     let newChildren = newTree.content;
//     let oldIndex = 0;
//     let newIndex = 0;
//     while (newIndex < newChildren.length) {
//       let oldChild = oldChildren[oldIndex];
//       let newChild = newChildren[newIndex];
//
//       // Same
//
//       // Different, nodes were removed
//
//       // Different, new node was inserted
//     }
//     // remove remaining nodes that are no longer present
// };