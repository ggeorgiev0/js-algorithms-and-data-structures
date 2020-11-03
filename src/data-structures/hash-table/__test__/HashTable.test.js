import HashTable from '../HashTable';

describe('HashTable', () => {
  let hashTable = null;
  beforeEach(() => {
    hashTable = new HashTable();
  });

  afterEach(() => {
    hashTable = null;
  });

  it('should create a hash table of a certain size', () => {
    // Default is set to 32.
    expect(hashTable.buckets.length).toBe(32);
    hashTable = new HashTable(64);
    expect(hashTable.buckets.length).toBe(64);
  });

  it('should generate proper hashes for specified keys', () => {
    // TODO: Update when polynomial string hashing is added
    expect(hashTable.hash('a')).toBe(1);
    expect(hashTable.hash('b')).toBe(2);
    expect(hashTable.hash('abc')).toBe(6);
  });

  it('should set, read and delete data with collisions', () => {
    hashTable = new HashTable(3);

    expect(hashTable.hash('a')).toBe(1);
    expect(hashTable.hash('b')).toBe(2);
    expect(hashTable.hash('c')).toBe(0);
    expect(hashTable.hash('d')).toBe(1);

    hashTable.set('a', 'night');
    hashTable.set('a', 'morning');
    hashTable.set('b', 'noon');
    hashTable.set('c', 'afternoon');
    hashTable.set('d', 'evening');

    expect(hashTable.has('x')).toBe(false);
    expect(hashTable.has('b')).toBe(true);
    expect(hashTable.has('c')).toBe(true);

    const stringifier = (value) => `${value.key}:${value.value}`;

    expect(hashTable.buckets[0].toString(stringifier)).toBe('c:afternoon');
    expect(hashTable.buckets[1].toString(stringifier)).toBe(
      'a:morning,d:evening',
    );
    expect(hashTable.buckets[2].toString(stringifier)).toBe('b:noon');

    expect(hashTable.get('a')).toBe('morning');
    expect(hashTable.get('d')).toBe('evening');
    expect(hashTable.get('x')).not.toBeDefined();

    hashTable.delete('a');

    expect(hashTable.delete('x')).toBeNull();

    expect(hashTable.get('a')).not.toBeDefined();
    expect(hashTable.get('d')).toBe('evening');

    hashTable.set('d', 'midnight');
    expect(hashTable.get('d')).toBe('midnight');
  });

  it('should be possible to add objects to the hash table', () => {
    hashTable.set('myObject', { name: 'Georgi', age: 69 });
    const object = hashTable.get('myObject');
    expect(object).toBeDefined();
    expect(object.name).toBe('Georgi');
    expect(object.age).toBe(69);
  });

  it('should keep track of actual keys', () => {
    hashTable = new HashTable(3);

    hashTable.set('a', 'night');
    hashTable.set('a', 'morning');
    hashTable.set('b', 'noon');
    hashTable.set('c', 'afternoon');
    hashTable.set('d', 'evening');

    expect(hashTable.getKeys()).toEqual(['a', 'b', 'c', 'd']);
    expect(hashTable.has('a')).toBe(true);
    expect(hashTable.has('x')).toBe(false);

    hashTable.delete('a');

    expect(hashTable.has('a')).toBe(false);
    expect(hashTable.has('b')).toBe(true);
    expect(hashTable.has('x')).toBe(false);
  });
});
