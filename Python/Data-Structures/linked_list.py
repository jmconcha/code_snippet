class Node:
	def __init__(self, data):
		self.data = data
		self.next = None

class LinkedList:
	def __init__(self, head):
		self.head = head
	def display(self):
		temp = self.head
		while temp != None:
			print(temp.data)
			temp = temp.next
	def append(self, data):
		node = Node(data)
		temp = self.head
		while temp != None:
			if temp.next == None:
				temp.next = node
				break
			temp = temp.next
	def pop(self):
		temp = self.head
		while temp != None:
			if temp.next.next == None:
				temp.next = None
				break
			temp = temp.next

first = Node(1)
llist = LinkedList(first)
llist.append(2)
llist.append(3)
llist.display()
llist.pop()
llist.display()
