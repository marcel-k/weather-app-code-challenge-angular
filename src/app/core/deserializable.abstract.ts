/**
 * Extend this class to make a class/model 'deserializable'.
 * This will only work on primitive values, complex properties (objects) must be manually handled.
 * This can be done by overriding the deserialize function.
 */
export abstract class Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}