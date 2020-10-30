import LinkedList from '../linked-list/LinkedList';

export default class Stack {
  constructor() {
    /**
     * The stack behaves like a linked list, with the difference that
     * only the last item added to the stack can be removed.
     * Can be done by a Linked List implementation via prepend and deleteHead
     */
    this.linkedList = new LinkedList();
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * @return {*}
   */
  peek() {
    if (this.isEmpty()) return null;
    return this.linkedList.head.value;
  }

  /**
   * @param {*} value
   */
  push(value) {
    // All new items go at the top of the stack.
    this.linkedList.prepend(value);
  }

  /**
   * @return {*}
   */
  pop() {
    // Only values, at the top of the stack are removed.
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  /**
   * @return {*[]}
   */
  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString(cb) {
    return this.linkedList.toString(cb);
  }
}
