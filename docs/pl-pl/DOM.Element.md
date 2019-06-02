# Sb.Element

Wraper elementów HTML upraszczający operacje na nich.

## Szablony

`Sb.Element` posiada statyczną metode `render` która utworzy nowy `Sb.Element` zawierający element
HTML skonstruowany z przekazanego szablonu.

```js
var button = Sb.Element.render("<button></button>");
```

## właściwości

### config: `Object`

### id: `String`
identyfikator elementu.

### nativeElement: `HTMLElement`
element opakowany przez instancję.

### listeners: `Object`
obiekt przechowujący wszystkie funkcje obsługujące zdarzenia.

### template: `String|Sb.Template` 
Szablon użyty do skonstruowania elementu jeżeli został utworzony przez `Sb.Element.render`.

## metody

### constructor
- el: `HTMLElement` element do opakowania
- config: `Object` konfiguracja

### hasClass
- cls: `String` klasa CSS

- *return* `Boolean` **true** jeżeli element posiada daną klasę CSS

Sprawdza czy element posiada aktualnie klasę CSS.

### addClass
- cls: `String` klasa CSS

Dodaje klasę CSS do elementu.

### removeClass
- cls: `String` klasa CSS

Usuwa klasę CSS z elementu.

### toggleClass
- cls: `String` klasa CSS

Dodaje klasę CSS do elementu jeżeli nie była dodana lub usuwa ją jeżeli była.

### on
- event: `String` nazwa zdarzenia
- handler: `Function` funkcja wywołana podczas zdarzenia

Dodaje obsługę zdarzenia do elementu.

### off
- event: `String` nazwa zdarzenia
- handler: `Function` funkcja wywołana podczas zdarzenia

Wyłącza obsługę zdarzenia do elementu.

### hide
- useVisibility: `Boolean` używaj opcji *visibility*

Ukrywa element poprzez dodanie mu klasy CSS `hidden` (`display:none`) lub `invisible` (`hidden:true` jeżeli włączono `useVisibility`). 

?> Użycie `useVisibility` spowoduje ukrycie elementu ale zachowania zajmowanego przez niego miejsca.

### show 

Pokazuje element usuwając z niego klasę `hidden` oraz `invisible`.

### toggle
- useVisibility: `Boolean` używaj opcji *visibility*

Ukrywa element jeżeli był widoczny lub pokazuje jeżeli był ukryty.

### append
- element: `HTMLElement` element który ma zostać dodany

Dodaje element HTML który ma zostać dodany wewnątrz tego elementu.

### setAttribute
- name: `String` nazwa atrybutu
- value: `any` wartość

Ustawia wartość atrybutu elementu HTML.