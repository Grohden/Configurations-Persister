# Configurations-Persister
Angular+NWJS module that saves chosen data to a json and on page reload reapply on the views.

#Usage
import all js files in the html and
use the `gr-persist` directive with the optional desired save value, you can pass an array with desired options, like the example below.
```
<configurations>
            <div>
            <ul>
                <li>
                    <label for='input'>Some text</label>
                    <input id="input" name='input' data-gr-persist="'value'">
                </li>
                <li>
                    <select persist-value="value">
                        <option value='A' >A</option>
                        <option value='B' >B</option>
                    </select>

                </li>

                <li>
                    <input type='checkbox' id="checkbox" name='checkbox' data-gr-persist="'checked'">
                    <label for='checkbox'>Enable</label>
                </li>
                <li>
                    <input type='radio' id="radio" name='radio' data-gr-persist="'checked'">
                    <label for='radio'>Enable</label>
                    <input type='radio' id="anotherRadio" name='radio' data-gr-persist="['checked','value']">
                    <label for='anotherRadio'>Another Radio</label>
                </li>
            </ul>
            <button id="save" data-gr-save>Save</button>
            </div>
</configurations>
```
and use `gr-save` directive, that save the specified key in a JSON. (it uses the click from jquery, its a problem to solve latter)
```
<button id="save" persist-all>Save</button>
```
