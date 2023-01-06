import { from, fromEvent, Observable, forkJoin, combineLatest, observable, Subscriber, filter, map, tap, of, debounceTime, catchError, EMPTY, concatMap, Subject, BehaviorSubject, withLatestFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// const someObservable$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });

// someObservable$.subscribe(value => console.log(value));

// Each subscription is independent
// const ajax$ = ajax<any>("https://random-data-api.com/api/name/random_name");

// ajax$.subscribe((data) => console.log("ajax Sub 1:", data.response.first_name));
// ajax$.subscribe((data) => console.log("ajax Sub 2:", data.response.first_name));
// ajax$.subscribe((data) => console.log("ajax Sub 3:", data.response.first_name));

// from
// from(['Alice', 'Ben', 'Charlie']).subscribe({
//   next: (value) => console.log('from:', value),
//   complete: () => console.log("from: Completed")
// });

// const somePromise = new Promise((resolve, reject) => {
//   // resolve("Resolved")
//   reject("Rejected")
// });

// const observableFromPromise$ = from(somePromise)

// observableFromPromise$.subscribe({
//   next: (value) => console.log(value),
//   error: (err) => console.log("from Error:", err),
//   complete: () => console.log("from: Completed")
// })

// fromtEvent() - Trigger Button
// const triggerButton = document.querySelector("button#trigger");

// const subscription = fromEvent<MouseEvent>(triggerButton, "click").subscribe(
//   (event) => console.log(event.type, event.x, event.y)
// );

// setTimeout(() => {
//   console.log('fromEvent(): Unsubscribe')
//   subscription.unsubscribe()
// }, 5000);

//forkJoin
// const randomName$ = ajax<any>("https://random-data-api.com/api/name/random_name")
// const randomNation$ = ajax<any>("https://random-data-api.com/api/nation/random_nation")
// const randomFood$ = ajax<any>("https://random-data-api.com/api/food/random_food")

// randomName$.subscribe(ajaxResponse => console.log(ajaxResponse.response.first_name));
// randomNation$.subscribe(ajaxResponse => console.log(ajaxResponse.response.capital));
// randomFood$.subscribe(ajaxResponse => console.log(ajaxResponse.response.dish));

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameAjax, nationAjax, foodAjax]) => console.log(`${ nameAjax.response.first_name } is from ${ nationAjax.response.capital } and likes to eat ${ foodAjax.response.dish }.`)
// );

// combineLatest - Temperature Example
// const temperatureInput = document.getElementById('temperature-input');
// const conversionDropdown = document.getElementById('conversion-dropdown');
// const resultText = document.getElementById('result-text');

// const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
// const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');

// combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
//   ([temperatureInputEvent, conversionInputEvent]) => {
//     const temperature = Number(temperatureInputEvent.target['value']);
//     const conversion = conversionInputEvent.target['value'];

//     let result: number;
//     if (conversion === 'f-to-c') {
//       result = (temperature - 32) * 5 / 9;
//     } else if (conversion === 'c-to-f') {
//       result = temperature * 9 / 5 + 32;
//     }

//     resultText.innerText = String(result);
//   }
// );

// filter();
// interface NewsItem {
//   category: 'Business' | 'Sports';
//   content: string;
// }

// const newsFeed$ = new Observable<NewsItem>(subscriber => {
//   setTimeout(() => subscriber.next({ category: 'Business', content: 'A' }), 1000);
//   setTimeout(() => subscriber.next({ category: 'Sports', content: 'B' }), 3000);
//   setTimeout(() => subscriber.next({ category: 'Business', content: 'C' }), 4000);
//   setTimeout(() => subscriber.next({ category: 'Sports', content: 'D' }), 6000);
//   setTimeout(() => subscriber.next({ category: 'Business', content: 'E' }), 7000);
// });

// // newsFeed$.pipe(
// //   filter(item => item.category === 'Sports')
// // ).subscribe(
// //   item => console.log(item)
// // );

// const sportsNewsFeed$ = newsFeed$.pipe(
//   filter(item => item.category === 'Sports')
// );

// sportsNewsFeed$.subscribe(
//   item => console.log(item)
// );

// map
// const randomFirstName$ = ajax<any>("https://random-data-api.com/api/name/random_name").pipe(
//   map(ajaxResponse => ajaxResponse.response.first_name)
// );
// const randomCapital$ = ajax<any>("https://random-data-api.com/api/nation/random_nation").pipe(
//   map(ajaxResponse => ajaxResponse.response.capital)
// );
// const randomDish$ = ajax<any>("https://random-data-api.com/api/food/random_food").pipe(
//   map(ajaxResponse => ajaxResponse.response.dish)
// );

// forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
//   ([firstName, capital, dish]) => console.log(`${ firstName } is from ${ capital } and likes to eat ${ dish }.`)
// );

// tap - good for debugging or passing notifications
// of(1, 7, 3, 6, 2).pipe(
//   filter(value => value > 5),
//   tap(value => console.log("Spy:", value)),
//   map(value => value * 2),
//   tap({
//     next: output => console.log('Output:', output),
//     error: err => console.log('Error', err),
//     complete: () => console.log('Complete'),
//     subscribe: () => console.log('New Subscription'),
//     unsubscribe: () => console.log('Unsubscribed'),
//     finalize: () => console.log('Subscription ended')
//   })
// ).subscribe();

// debounceTime - wait before emitting value
// const sliderInput = document.querySelector('input#slider');

// fromEvent(sliderInput, 'input').pipe(
//   debounceTime(2000),
//   map(event => event.target['value'])
// ).subscribe(
//   value => console.log(value)
// );

// catchError & EMPTY
// const failingHttpRequest$ = new Observable(subscriber => {
//   setTimeout(() => {
//     subscriber.error(new Error('Timeout'));
//   }, 3000);
// });

// console.log('App started');

// failingHttpRequest$.pipe(
//   catchError(err => of('Fallback value'))
//   // catchError(err => EMPTY)
// ).subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });

// Flattening Operators (concatMap, switchMap, mergeMap)
// const source$ = new Observable(subscriber => {
//   setTimeout(() => subscriber.next('A'), 2000);
//   setTimeout(() => subscriber.next('B'), 5000);
// });

// console.log('App has started');
// source$.pipe(
//   concatMap(valueOfSourceObs => of(1, 2))
// ).subscribe(value => console.log(value));

// const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// fromEvent(fetchButton, 'click').pipe(
//   map(() => endpointInput.value),
//   concatMap(
//     value => ajax(`https://random-data-api.com/api/${ value }/random_${ value }`).pipe(
//       catchError(err => of(`Could not fetch data: ${ err }`))
//     )
//   )
// ).subscribe({
//   next: value => console.log(value),
//   error: err => console.log('Error:', err),
//   complete: () => console.log('Completed')
// });

// Subject - multicast notifications to all Subscriptions
// const emitButton = document.querySelector('button#emit');
// const inputElement: HTMLInputElement = document.querySelector('#value-input');
// const subscribeButton = document.querySelector('button#subscribe');

// const value$ = new Subject<string>();

// fromEvent(emitButton, 'click').subscribe(
//   () => value$.next(inputElement.value)
// );

// fromEvent(subscribeButton, 'click').subscribe(
//   () => {
//     console.log('New Subscription');
//     value$.subscribe(value => console.log(value));
//   }
// );

// BehaviorSubject - Subject + each new Subscription receive an initial value
// const loggedInSpan: HTMLInputElement = document.querySelector('span#logged-in');
// const loginButton: HTMLInputElement = document.querySelector('button#login');
// const logoutButton: HTMLInputElement = document.querySelector('button#logout');
// const printStateButton: HTMLInputElement = document.querySelector('button#print-state');

// const isLoggedIn$ = new BehaviorSubject<boolean>(false);

// fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
// fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// // Navbar
// isLoggedIn$.subscribe(
//   isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
// );

// // Buttons
// isLoggedIn$.subscribe(isLoggedIn => {
//   logoutButton.style.display = isLoggedIn ? 'block' : 'none';
//   loginButton.style.display = !isLoggedIn ? 'block' : 'none';
// });

// fromEvent(printStateButton, 'click').pipe(
//   withLatestFrom(isLoggedIn$)
// ).subscribe(
//   ([event, isLoggedIn]) => console.log('User is logged in:', isLoggedIn)
// );
