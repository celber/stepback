# Sb.Component

Komponenty stanowią podstawę w budowie interfejsu użytkownika. Nie powinny być używane bezpośrednio a
jako baza którą rozszerza się do własnych potrzeb i funkcjonalności budowanego komponentu.

## właściwości

### id: `String`
Unikalny identyfikator komponentu.

### el: `Sb.Element`
Opakowany w `Sb.Element` element DOM.

### rendered: `Boolean`
Informacja o tym czy element został wyrenderowany do drzewa DOM.

### parent: `Sb.Container|HTMLElement`
Kontener lub element HTML w którym komponent został wyrenderowany.

### classList: `String[]`
Lista klass CSS.

!> Listy klas nie należy modyfikować bezpośrednio a poprzez metody [addClass](#addClass) i [removeClass](#removeClass)

### template: `Sb.Template|String`
Szablon HTML komponentu.

## metody

### renderTo
- target: `Sb.Container|HTMLElement` kontener do którego komponent ma być wyrenderowany

Wywołanie tej funkcji powoduje zarówno wyrenderowanie szablonu wraz z dodaniem mu
klas CSS i dołączenie go do drzewa DOM we wskazanym miejscu.

### addClass
- cls: `String` klasa CSS

Dodaje klasę CSS do **wyrenderowanego** komponentu.

### removeClass
- cls: `String` klasa CSS

Usuwa klasę CSS z **wyrenderowanego** komponentu.