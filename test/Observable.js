import assert from 'assert'
import Rx from './../js/rx/'
import fromArray from './../js/rx/fromArray'
import delay from './../js/rx/delay'

Rx.Observable.fromArray = fromArray
Rx.Observable.prototype.delay = delay

describe('Observable', () => {
  it('should support the example use case', done => {
    Rx.Observable.fromArray([{clientX: 30}, {clientX: 500}, {clientX: 150}])
      .delay(500).subscribe({
        next: x => {},
        error: () => done('error'),
        complete: () => {
          done()
        }
      })
  })
})