const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`, {
    setTimeout: 2000,
  });
});

When("user clicks on the line date, day, second in the list", async function () {
  return await clickElement(this.page, "a:nth-child(2)" , {
    setTimeout: 20000,
  });
});
When("user selects the first movie and clicks on the session time", async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='217']",  {
    setTimeout: 20000,});
});
When("user selects a row 2 and clicks on the place 4", async function () {
  return await clickElement(this.page, "div[class='buying-scheme'] div:nth-child(2) span:nth-child(4)");  
});
When("user clicks on the Book button", async function () {
  return  await clickElement(this.page, ".acceptin-button");
});

Then("user sees the row and place of reservation {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__details.ticket__chairs");
  const expected = await string;
  expect(actual).contains(expected);
});

When("user clicks on the line date, day, Saturday in the list", async function () {
  return await clickElement(this.page, "a[class='page-nav__day page-nav__day_weekend']" , {
    setTimeout: 2000,
  });
});
When("user selects the third movie and clicks on the session time", async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='199']");
});
When("user selects a row 1 and clicks on the place 1", async function () {
  return await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");  
});

Then("user sees the ticket price {string}", async function () {
  const actual = await getText(this.page, ".ticket__details.ticket__cost");
  const expected = await string;
  expect(actual).contains(expected);  
});


When("user selects a row 1 and clicks on the place 10", async function () {
  return await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(10)");  
});

When ("the user clicks on the Get booking code button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});
When ("returns to the {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`);
});

Then ("user clicks on an already reserved seat", async function () {
  const actual = await page.$eval("div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(10)", (button) => {
    return button.getAttribute("class")});
  const expected = "buying-scheme__chair_taken";
  expect(actual).contains(expected); 
});

