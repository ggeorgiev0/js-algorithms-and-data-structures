import LinkedList from '../linked-list/LinkedList';

export default class Queue {
  constructor() {
    /**
     * Queues are similar to linked lists,
     * because they both operate on elements at the beginning and at the end.
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
   * Reads the element that is in the front of the queue, without removing it.
   * @return {*}
   */
  peek() {
    if (!this.linkedList.head) return null;
    return this.linkedList.head.value;
  }

  /**
   * Add an element to the end of the queue (at the tail).
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value);
  }

  /**
   * Remove an element that is at the beginning of the queue (at the head).
   * @return {*}
   */
  dequeue() {
    const removehead = this.linkedList.deleteHead();
    return removehead ? removehead.value : null;
  }

  /**
   * @param {[cb]}
   * @return {string}
   */
  toString(cb) {
    return this.linkedList.toString(cb);
  }
}
