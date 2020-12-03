import LinkedList from "../linked-list/LinkedList";

export default class Stack {
    constructor() {
        this.linkedList = new LinkedList();
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.linkedList.head;
    }

    /**
     * @return {*}
     */
    peek()  {
        if(this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    push(value) {
        this.linkedList.prepend(value)
    }

    pop(value) {
        const deletedHead = this.linkedList.deleteHead()
        return deletedHead ? deletedHead.value:null        
    }

    toArray() {
        return this.linkedList
        .toArray()
        .map((linkedListNode) => linkedListNode.value);
    }

    toString() {
        return this.linkedList.toString(callback)
    }
}