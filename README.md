# Configurations-Persister
Angular+NWJS module that saves chosen data to a json and on page reload reapply on the views.

#Usage
import all js files in the html and
use the `persist-value` directive with the optional desired save value, for now it only supports one option
```
<configurations>
            <div>
            <ul>
                <li>
                    <label for='input'>Some text</label>
                    <input ng-model='tst.count' id="input" name='input' persist-value="value">
                </li>
                <li>
                    <select persist-value="value">
                        <option value='A' >A</option>
                        <option value='B' >B</option>
                    </select>

                </li>

                <li>
                    <input type='checkbox' id="checkbox" name='checkbox' persist-value="checked">
                    <label for='checkbox'>Enable</label>
                </li>
                <li>
                    <input type='radio' id="radio" name='radio' persist-value="checked">
                    <label for='radio'>Enable</label>
                    <input type='radio' id="anotherradio" name='radio' persist-value="checked">
                    <label for='outroradio'>Another radio</label>
                </li>
            </ul>
            <button id="save" persist-all>Save</button>
            </div>
        </configurations>
```
and use `persist-all` directive, that save the specified key in a JSON.
```
<button id="save" persist-all>Save</button>
```
