# Kjs

Bazowy moduł frameworka dostarczający najbardziej podstawowe funkcje i konfiguracje.

## właściwości

### .config

Globalny obiekt przechowujący informacje współdzielone dla komponentów,
między innymi o animacjach, kluczach API.

```js
Kjs.config = {
    fx: {
        animations: true, // włącza animacje w komponentach
        duration: 1 // współczynnik szybkości animacji
                    //(.5 to 2x wolniej, 2 to 2 razy szybciej)
    },
    map: {
        gMapsApiKey: String // klucz api GoogleMaps
    }
};
```

## metody

### namespace
- namespace: `String` nazwa przestrzeni nazw

Tworzy i zwraca obiekt w nowej przestrzeni nazw. Jeżeli całość lub część przestrzeni nazw istniała wcześniej
nie zostanie nadpisana.

```js
Kjs.namespace("ui.chart").Bar = function(config) {
    // konstruktor
};

var chart = new Kjs.ui.chart.Bar({data: [1,2,3]});
```

### clone
- source: `Object` objekt do sklonowania

Klonuje obiekt

!> Typy inne niż proste nie zostaną skopiowane, skopiowana zostanie referencja.

```js
var a = {foo: 1};
var b = Kjs.clone(a);
b.foo = 2;

// a.foo == 1
// b.foo == 2
```

### extend
- target: `Object|Array` obiekt lub tablica która zostanie rozszerzona
- source: `Object|Array` obiekt lub tablica której elementy mają zostać dołączone

Funkcja przydatna przy rozszerzaniu obiektów wielopoziomowych.

!> Ponieważ funkcja rozszerzania jest oparta na rekurencji odradza się przekazywania 
do rozszerzenia obiektów takich jak `HTMLElement`, instancjach komponentów lub innych które mogą wywołać nieskonczoną pętlę.
**Nic złego się nie stanie jeżeli taki obiekt jest właściwością źródła (czyli nie jest przekazany bezpośrednio) 
a właściwość docelowa nie jest zdefiniowana, wtedy referencja zostanie skopiowana bez wywoływania rekurencji**

```js
var a = {
    foo: 2,
    bar: {
        baz: 3,
        xyz: [ 1 ]
    }
};

var b = {
    bar: {
        baz: 1,
        xyz: [ 4, 5 ]
    },
    abc: "new property"
};

Kjs.extend(a, b);


// a == {
//     foo: 2,
//     bar: {
//         baz: 1,
//         xyz: [ 4, 5 ] // zagnieżdzone tablice nie są łączone!
//     },
//     abc: "new property"
// }

```