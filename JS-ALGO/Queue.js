import LinkedList from './LinkedList';

export default class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    isEmpty() {
        return !this.linkedList.head;
    }

    peek() {
        if(!this.linkedList.head) {
            return null;
        }

        return this.linkedList.head.value;
    }

    enqueue(value) {
        this.linkedList.append(value);
    }

    dequeue(value) {
        const removedHead = this.linkedList.deletedHead();
        return removedHead ? removedHead:null;
    }

    toString(callback) {
        return this.linkedList.toString(callback);
    }
}