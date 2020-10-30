import DoublyLinkedListNode from '../DoublyLinkedListNode';

describe('DoublyLinkedListNode', () => {
  it('should create a list node with a provided value', () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  it('should create a list node with an object as a value', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoublyLinkedListNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe('test');
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  it('should link nodes together', () => {
    const secondNode = new DoublyLinkedListNode(2);
    const firstNode = new DoublyLinkedListNode(1, secondNode);
    const thirdNode = new DoublyLinkedListNode(3, firstNode, secondNode);

    expect(firstNode.next).toBeDefined();
    expect(firstNode.previous).toBeNull();
    expect(secondNode.next).toBeNull();
    expect(secondNode.previous).toBeNull();
    expect(thirdNode.next).toBeDefined();
    expect(thirdNode.previous).toBeDefined();
    expect(firstNode.value).toBe(1);
    expect(firstNode.next.value).toBe(2);
    expect(thirdNode.next.value).toBe(1);
    expect(thirdNode.previous.value).toBe(2);
  });

  it('should convert a node to a string', () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.toString()).toBe('1');
    node.value = 'string';
    expect(node.toString()).toBe('string');
  });

  it('should convert a node to a string with a custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoublyLinkedListNode(nodeValue);
    const stringifier = arg => `value: ${arg.value}, key: ${arg.key}`;
    expect(node.toString(stringifier)).toBe('value: 1, key: test');
  });
});