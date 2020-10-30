import Queue from '../Queue';

describe('Queue', () => {
  let queue = null;

  beforeEach(() => {
    queue = new Queue();
  });

  afterEach(() => {
    queue = null;
  });

  it('should create an empty queue', () => {
    expect(queue).not.toBeNull();
    expect(queue.linkedList).not.toBeNull();
  });

  it('should enqueue data to the queue', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe('1,2');
  });

  it('should be able to enqueue/dequeue objects', () => {
    queue.enqueue({ value: 'test1', key: 'key1' });
    queue.enqueue({ value: 'test2', key: 'key2' });

    const stringifier = (arg) => `${arg.key}:${arg.value}`;

    expect(queue.toString(stringifier)).toBe('key1:test1,key2:test2');
    expect(queue.dequeue().value).toBe('test1');
    expect(queue.dequeue().value).toBe('test2');
  });

  it('should be able to peek data from the queue', () => {
    expect(queue.peek()).toBeNull();
    queue.enqueue(1);
    expect(queue.peek()).toBe(1);
  });

  it('should dequeue in FIFO order', () => {
    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBe(true);
  });
});
