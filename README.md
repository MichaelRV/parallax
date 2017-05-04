# Parallax

#### [LIVE DEMO](#)

## Version

1.0

## Basic usage

- HTML

```html
<div class="parallax-container">
  <div class="parallax"></div>
</div>
```

- CSS

```css
.parallax {
  transition: transform 1s linear;
}

.parallax-container.hover .parallax {
  transition: none;
}
```

- JavaScript

```javascript
$('.parallax').parallax();
```

## Options (defaults)

```javascript
$('.parallax').parallax({
  container: '.parallax-container',
  container_hover_class: 'hover',
  depth: 0.5,
  axis: null,
  parallaxmove: true,
  mousemove: true
});
```