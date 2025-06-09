const { globalTimeout } = require('../playwright.config')

module.exports = {
    /**
     * Navigate to a specific URL.
     * @param {object} page - The playwright page instance.
     * @param {string} url - The URl to navigate to.
     */
    navigateToURL: async (page, url) => {
        if (!url) {
            throw new Error('URL is required to navigate...')
        }
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');
        console.log(`Navigated to: ${url}`)
    },

    waitForElement: async (page, element, timeout = globalTimeout) => {
        const { selector, locateStrategy } = element;

        try {
            if (locateStrategy === 'xpath') {
                console.log(`Waiting for element using XPath: ${selector}`);
                await page.locator(`xpath=${selector}`).waitFor({ timeout, state: 'visible' });
            } else if (locateStrategy === 'css') {
                console.log(`Waiting for element using CSS: ${selector}`);
                await page.waitForSelector(selector, { timeout, state: 'visible' });
            } else {
                throw new Error(`Invalid locateStrategy: ${locateStrategy}. Expected 'xpath' or 'css'.`);
            }
            console.log(`Element is visible: ${selector}`);
        } catch (error) {
            console.error(`Error waiting for element: ${error.message}`);
            throw error;
        }
    },

    textContains: async (page, element, expectedText, log = true, testInfo) => {
        const { selector, locateStrategy } = element;
        let logs = '';

        try {
            let elementLocator;

            if (locateStrategy === 'xpath') {
                elementLocator = page.locator(`xpath=${selector}`);
            } else if (locateStrategy === 'css') {
                elementLocator = page.locator(selector);
            } else {
                throw new Error(`Invalid locateStrategy: ${locateStrategy}. Expected 'xpath' or 'css'.`);
            }

            const actualText = await elementLocator.textContent();
            logs += `Actual text found: "${actualText}"\n`;

            if (!actualText.includes(expectedText)) {
                logs += `Assertion failed: Expected element text to contain "${expectedText}", but found "${actualText}"\n`;
                throw new Error(`Assertion failed: Expected element text to contain "${expectedText}", but found "${actualText}"`);
            }

            if (log) {
                const successLog = `Assertion passed: Element contains text "${expectedText}" using ${
                    locateStrategy === 'xpath' ? 'XPath' : 'CSS'
                } selector: ${selector}\n`;
                console.log(successLog);
                logs += successLog;
            }
        } catch (error) {
            logs += `Error in textContains: ${error.message}\n`;
            console.error(logs);

            if (testInfo) {
                testInfo.attach('textContains Logs', {
                    body: logs,
                    contentType: 'text/plain',
                });
            }

            throw error;
        }
    },

    checkIfURLContains: async (page, substring) => {
        const currentURL = await page.url();
        if (currentURL.includes(substring)) {
            console.log(`The URL contains the substring: "${substring}"`);
            return true;
        } else {
            console.log(`The URL does not contain the substring: "${substring}"`);
            return false;
        }
    },

    screenshotFullPage: async ({ page, testInfo, screenshotPath, description }) => {
        try {
    
            await page.screenshot({
                path: screenshotPath,
                fullPage: true,
            });
    
            console.log(`Screenshot saved at: ${screenshotPath}`);
    
            testInfo.attach(description, {
                path: screenshotPath,
                contentType: 'image/png',
            });
        } catch (error) {
            console.error(`Failed to capture screenshot: ${error.message}`);
        }
    },

   /**
    * Capture a Screenshot.
    * @param {object} page - The Playwright page instance.
    * @param {object} page - The file path to save the screenshot.
   */
   takeScreenshot: async (page, filePath) => {
        await page.screenshot({ path: filePath });
        console.log(`Screeshot saved at: ${filePath}`);
   }

};