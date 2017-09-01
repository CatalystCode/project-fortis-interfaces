<<<<<<< HEAD
function fetchTermFromMap(termMap, termLookup, selectedLanguage, defaultLanguage) {
    const name = termLookup.toLowerCase();

    return termMap.get(name) || { name: name, translatedname: name };
}

function fromMapToArray(termMap, termLookup) {
    const name = termLookup.toLowerCase();

    return Array.from(termMap.values())
        .filter(topic => topic.translatedname.toLowerCase().indexOf(name) > -1);
}

function innerJoin(arr1, arr2) {
    let out = new Set();

    arr1.forEach(item => {
        if (arr2.indexOf(item) > -1) {
            out.add(item);
        }
    });

    return Array.from(out);
}

module.exports = {
    fetchTermFromMap,
    fromMapToArray,
    innerJoin
=======
function fetchTermFromMap(termMap, termLookup, selectedLanguage, defaultLanguage){
    const name = termLookup.toLowerCase();

    return termMap.get(name) || {name: name, translatedname: name};
}

module.exports = {
    fetchTermFromMap
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
}