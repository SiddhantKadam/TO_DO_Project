import { of } from "rxjs";

export class mockHttpClient {
    get() { return of([]); }
    post() { return of([]); }
    patch() { return of([]); }
    delete() { return of([]); }
    head() { return of([]); }
    put() { return of([]); }
}