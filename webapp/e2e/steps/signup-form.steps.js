const { defineFeature, loadFeature } = require('jest-cucumber');
const puppeteer = require("puppeteer");

const feature = loadFeature('./features/signup-form.feature');

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

    test('The user is not signed up in the site', ({given,when,then}) => {

        let username;
        let email;
        let password;

        given('An unsigned user', () => {
            username = "USER_TEST_E2E_02"
            email = "userteste2e02@gmail.com"
            password = "123456789aB#"
        });

        when('The user fill the form of Signup click the Sign Up button', async () => {

            let SignUpLink = await page.waitForSelector('a[href="/signup"]');
            await SignUpLink.click();

            await delay(2000);

            let userInput = await page.waitForSelector('input[name="name"]');
            await userInput.type(username);

            let emailInput = await page.waitForSelector('input[name="email"]');
            await emailInput.type(email);

            let passInput = await page.mainFrame().waitForSelector('input[name="password"]');
            await passInput.type(password);

            let repeatPassInput = await page.mainFrame().waitForSelector('input[name="repeatpassword"]');
            await repeatPassInput.type(password);

            await expect(page).toClick('button', { text: 'Sign Up' });

        });

        then('The user is redirected to Login', async () => {

            await expect(page).toMatchElement('button', { text: 'Log In' });

        });
    },20000)

    afterAll(async ()=>{
        browser.close()
    })

});