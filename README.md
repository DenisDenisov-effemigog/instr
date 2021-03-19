# ds-mi frontend

## Build

#### Install modules
```sh
npm install
```

### Fix node modules
- Allow vuefy work with latest @babel/core
- Allow vue-agile to show partial slides
```sh
gulp fix
```

### Compile project
Development mode
```sh
gulp
```

Production mode
```sh
NODE_ENV=production gulp
```

## Implementation
### 1. Install twig
```
https://twig.symfony.com/
```
### 2. Add twig filters
```php
$twig->addFilter(new \Twig\TwigFilter('currency', function ($string) {
    return number_format($string, 2, '.', ' ');
}));
```
### 3. Install frontend package as an updatable packet
Use composer or git submodules
### 4. Symlink folders
```sh
ln -s frontend_package/public/css/ your_public_path/css/
ln -s frontend_package/public/fonts/ your_public_path/fonts/
ln -s frontend_package/public/images/ your_public_path/images/
ln -s frontend_package/public/js/ your_public_path/js/
```   
### 5. Build frontend project
```sh
npm install
gulp fix
NODE_ENV=production app:build
```
### 6. Include templates
from 'frontend_package/src/templates' path
ex
```twig
{% include 'frontend_package/src/templates/slider-main.twig' %}
```

## Code conventions
- Mobile-first
- BEM
```
block__element--modificator
```
- Vue components include
```html
<component is="component-name"></component>
```