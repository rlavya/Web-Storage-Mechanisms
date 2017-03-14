/**
 * Filename: domstorage-persist.js
 * Author: viralpatel.net
 * Description: HTML code independent form persistent
 * Usage:  persist(<form object>);
 */

function persist(form) {
/*
   * In case of page refresh, 
   * store the values of form to DOMStorage
   */
    window.onbeforeunload = function () {
        var str = serialize(form);
        try {
            sessionStorage[form.name] = str;
        } catch (e) {}
    }

/*
   * If the form was refreshed and old values are available,
   * restore the old values in form
   */
    window.onload = function () {
        try {
            if (sessionStorage[form.name]) {
                var obj = eval("(" + sessionStorage[form.name] + ")");
                for (var i = 0; i < obj.elements.length - 1; i++) {
                    var elementName = obj.elements[i].name;
                    document.forms[obj.formName].elements[obj.elements[i].name].value = obj.elements[i].value;
                }

            }
        } catch (e) {}
    }
}

/*
 * Convert form elements into JSON String
 */

function serialize(form) {
    var serialized = '{ "formName":"' + form.name + '", "elements": [';
    for (var i = 0; i < form.elements.length; i++) {

        serialized += '{';
        serialized += '"name":"' + form[i].name + '",';
        serialized += '"value":"' + form[i].value + '"';
        serialized += '},';
    }
    serialized += '{"name":0, "value":0}';
    serialized += '] }';
    return serialized;
}

/*
 * Make the Client Form persistable. 
 * i.e. Persist its values in case of page refresh
 */
persist(document.clientForm);