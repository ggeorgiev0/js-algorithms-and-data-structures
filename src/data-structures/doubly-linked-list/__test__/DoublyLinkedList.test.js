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

  it('should delete the tail of the linked list', () => {
    expect(list.deleteTail()).toBeNull();

    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.head.toString()).toBe('1');
    expect(list.tail.toString()).toBe('3');

    const firstDeletedNode = list.deleteTail();
    expect(firstDeletedNode.value).toBe(3);
    expect(list.toString()).toBe('1,2');
    expect(list.head.toString()).toBe('1');
    expect(list.tail.toString()).toBe('2');

    const secondDeletedNode = list.deleteTail();
    expect(secondDeletedNode.value).toBe(2);
    expect(list.toString()).toBe('1');
    expect(list.head.toString()).toBe('1');
    expect(list.tail.toString()).toBe('1');

    const thirdDeletedNode = list.deleteTail();
    expect(thirdDeletedNode.value).toBe(1);
    expect(list.toString()).toBe('');
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it('should delete the head of the linked list', () => {
    expect(list.deleteHead()).toBeNull();

    list.append(1);
    list.append(2);

    expect(list.head.toString()).toBe('1');
    expect(list.tail.toString()).toBe('2');

    const firstDeletedNode = list.deleteHead();
    expect(firstDeletedNode.value).toBe(1);
    expect(list.toString()).toBe('2');
    expect(list.head.toString()).toBe('2');
    expect(list.tail.toString()).toBe('2');

    const secondDeletedNode = list.deleteHead();
    expect(secondDeletedNode.value).toBe(2);
    expect(list.toString()).toBe('');
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it('should be possible to store objects in the list and print them out', () => {
    const firstNodeValue = { value: 1, key: 'key1' };
    const secondNodeValue = { value: 2, key: 'key2' };

    list.append(firstNodeValue).prepend(secondNodeValue);

    const nodeStringifier = (arg) => `${arg.key}:${arg.value}`;

    expect(list.toString(nodeStringifier)).toBe('key2:2,key1:1');
  });

  it('should find a node by its value', () => {
    expect(list.find({ value: 5 })).toBeNull();

    list.append(1);
    expect(list.find({ value: 1 })).toBeDefined();

    list.append(2).append(3);

    const node = list.find({ value: 2 });
    expect(node.value).toBe(2);
    expect(list.find({ value: 5 })).toBeNull();
  });

  it('should find a node by callback', () => {
    list
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    const node = list.find({ cb: (value) => value.key === 'test2' });
    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(list.find({ cb: (value) => value.key === 'test5' })).toBeNull();
  });

  it('should find a node when using a custom compare method', () => {
    const compareMethod = (a, b) => {
      if (a.customValue === b.customValue) return 0;

      return a.customValue < b.customValue ? -1 : 1;
    };

    list = new DoublyLinkedList(compareMethod);

    list
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' });

    const node = list.find({
      value: { value: 2, customValue: 'test2' },
    });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.customValue).toBe('test2');
    expect(list.find({ value: 2, customValue: 'test5' })).toBeNull();
  });

  it('should reverse the linked list', () => {
    list
      .append(1)
      .append(2)
      .append(3)
      .append(4);

    expect(list.toString()).toBe('1,2,3,4');
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(4);

    list.reverse();

    expect(list.toString()).toBe('4,3,2,1');
    expect(list.head.value).toBe(4);
    expect(list.tail.value).toBe(1);
    expect(list.head.previous).toBeNull();
    expect(list.tail.next).toBeNull();
    expect(list.head.next.next.value).toBe(2);
    expect(list.tail.previous.previous.value).toBe(3);

    list.reverse();

    expect(list.toString()).toBe('1,2,3,4');
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(4);
    expect(list.head.previous).toBeNull();
    expect(list.tail.next).toBeNull();
    expect(list.head.next.next.next.value).toBe(4);
    expect(list.tail.previous.previous.previous.value).toBe(1);
  });
});
