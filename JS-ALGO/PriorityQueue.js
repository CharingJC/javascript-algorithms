import MinHeap from '../heap/MinHeap';
import Comparator from '../../utils/comparator/Comparator';

export default class PriorityQueue extends MinHeap {
    constructor() {
        super();

        this.priorities = new Map();

        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    /**
     * Add item to the priority queue
     * @param {*} item
     * @param {number} [priority]
     * @return {PriorityQueue}
     */
    add(item, priority = 0) {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    /**
     * @param {*} item
     * @param {Comparator}
     * @return {PriorityQueue}
     */
    remove(item, customFindingComparator) {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }

    /**
     * @param {*} item
     * @param {number} priority
     * @return {PriorityQueue}
     */
    changePriority(item, priority) {
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    }

    /**
     * @param {*} item
     * @return {Number[]}
     */
    findByValue(value) {
        return this.find(item, new Comparator(this.compareValue));
    }

    /**
     * @param {*} item
     * @return {boolean}
     */
    hasValue(item) {
        return this.findByValue(item).length > 0;
    }

    /**
     * @param {*} a
     * @param {*} b
     * @return {number}
     */

     comparePriority(a, b) {
         if(this.priorities.get(a)===this.priorities.get(b)) {
             return 0;
         }
         return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
     }

     /**
      * @param {*} a
      * @param {*} b
      * @return {number}
      */
     compareValue(a, b) {
         if(a === b) {
             return 0;
         }
         return a < b ? -1 : 1;
     }
}