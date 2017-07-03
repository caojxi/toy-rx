import Rx from './index'

const fromArray = function (array) {
  return Rx.Observable.create(function subscribe(observer) {
    array.forEach(x => observer.next(x))
    observer.complete()

    return new Rx.Subscription(function unsubscribe() {})
  })
}

export default fromArray