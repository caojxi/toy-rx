(function () {
'use strict';

/**
 * A Subscription represents the ongoing execution of an Observable
 * and the possibility to cancel such execution.
*/
var Subscription = function Subscription(unsubscribe) {
  this.unsubscribe = unsubscribe;
};

/**
 * A Subscriber is both an Observer and a Subscription.
 * It wraps a given Observer and enforces the Observable contract `(next)*(error|complete)?`
 * by cancelling the execution whenever error or complete occurs.
 */
var Subscriber = (function (Subscription) {
  function Subscriber(observer) {
    Subscription.call(this, function unsubscribe() {});
    this.observer = observer;
  }

  if ( Subscription ) Subscriber.__proto__ = Subscription;
  Subscriber.prototype = Object.create( Subscription && Subscription.prototype );
  Subscriber.prototype.constructor = Subscriber;

  Subscriber.prototype.next = function next (x) {
    this.observer.next(x);
  };

  Subscriber.prototype.error = function error (e) {
    this.observer.error(e);
    this.unsubscribe();
  };

  Subscriber.prototype.complete = function complete () {
    this.observer.complete();
    this.unsubscribe();
  };

  return Subscriber;
}(Subscription));

/**
 * An Observable is an invokable collection of values pushed to an Observer.
 */
var Observable = function Observable(subscribe) {
  this.subscribe = subscribe;
};

Observable.create = function create (subscribe) {
  return new Observable(function internalSubscribe(observer) {
    var subscriber = new Subscriber(observer);
    var subscription = subscribe(subscriber);
    subscriber.unsubscribe = subscription.unsubscribe.bind(subscription);

    return subscription
  })
};

}());
