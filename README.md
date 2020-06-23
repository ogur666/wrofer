## WroFER
Mini program ERP (moduł magazynowo-sprzedażowy). 

Zbudowany przy pomocy [React](https://reactjs.org/) i [Create React App](https://github.com/facebook/create-react-app).<br />
Baza danych: [Firestore](https://firebase.google.com/docs/firestore).

Do poprawnego działania należy skonfigurować Firebase. <br />
W wersji deweloperskiej do katalogu głównego należy wstawić plik .env z wpisanymi danymi konta Firebase.<br />
Zawartość pliku wg wzoru:<br />

```js
REACT_APP_API_KEY=XXXXxxxx
REACT_APP_AUTH_DOMAIN=xxxxXXXX.firebaseapp.com
REACT_APP_DATABASE_URL=https://xxxXXXX.firebaseio.com
REACT_APP_PROJECT_ID=xxxxXXXX
REACT_APP_STORAGE_BUCKET=xxxxXXXX.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxXXXX
```
gdzie zamiast xX wstawiamy poprawne dane.
