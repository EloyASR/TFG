const { defineFeature, loadFeature } = require('jest-cucumber');
const puppeteer = require("puppeteer");

const feature = loadFeature('./features/sponsor-tournament.feature');

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

    test('The user is a company with no tournaments sponsored and decide to sponsor a tournament', ({given,when,then}) => {

        let usernameCompany;
        let passwordCompany;
        let usernameAdmin;
        let passwordAdmin;

        given('A company user without tournaments sponsored and an admin user with a tournament', () => {
            usernameCompany = "COMPANY_TEST_E2E_02"
            passwordCompany = "A#v79_Qj(r"
            usernameAdmin = "ADMIN_TEST_E2E_02"
            passwordAdmin = "ng.x5JY3V;"
        });

        when('The user log in and sponsor a tournament with a prize', async () => {

            let userInput = await page.waitForSelector('input[name="name"]');
            await userInput.type(usernameCompany);

            let passInput = await page.mainFrame().waitForSelector('input[name="password"]');
            await passInput.type(passwordCompany);

            await expect(page).toClick('button', { text: 'Log In' });

            await delay(3000);

            //NOS MOVEMOS A LA PESTAÑA DE TORNEOS Y HACEMOS CLICK EN EL PRIMER TORNEO

            await expect(page).toMatchElement('a', { text: "Torneos" });
            await expect(page).toClick('a', {text: "Torneos"});

            let tournamentItem = await page.waitForSelector('a[href="/tournament/666e311f3f5c346b27708c61"]');
            await tournamentItem.click();

            await delay(2000);

            await expect(page).toMatchElement('button', {text: "Patrocinar"});
            await expect(page).toClick('button', { text: "Patrocinar"});

            let prizeComboboxButton = await page.waitForSelector('button[id="prize-combobox-button"]');
            await prizeComboboxButton.click();

            let prizeOptionCombobox = await page.waitForSelector('div[id="prize-combobox-option-1"]');
            await prizeOptionCombobox.click();

            await delay(1000);

            await expect(page).toMatchElement('button', {text: "Aceptar"});
            await expect(page).toClick('button', {text: "Aceptar"});

            await delay(2000);

            await expect(page).toMatchElement('button', { text: 'LOG OUT' });
            await expect(page).toClick('button', { text: 'LOG OUT' });
            await expect(page).toClick('button', { text: 'LOG OUT' });

        });

        then('The admin of the tournament review the sponsor and accept it and later he remove it', async () => {

            await delay(5000);

            let userInput = await page.waitForSelector('input[name="name"]');
            await userInput.type(usernameAdmin);

            let passInput = await page.mainFrame().waitForSelector('input[name="password"]');
            await passInput.type(passwordAdmin);

            await expect(page).toMatchElement('button', { text: 'Log In' });
            await expect(page).toClick('button', { text: 'Log In' });

            await delay(1000);

            await expect(page).toMatchElement('a', { text: "Mis torneos" });
            await expect(page).toClick('a', {text: "Mis torneos"});

            let tournamentItem = await page.waitForSelector('a[href="/tournament/666e311f3f5c346b27708c61"]');
            await tournamentItem.click();

            await delay(1000);

            await expect(page).toMatchElement('button', { text: "Patrocinadores" });
            await expect(page).toClick('button', { text: 'Patrocinadores' });

            await delay(1000);

            await expect(page).toMatchElement('button', { text: "Revisar" });
            await expect(page).toClick('button', { text: 'Revisar' });

            await delay(1000);

            await expect(page).toMatchElement('button', { text: "Aprobar" });
            await expect(page).toClick('button', { text: 'Aprobar' });

            await delay(1000);

            await expect(page).toMatchElement('button', { text: "Información" });
            await expect(page).toClick('button', { text: 'Información' });

            await expect(page).toMatchElement('div', { text: "PREMIO_COMPANY_TEST_E2E_02" });

            await delay(1000);

            await expect(page).toMatchElement('button', { text: "Patrocinadores" });
            await expect(page).toClick('button', { text: 'Patrocinadores' });

            await delay(1000);

            await expect(page).toMatchElement('button', { text: "Eliminar" });
            await expect(page).toClick('button', { text: 'Eliminar' });

            await delay(1000);

            await expect(page).toMatchElement('button', { text: 'LOG OUT' });
            await expect(page).toClick('button', { text: 'LOG OUT' });
        });
    },70000)

    afterAll(async ()=>{
        browser.close()
    })

});