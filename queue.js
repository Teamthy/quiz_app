class Message {
    constructor(messageType, payload) {
        this.messageType = messageType;
        this.payload = payload;
    }

}



class MessageQueue {
    constructor() {
        this.queue = [];
        this.mutex = new Promise(resolve => this.resolveMutex = resolve);
    }


    async enqueue(message) {
        await this.mutex;
        try {
            this.queue.push(message);
        } finally {
            this.resolveMutex();
        }
    }


    async dequeue() {
        await this.mutex;
        try {
            while (this.queue.length === 0) {
                await new Promise(resolve => this.resolveWait = resolve);
            }
            return this.queue.shift();
        } finally {
            this.resolveMutex();
        }
    }
}