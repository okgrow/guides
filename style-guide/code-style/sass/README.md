# Sass

## Formatting
* Use SCSS syntax.
* Use a space between CSS property and its value, `<property>: <value>`.
* Use a space between CSS selector and code block, `selector {}`.
* Use a new line after the comma when listing selectors.
* Use hex values for colors when possible.
* Don't specify a unit after using a 0 value.
* Avoid nesting more than 2 levels, unless pseudo classes.

## Naming Convention
* Employ the use of BEM when possible.
* Use kebab-case for selector names.
* Don't use ID's for styling.
* Don't select HTML elements, unless setting it's base styles.
* Only target classes, avoid targeting using the html elements, `div.info`.

## Order 
* Place media queries before entering a new nested selector.
* Place nested pseudo classes after media queries.
* Place nested concatenated classes after nested pseudo classes.
* Place concatenated modifier classes after their partnering classes.

## Structure
* Employ ITCSS to structure your CSS codebase.
* Be sure to separate BEM modules to their own files.
