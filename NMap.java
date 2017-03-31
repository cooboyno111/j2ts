import java.util.ArrayList;
import java.util.Arrays;

class NEntry<K, V> {
	private final K key;
	private V value;

	public NEntry(K key, V value) {
		this.key = key;
		this.value = value;
	}

	public K getKey() {
		return this.key;
	}

	public V getValue() {
		return this.value;
	}

	public void setValue(V value) {
		this.value = value;
	}
}

class NStack<E> {
	private int size = 0;
	private static final int DEFAULT_CAPACITY = 10;
	private Object elements[];

	public NStack() {
		elements = new Object[DEFAULT_CAPACITY];
	}

	public void push(E e) {
		if (size == elements.length) {
			ensureCapa();
		}
		elements[size++] = e;
	}

	@SuppressWarnings("unchecked")
	public E pop() {
		E e = (E) elements[--size];
		elements[size] = null;
		return e;
	}

	private void ensureCapa() {
		int newSize = elements.length * 2;
		elements = Arrays.copyOf(elements, newSize);
	}
}

class NMap<K, V> {
	private int nsize;
	private int DEFAULT_CAPACITY = 16;
	private NEntry<K, V>[] nvalues;

	public NMap() {
		this.nvalues = new NEntry[DEFAULT_CAPACITY];
	}

	public V get(K key) {
		for (int i = 0; i < this.nsize; i++) {
			if (this.nvalues[i] != null) {
				if (this.nvalues[i].getKey().equals(key)) {
					return nvalues[i].getValue();
				}
			}
		}
		return null;
	}

	public void put(K key, V value) {
		boolean insert = true;
		for (int i = 0; i < this.nsize; i++) {
			if (this.nvalues[i].getKey().equals(key)) {
				this.nvalues[i].setValue(value);
				insert = false;
			}
		}
		if (insert) {
			this.ensureCapa();
			this.nvalues[this.nsize++] = new NEntry<K, V>(key, value);
		}
	}

	private void ensureCapa() {
		if (this.nsize == this.nvalues.length) {
			int newSize = this.nvalues.length * 2;
			NEntry<K, V>[] tmp = this.nvalues;
			this.nvalues = new NEntry[newSize];
			for (int i = 0; i < tmp.length; i++) {
				this.nvalues[i] = tmp[i];
			}
		}
	}

	public int size() {
		return this.nsize;
	}

	public void remove(K key) {
		for (int i = 0; i < this.nsize; i++) {
			if (this.nvalues[i].getKey().equals(key)) {
				this.nvalues[i] = null;
				this.nsize--;
				this.condenseArray(i);
			}
		}
	}

	private void condenseArray(int start) {
		for (int i = start; i < this.nsize; i++) {
			this.nvalues[i] = this.nvalues[i + 1];
		}
	}

	public ArrayList<K> keySet() {
		ArrayList<K> set = new ArrayList<K>();
		for (int i = 0; i < this.nsize; i++) {
			set.add(this.nvalues[i].getKey());
		}
		return set;
	}

	public ArrayList<V> values() {
		ArrayList<V> set = new ArrayList<V>();
		for (int i = 0; i < this.nsize; i++) {
			set.add(this.nvalues[i].getValue());
		}
		return set;
	}
	public static void main(String[] args) throws Exception {
		NMap<String, Integer> map = new NMap<String, Integer>();
		map.put("Lars", 1);
		map.put("Lars", 2);
		map.put("Lars", 1);
		System.out.println("Lars=" + map.get("Lars"));
		for (int i = 0; i < 100; i++) {
			map.put(String.valueOf(i), i);
		}
		for (int i = 0; i < 100; i++) {
			System.out.println(map.get(String.valueOf(i)));
		}
		for (Integer value : map.values()) {
			System.out.println("Value = " + value);
		}
		for (Object key : map.keySet()) {
			System.out.println("Key = " + key);
		}
		System.out.println("size=" + map.size());
		NStack<Integer> stack = new NStack<Integer>();
		stack.push(1);
		stack.push(2);
		stack.push(3);
		stack.push(3);
		stack.push(4);
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
	}
}



