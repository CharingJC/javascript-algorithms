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
}