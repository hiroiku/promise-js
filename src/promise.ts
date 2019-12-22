export class Promise<T = unknown> {
  private readonly deferers: Deferer<T>[] = [];

  public constructor(executor: (resolve: ResolveListener<T>, reject: RejectListener) => void) {
    setTimeout(() => {
      try {
        executor(
          value => this.resolve(value),
          reason => this.reject(reason),
        );
      } catch (exception) {
        this.reject(exception);
      }
    }, 0);
  }

  public then(onResolved?: ResolveListener<T> | null, onRejected?: RejectListener | null) {
    this.deferers.push(new Deferer(onResolved, onRejected));

    return this;
  }

  public catch(onRejected?: RejectListener | null) {
    return this.then(null, onRejected);
  }

  private resolve(value?: T) {
    this.deferers.forEach(deferer => {
      if (deferer.onResolved) {
        deferer.onResolved(value);
      }
    });
  }

  private reject(reason?: any) {
    this.deferers.forEach(deferer => {
      if (deferer.onRejected) {
        deferer.onRejected(reason);
      }
    });
  }
}

class Deferer<T> {
  public readonly onResolved?: ResolveListener<T> | null;
  public readonly onRejected?: RejectListener | null;

  public constructor(onResolved?: ResolveListener<T> | null, onRejected?: RejectListener | null) {
    this.onResolved = onResolved;
    this.onRejected = onRejected;
  }
}

type ResolveListener<T> = (value?: T) => void;
type RejectListener = (reason?: any) => void;
