export default function assert(expr: any, message: string): asserts expr{
    if (!expr) {
        throw new AssertionError(message);
    }
}

class AssertionError extends Error {
    constructor(message: string) {
        super(message);
    }
}