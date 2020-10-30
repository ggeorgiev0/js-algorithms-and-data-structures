import Stack from '../Stack';

describe('Stack', () => {
  let stack = null;
  beforeEach(() => {
    stack = new Stack();
  });

  afterEach(() => {
    stack = null;
  });

  it('should create an empty stack', () => {
    expect(stack).not.toBeNull();
    expect(stack.linkedList).not.toBeNull();
  });

  it('should stack data into the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.toString()).toBe('2,1');
  });

  it('should peek data from the top of the stack', () => {
    expect(stack.peek()).toBeNull();

    stack.push(1);
    expect(stack.peek()).toBe(1);

    stack.push(2);
    expect(stack.peek()).toBe(2);
  });

  it('should check if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);

    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('should pop data from the top of the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
    expect(stack.isEmpty()).toBe(true);
  });

  it('should be able to push/pop objects', () => {
    stack.push({ value: 'test1', key: 'key1' });
    stack.push({ value: 'test2', key: 'key2' });

    const stringifier = (arg) => `${arg.key}:${arg.value}`;

    expect(stack.toString(stringifier)).toBe('key2:test2,key1:test1');
    expect(stack.pop().value).toBe('test2');
    expect(stack.pop().key).toBe('key1');
  });

  it('should be possible to convert the stack to an array', () => {
    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.toArray()).toEqual([3, 2, 1]);
  });
});
