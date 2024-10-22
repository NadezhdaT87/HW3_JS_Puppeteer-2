const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php")
  await page.setDefaultNavigationTimeout(6000);
});

afterEach(() => {
  page.close();
});

describe("Let'sGoToTheCinema happy path", () => { 

  test("Successful ticket purchase", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await page.waitForSelector(".buying__info-title", {
          visable: true,});
    await clickElement(page, "div[class='buying-scheme'] div:nth-child(2) span:nth-child(4)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__details.ticket__chairs");
    const expected = "2/4";
    expect(actual).toContain(expected);
    });
    
    test("Successful VIP-ticket purchase", async () => {
      await clickElement(page, "a[class='page-nav__day page-nav__day_weekend']");
      await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
      await page.waitForSelector(".buying__info-start", {
            visable: true,});
      await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
      await clickElement(page, ".acceptin-button");
      await page.waitForSelector(".ticket__details.ticket__cost", {
      visable: true,});
    await clickElement(page, ".acceptin-button");
      const actual = await getText(page, ".ticket__details.ticket__cost");
      const expected = "1000";
      expect(actual).toContain(expected);
      }); 
});

test.only("Unsuccessful VIP-ticket purchase", async () => {
    
    await clickElement(page, "a[class='page-nav__day page-nav__day_weekend']");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
    await page.waitForSelector(".buying__info-start", {
          visable: true,});
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(10)");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__details.ticket__cost", {
      visable: true,});
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__check-title", {
      visable: true,});
      
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a[class='page-nav__day page-nav__day_weekend']");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
    await page.waitForSelector(".buying__info-start", {
          visable: true,});
      
    const btnDisabledClass = await page.$eval("div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(10)", (button) => {
    return button.getAttribute("class")});
    const actual = btnDisabledClass;    
    const expected = "buying-scheme__chair_taken";
    expect(actual).toContain(expected);

    }); 

