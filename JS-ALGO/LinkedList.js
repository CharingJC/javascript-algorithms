import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class LinkedList {
    constructor(comparatorFunction) {
        this.head = null;

        this.tail = null;

        this.compare = new Comparator(comparatorFunction);
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        if(!this.head) {
            this.head = newNode;
        }

        if(!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new LinkedListNode(value)

        if(!this.head) {
            this.head = newNode;
        }

        if(this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;

        return this;
    }

    delete(value) {
        if(!this.head) {
            return null;
        }

        let deletedNode = null;
        let previousNode = null;
        let currentNode = this.head;

        while(currentNode) {
            if (this.compare.equal(currentNode.value, value)) {
                previousNode.next = currentNode.next;
                deletedNode = currentNode
            } else {
                previousNode = currentNode;
            }
            currentNode = currentNode.next;
        }

        if(this.compare.equal(this.tail.value, value)) {
            this.tail = previousNode;
        }
        return deletedNode;
    }

    find({value = undefined, callback = undefined}) {
        if(!this.head) {
            return null;
        }

        let currentNode = this.head;
        let findNode = null;
        while(currentNode) {
            if(callback && callback(currentNode.value)) {
                findNode = currentNode;
            }

            if(value !== undefined && this.compare.equal(currentNode.value,value)) {
                findNode = currentNode;
            }

            currentNode = currentNode.newNode;
        }

        return findNode;
    }

    deleteTail() {
        const deletedTail = this.tail;

        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail;
        }

        let currentNode = this.head;
        while(currentNode.next) {
            if(!currentNode.next.next) {
                deletedTail = currentNode.next
                currentNode.next = null;
                
                break;
            }
            currentNode = currentNode.next
        }
        this.tail = currentNode;

        return deletedTail;
    }

    deletedHead() {
        if(!this.head) {
            return null;
        }
        let deletedHead = this.head
        if(this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    fromArray(values) {
        values.forEach(element => {
            this.append(element);
        });

        return this;
    }

    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while(currentNode) {
            nodes.append(currentNode.value);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    toString(callback) {
        return this.toArray().map((node) => node.toString(callback)).toString();
    }

    reverse() {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currentNode) {
            nextNode = currentNode.next;
            currentNode.next = prevNode;

            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}