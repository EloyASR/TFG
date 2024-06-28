const { defineFeature, loadFeature } = require('jest-cucumber');
const puppeteer = require("puppeteer");

const feature = loadFeature('./features/login-form.feature');

let page;
let browser;

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

defineFeature(feature, test => {

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: false, slowMo: 50 });
        page = await browser.newPage();

        await page.setViewport({width: 1080, height: 1024});
        await page
            .goto("http://localhost:3000/", {
                waitUntil: "networkidle2",
            })
            .catch((err) => {console.log(err)});
    },70000);

    test('The user is not logged in the site', ({given,when,then}) => {

        let username;
        let password;

        given('An unlogged user', () => {
            username = "USER_TEST_E2E"
            password = "3WtN&O|2H>B"
        });

        when('Fill the form of Login click Login button and is redirected to profile', async () => {

            let userInput = await page.waitForSelector('input[name="name"]');
            await userInput.type(username);

            let passInput = await page.mainFrame().waitForSelector('input[name="password"]');
            await passInput.type(password);

            await expect(page).toClick('button', { text: 'Log In' });

        });

        then('The user is logged in and he log out', async () => {

            await delay(5000);

            await expect(page).toMatchElement('button', { text: 'LOG OUT' });
            await expect(page).toClick('button', { text: 'LOG OUT' });

            //Esperamos a que se desconecte del POD
            await expect(page).toMatchElement('button', { text: 'Log In' });

        });
    },15000)

    afterAll(async ()=>{
        browser.close()
    })

});