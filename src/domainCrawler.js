const { Builder, Browser, By, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const { sleep, defaultBlacklist } = require('./utils')


async function domainCrawler(startingPage, sleepInterval = 1000, blacklist = defaultBlacklist) {
    if (!startingPage) {
        throw "Must specify target"
    }

    let driver = await new Builder().forBrowser(Browser.FIREFOX).build()

    let visited = new Set();
    let stack = [];
    let adjList = {};

    stack.push(startingPage);

    while (stack.length > 0) {
        // Sleeping a resonable time between requests is polite
        await sleep(sleepInterval);
        await addUnvisitedToStack(stack.pop());
    }

    async function addUnvisitedToStack(page) {
        if (visited.has(page)) {
            return;
        }

        visited.add(page)

        try {
            console.log(`Scanning: ${page}`);
            await driver.get(page)

            const anchorElements = await driver.findElements(By.css('a'))
            const links = await Promise.all(anchorElements.map(async result => result.getAttribute('href')));

            const unvisitedLinks = links.filter(link => link?.length > 0) // Not empty
                                        .filter(link => link.includes(startingPage)) // Not external
                                        .filter(link => !blacklist.some(regexp => regexp.test(link))); // Not blacklisted
                                        
            if (!adjList[page]) {
                adjList[page] = [];
            }

            for (let link of unvisitedLinks) {
                adjList[page].push(link);

                if (!visited.has(link) && !stack.includes(link)) {
                    stack.push(link)
                }
            }
            
            console.log(`Pages visited: ${visited.size}`);
            console.log(`Pages remaining: ${stack.length}`);
        } catch (error) {
            console.log(error)
        }
    }

    await driver.quit()

    return [[...visited], adjList]
}


module.exports = {
    domainCrawler
}
