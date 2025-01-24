const fs = require('fs')
const path = require('path');
const { removeSuperfluousEdgesFromGraph } = require('./utils');

const name = 'example';
const directoryPath = `output/${name}`

domainCrawler('www.example.com').then(([links, graph]) => {
    const filteredGraph = removeSuperfluousEdgesFromGraph(graph);

    customWriteFileSync(`${directoryPath}/${name}_link-manifest.json`, JSON.stringify(links))
    customWriteFileSync(`${directoryPath}/${name}_adjacency-list.json`, JSON.stringify(filteredGraph))
});
