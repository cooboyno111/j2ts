 type int= number;//typealias 
 type long = number;//typealias 
 type float =number;//typealias 
 type double=number;//typealias
 type Int= number;//typealias 
 type Long = number;//typealias 
 type Float =number;//typealias 
 type Double=number;//typealias 
 type Bool=boolean;//typealias 
 type AnyObject=Object;//typealias 
 type Any=any;//typealias 
 function println(message:any):void{console.log(message);}//typealias
// import java.util.ArrayList;
// import java.util.Arrays;

class NEntry<K, V> {
	private readonly let key : K;
	private let value : V;

	public constructor ( key : K,  value : V) {
		this.key = key;
		this.value = value;
	}

	public function getKey() : K {
		return this.key;
	}

	public function getValue() : V {
		return this.value;
	}

	public function setValue(value : V) {
		this.value = value;
	}
}

class NStack<E> {
	private let size : Int = 0;
	private static readonly let DEFAULT_CAPACITY : Int = 10;
	private let elements   : Objec[]t;

	public constructor () {
		elements = new Object[DEFAULT_CAPACITY];
	}

	public function push(e : E) {
		if (size == elements.length) {
			ensureCapa();
		}
		elements[size++] = e;
	}

	@SuppressWarnings("unchecked")
	public function pop() : E {
		let e : E = (E) elements[--size];
		elements[size] = null;
		return e;
	}

	private function ensureCapa() {
		let newSize : Int = elements.length * 2;
		elements = Arrays.copyOf(elements, newSize);
	}
}

class NMap<K, V> {
	private let nsize : Int;
	private let DEFAULT_CAPACITY : Int = 16;
	private let nvalues : NEntry<K, V> [] ;

	public constructor () {
		this.nvalues = new NEntry[DEFAULT_CAPACITY];
	}

	public function get(key : K) : V {
		for  (let i : Int = 0; i < this.nsize; i++) {
			if (this.nvalues[i] != null) {
				if (this.nvalues[i].getKey().equals(key)) {
					return nvalues[i].getValue();
				}
			}
		}
		return null;
	}

	public function put(key : K,  value : V) {
		let insert : Bool = true;
		for  (let i : Int = 0; i < this.nsize; i++) {
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

	private function ensureCapa() {
		if (this.nsize == this.nvalues.length) {
			let newSize : Int = this.nvalues.length * 2;
			let tmp : NEntry<K, V>  [] = this.nvalue[]s;
			this.nvalues = new NEntry[newSize];
			for  (let i : Int = 0; i < tmp.length; i++) {
				this.nvalues[i] = tmp[i];
			}
		}
	}

	public function size() : Int {
		return this.nsize;
	}

	public function remove(key : K) {
		for  (let i : Int = 0; i < this.nsize; i++) {
			if (this.nvalues[i].getKey().equals(key)) {
				this.nvalues[i] = null;
				this.nsize--;
				this.condenseArray(i);
			}
		}
	}

	private function condenseArray(start : Int) {
		for  (let i : Int = start; i < this.nsize; i++) {
			this.nvalues[i] = this.nvalues[i + 1];
		}
	}

	public function keySet() : Array<K> {
		let set : Array<K> = new Array<K>();
		for  (let i : Int = 0; i < this.nsize; i++) {
			set.add(this.nvalues[i].getKey());
		}
		return set;
	}

	public function values() : Array<V> {
		let set : Array<V> = new Array<V>();
		for  (let i : Int = 0; i < this.nsize; i++) {
			set.add(this.nvalues[i].getValue());
		}
		return set;
	}
	public class function main(args : String[]) throws Exception {
		let map : NMap<String, Int> = new NMap<String, Int>();
		map.put("Lars", 1);
		map.put("Lars", 2);
		map.put("Lars", 1);
		println("Lars=" + map.get("Lars"));
		for  (let i : Int = 0; i < 100; i++) {
			map.put(String.valueOf(i), i);
		}
		for  (let i : Int = 0; i < 100; i++) {
			println(map.get(String.valueOf(i)));
		}
		for (let value of map.values()) {
			println("Value = " + value);
		}
		for (let key of map.keySet()) {
			println("Key = " + key);
		}
		println("size=" + map.size());
		let stack : NStack<Int> = new NStack<Int>();
		stack.push(1);
		stack.push(2);
		stack.push(3);
		stack.push(3);
		stack.push(4);
		println(stack.pop());
		println(stack.pop());
		println(stack.pop());
		println(stack.pop());
		println(stack.pop());
	}
}




