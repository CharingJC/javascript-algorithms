import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/comparator/Comparator';

export default class DoublyLinkedList {
    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
    /**@var DoublyLinkedListNode */
    this.head = null;

    this.tail = null;

    this.compare = new Comparator(comparatorFunction);
    }
    /**
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if(this.head) {
            this.head.previous = newNode;
        }
        this.head = newNode;

        if(!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    append(value) {
        const newNode = new DoublyLinkedListNode(value, null, this.tail);

        if (this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode;

        if(!this.head) {
            this.head = newNode;
        }

        return this;
    }

    /**
     * @param {*} value
     * @return {DoublyLinkedListNode}
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        while(currentNode) {
            if (this.compare.equal(currentNode.value, value)){
                deletedNode = currentNode;

                if(deletedNode === this.head) {
                    this.head = deletedNode.next;
                    if(this.head) this.head.previous = null;
                    if(deletedNode === this.tail) this.tail = null
                } else if(deletedNode === this.tail) {
                    this.tail = deletedNode.previous;
                    if(deletedNode === this.head) this.head = null;
                    if(this.tail) this.tail.next = null;
                } else {
                    const previousNode = currentNode.previous;
                    const nextNode = currentNode.next;

                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }
        return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {DoublyLinkedListNode}
     */
    find({value = undefined, callback = undefined}) {
        if(!this.head) {
            return null;
        }

        let currentNode = this.head;

        while(currentNode) {
            if(callback && callback(currentNode.value)) {
                return currentNode;
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * @return {DoublyLinkedListNode}
     */
    deleteTail() {
        if(!this.head) {
            return null;
        }

        let deletedTail = this.tail;
        this.tail.previous.next = null;
        this.tail = this.tail.previous;

        if(this.head === deletedTail) this.head = null;

        return deletedTail;
    }

    /**
     * @return {DoublyLinkedListNode}
     */
    deletedHead() {
        if(!this.head) {
            return null;
        }

        let deletedHead = this.head;
        this.head.next.previous = null;
        this.head = this.head.next;

        if(deletedHead === this.tail) this.tail = null;

        return deletedHead;
    }

    /**
     * @return {DoublyLinkedListNode[]}
     */
    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * @param {*[]} value
     * @return {DoublyLinkedList}
     */
    fromArray(values) {
        values.forEach((value) => this.append(value));

        return this;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.toArray().map((node) => node.toString(callback)).toString();  
    }

    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currNode) {
            nextNode = currNode.next;
            prevNode = currNode.previous;
            
            currNode.next = prevNode;
            currNode.previous = nextNode;

            currNode = currNode.previous;
        }
        this.tail = this.head;
        this.head = prevNode.previous;
        return this;
    }
      
}