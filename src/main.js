const { removeSuperfluousEdgesFromGraph, customWriteFileSync} = require('./utils');
const { domainCrawler } = require('./domainCrawler')


const name = 'example';
const Url = 'https://www.example.com';

domainCrawler(Url).then(([links, graph]) => {
    const filteredGraph = removeSuperfluousEdgesFromGraph(graph);

    customWriteFileSync(`output/${name}/${name}_link-manifest.json`, JSON.stringify(links))
    customWriteFileSync(`output/${name}/${name}_adjacency-list.json`, JSON.stringify(filteredGraph))
});
