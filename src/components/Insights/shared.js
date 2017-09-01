function fetchTermFromMap(termMap, termLookup, selectedLanguage, defaultLanguage){
    const name = termLookup.toLowerCase();

    return termMap.get(name) || {name: name, translatedname: name};
}

module.exports = {
    fetchTermFromMap
}