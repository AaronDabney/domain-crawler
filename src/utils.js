const fs = require('fs')
const path = require('path');


class InvalidInputError extends Error {}

/**
 * Can create folders if needed
 * @param {*} filePath 
 * @param {*} content 
 */
function customWriteFileSync(filePath, content) {
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }

    fs.writeFileSync(filePath, content)
}

async function sleep(interval) {
    return new Promise(resolve => setTimeout(resolve, interval));
}

/**
 * Removes edges that move from Node A -> B twice
 * while preserving B -> A connections
 * @param {*} graph 
 * @returns 
 */
function removeSuperfluousEdgesFromGraph(graph) {
    const filterGraph = {}

    for (let [key, value] of Object.entries(graph)) {
        const compressedArray = [...(new Set(value))];
        filterGraph[key] = compressedArray;
    }

    return filterGraph;
}

/**
 * Modifiers to URL that (usually) only change how content is displayed
 */
const navigationUrlFragments = [/#/, /[?]C=\w;O=\w/]
const languageUrlFragments = [/[/]ne[/]/, /[/]pt[/]/, /[/]de[/]/, /[/]fr[/]/, /[/]ar[/]/, /[/]ru[/]/, /[/]tl[/]/, /[/]ja[/]/, /[/]th[/]/, /[/]ko[/]/, /[/]es[/]/, /[/]vi[/]/, /[/]zh_cn[/]/, /[/]zh[/]/];
const defaultUrlBlacklist = [...navigationUrlFragments, ...languageUrlFragments]


module.exports = {
    customWriteFileSync,
    sleep,
    removeSuperfluousEdgesFromGraph,
    defaultUrlBlacklist,
    InvalidInputError
}
