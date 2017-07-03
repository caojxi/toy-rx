import Rx from './index'

const timeout = (cb, period, x = null) => setTimeout(() => cb(x), period) 

const delay = function (period) {
  const inObservable = this

  const outObservable = Rx.Observable.create(function subscribe(outObserver) {
    const inObserver = {
      next: x => timeout(outObserver.next, period, x),
      error: e => timeout(outObserver.error, period, e),
      complete: () => timeout(outObserver.complete, period)
    }

    return inObservable.subscribe(inObserver)
  })

  return outObservable
}

export default delay