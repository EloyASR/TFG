const { defineFeature, loadFeature } = require('jest-cucumber');
const puppeteer = require("puppeteer");

const feature = loadFeature('./features/prize-creation.feature');

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

    test('The user is a company with no prizes created and create a simple prize', ({given,when,then}) => {

        let username;

        let password;

        given('A company user without prizes', () => {
            username = "COMPANY_TEST_E2E"
            password = "A#v79_Qj(r"
        });

        when('The user log in and create a prize', async () => {

            //RELLENAMOS EL FORMULARIO DE LOGIN

            let userInput = await page.waitForSelector('input[name="name"]');
            await userInput.type(username);

            let passInput = await page.waitForSelector('input[name="password"]');
            await passInput.type(password);

            await expect(page).toClick('button', { text: 'Log In' });

            await delay(2000);

            //NOS MOVEMOS A LA PESTAÑA DE MIS PREMIOS Y HACEMOS CLICK EN EL BOTÓN DE CREACIÓN

            await expect(page).toMatchElement('a', { text: "Mis premios" });
            await expect(page).toClick('a', {text: "Mis premios"});

            await expect(page).toMatchElement('button', {text: "Crear premio"});
            await expect(page).toClick('button', { text: "Crear premio"});

            await delay(2000);

            //RELLENAMOS EL FORMULARIO DE CREACIÓN

            let titleInput = await page.waitForSelector('input[name="name"]');
            await titleInput.type("PREMIO_COMPANY_TEST_E2E");

            let descriptionTextArea = await page.waitForSelector('textarea[name="description"]');
            await descriptionTextArea.type("Descripción de premio de company_test_e2e");

            await delay(5000);

            //HACEMOS CLICK EN ACEPTAR

            await expect(page).toMatchElement('button', {text: "Aceptar"});
            await expect(page).toClick('button', {text: "Aceptar"});

        });

        then('The user is redirected to prizes list and the prize appear in the list of prizes', async () => {

            await delay(2000);

            await expect(page).toMatchElement('div', { text: 'PREMIO_COMPANY_TEST_E2E' });
        });
    },60000)

    afterAll(async ()=>{
        browser.close()
    })

});