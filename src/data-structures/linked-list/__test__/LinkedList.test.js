import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  let linkedList = null;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  afterEach(() => {
    linkedList = null;
  });

  it('should create an empty linked list', () => {
    expect(linkedList.toString()).toBe('');
  });

  it('should append a node to the linked list', () => {
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.toString()).toBe('1,2');
    expect(linkedList.tail.next).toBeNull();
  });

  it('should prepend a node to the linked list', () => {
    linkedList.prepend(2);
    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('2');

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe('3,2,1');
  });

  it('should deleta a node by value from the linked list', () => {
    expect(linkedList.delete(5)).toBeNull();

    linkedList.append('a');
    linkedList.append('a');
    linkedList.append('b');
    linkedList.append('b');
    linkedList.append('c');
    linkedList.append('c');
    linkedList.append('c');
    linkedList.append('d');
    linkedList.append('e');

    expect(linkedList.head.toString()).toBe('a');
    expect(linkedList.tail.toString()).toBe('e');

    const deletedNode = linkedList.delete('c');
    expect(deletedNode.value).toBe('c');
    expect(linkedList.toString()).toBe('a,a,b,b,d,e');

    linkedList.delete('c');
    expect(linkedList.toString()).toBe('a,a,b,b,d,e');

    linkedList.delete('a');
    expect(linkedList.toString()).toBe('b,b,d,e');
    expect(linkedList.head.toString()).toBe('b');
    expect(linkedList.tail.toString()).toBe('e');

    linkedList.delete('e');
    expect(linkedList.toString()).toBe('b,b,d');
    expect(linkedList.head.toString()).toBe('b');
    expect(linkedList.tail.toString()).toBe('d');

    linkedList.delete('d');
    expect(linkedList.head.toString()).toBe('b');
    expect(linkedList.tail.toString()).toBe('b');

    linkedList.delete('b');
    expect(linkedList.toString()).toBe('');
  });

  it("should delete the linked list's tail", () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('3');

    const firstDeletedNode = linkedList.deleteTail();
    expect(firstDeletedNode.value).toBe(3);
    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('2');

    const secondDeletedNode = linkedList.deleteTail();
    expect(secondDeletedNode.value).toBe(2);
    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('1');

    const thirdDeletedNode = linkedList.deleteTail();
    expect(thirdDeletedNode.value).toBe(1);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it('should delete the head of the linked list', () => {
    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.head.toString()).toBe('1');
    expect(linkedList.tail.toString()).toBe('2');

    const firstDeletedNode = linkedList.deleteHead();
    expect(firstDeletedNode.value).toBe(1);
    expect(linkedList.toString()).toBe('2');
    expect(linkedList.head.toString()).toBe('2');
    expect(linkedList.tail.toString()).toBe('2');

    const secondDeletedNode = linkedList.deleteHead();
    expect(secondDeletedNode.value).toBe(2);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it('should store objects in the list and print them out', () => {
    const firstNodeValue = { value: 1, key: 'key1' };
    const secondNodeValue = { value: 2, key: 'key2' };

    linkedList.append(firstNodeValue).prepend(secondNodeValue);

    const nodeStringifier = (value) => `${value.key}:${value.value}`;
    expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1');
  });

  it('should find nodes by value', () => {
    expect(linkedList.find({ value: 5 })).toBeNull();

    linkedList.append(1);
    expect(linkedList.find({ value: 1 })).toBeDefined();

    linkedList.append(2).append(3);

    const node = linkedList.find({ value: 2 });
    expect(node.value).toBe(2);
    expect(linkedList.find({ value: 5 })).toBeNull();
  });

  it('should find nodes by callback', () => {
    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' });

    const node = linkedList.find({ cb: (value) => value.key === 'test2' });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.key).toBe('test2');
    expect(
      linkedList.find({ cb: (value) => value.key === 'test5' }),
    ).toBeNull();
  });

  it('should create a linked list from an array', () => {
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);
    expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5');
  });

  it('should find a node with a custom compare method', () => {
    const compareMethod = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    linkedList = new LinkedList(compareMethod);

    linkedList
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' });

    const node = linkedList.find({
      value: { value: 2, customValue: 'test2' },
    });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.customValue).toBe('test2');
    expect(linkedList.find({ value: 2, customValue: 'test5' })).toBeNull();
  });

  it('should reverse a linked list', () => {
    linkedList
      .append(1)
      .append(2)
      .append(3);

    expect(linkedList.toString()).toBe('1,2,3');
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(3);

    linkedList.reverse();
    expect(linkedList.toString()).toBe('3,2,1');
    expect(linkedList.head.value).toBe(3);
    expect(linkedList.tail.value).toBe(1);

    linkedList.reverse();
    expect(linkedList.toString()).toBe('1,2,3');
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(3);
  });
});
