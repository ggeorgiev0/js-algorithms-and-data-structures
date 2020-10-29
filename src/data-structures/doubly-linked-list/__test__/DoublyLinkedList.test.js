import LinkedList from '../../linked-list/LinkedList';
import DoublyLinkedList from '../DoublyLinkedList';

describe('DoublyLinkedList', () => {
  let list = null;

  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  afterEach(() => {
    list = null;
  });

  it('should create an empty doubly linked list', () => {
    expect(list.toString()).toBe('');
  });

  it('should append node to doubly linked list', () => {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();

    list.append(1);
    list.append(2);

    expect(list.head.next.value).toBe(2);
    expect(list.tail.previous.value).toBe(1);
    expect(list.toString()).toBe('1,2');
  });

  it('should prepend a node to a doubly linked list', () => {
    list.prepend(2);
    expect(list.head.toString()).toBe('2');
    expect(list.tail.toString()).toBe('2');

    list.append(1);
    list.prepend(3);

    expect(list.head.next.next.previous).toBe(list.head.next);
    expect(list.tail.previous.next).toBe(list.tail);
    expect(list.tail.previous.value).toBe(2);
    expect(list.toString()).toBe('3,2,1');
    expect(list.head.previous).toBeNull();
  });

  it('should create a linked list from an array', () => {
    list.fromArray([1, 1, 2, 2, 3, 3, 3, 4, 5]);
    expect(list.toString()).toBe('1,1,2,2,3,3,3,4,5');
  });

  it('should delete a node by value from the linked list', () => {
    expect(list.delete(5)).toBeNull();

    list.append(1);
    list.append(2);
    list.append(2);
    list.append(3);
    list.append(3);
    list.append(3);
    list.append(4);
    list.append(5);

    expect(list.head.toString()).toBe('1');
    expect(list.tail.toString()).toBe('5');

    const deletedNode = list.delete(3);
    expect(deletedNode.value).toBe(3);
    expect(list.tail.previous.previous.value).toBe(2);
    expect(list.toString()).toBe('1,2,2,4,5');

    list.delete(1);
    expect(list.toString()).toBe('2,2,4,5');

    list.delete(5);
    expect(list.toString()).toBe('2,2,4');

    list.delete(4);
    expect(list.toString()).toBe('2,2');
    expect(list.head.toString()).toBe('2');
    expect(list.tail.toString()).toBe('2');
    expect(list.head.next.value).toBe(2);
    expect(list.tail.previous.value).toBe(2);

    list.delete(2);
    expect(list.toString()).toBe('');
  });

  // TODO: delete tail/head, find, reverse
});