# Configurations-Persister
Angular+NWJS module that persists inputs data
(the module only persists 'value' and checked 'attributes' for now)

#Usage
import all js files in the html
Use the `persist-value` directive
```
<input type='text' persist-value>
<input type='text' persist-value>
```
and use `persist-all` directive, that saves inputs/whatever have persist-value directive in a JSON.
```
<button persist-all>
```
