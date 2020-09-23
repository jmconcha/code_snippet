class Node {
	Node next = null;
	int data;
	Node(int d) {
		data = d;
	}
}

class LinkedList {
	Node head;
	LinkedList(Node h) {
		head = h;
	}
}

public class Algo {
	public static void main(String[] args) {
		LinkedList llist;
		Node first = new Node(1);
		Node second = new Node(2);
		Node third = new Node(3);
		first.next = second;
		second.next = third;
		llist = new LinkedList(first);

		Node temp = llist.head;
		while(temp != null) {
			System.out.println(temp.data);
			temp = temp.next;
		}
	}
}