import Rx from './index'

const delay = function (period) {
  const inObservable = this

  const outObservable = Rx.Observable.create(function subscribe(outObserver) {
    const inObserver = {
      next: x => setTimeout(() => outObserver.next(x), period),
      error: e => setTimeout(() => outObserver.error(e), period),
      complete: () => setTimeout(() => outObserver.complete(), period)
    }

    return inObservable.subscribe(inObserver)
  })

  return outObservable
}

export default delay