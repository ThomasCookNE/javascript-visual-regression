const puppeteer = require('puppeteer');
const conf = require('../conf');
const elements = require('./elements');

exports.takeScreenshot = async function(settings) {
  let browser;
  if (conf.puppeteer.useChromeNotChromium === true) {
    browser = await puppeteer.launch( { headless: conf.puppeteer.headless, executablePath: conf.puppeteer.chromePath } );
  } else {
    browser = await puppeteer.launch( { headless: conf.puppeteer.headless } );
  }
  const page = await browser.newPage();
  await page.setViewport({
    width: settings.width,
    height: settings.height
  });
  await page.goto(settings.url, { waitUntil: 'networkidle2' });
  await elements.hide(settings, page);
  await elements.remove(settings, page);
  const element = await page.$(settings.element);
  settings.snapshot = await element.screenshot();
  await browser.close();
};
