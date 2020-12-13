import Heap from './Heap';

export default class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElementm,secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}