import { Lens, pure, view, compose } from "./lens";


export class Focus<A, B> {

    constructor(private item: A, private lens: Lens<A, B>) {
    }

    get(): B {
        return this.lens.get(this.item);
    }

    set(part: B): A {
        return this.lens.set(this.item, part);
    }

    modify(f: (part: B) => B): A {
        return this.lens.set(this.item, f(this.lens.get(this.item)));
    }

    with<C>(lens: Lens<B, C>): Focus<A, C> {
        return new Focus(this.item, compose(lens, this.lens));
    }

    at<K extends keyof B>(prop: K): Focus<A, B[K]> {
        return this.with<B[K]>(view<B, K>(prop));
    }
}

export function focus<A>(item: A): Focus<A, A> {
    return new Focus(item, pure<A>());
}