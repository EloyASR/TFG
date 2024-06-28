const { defineFeature, loadFeature } = require('jest-cucumber');
const puppeteer = require("puppeteer");

const feature = loadFeature('./features/tournament-creation.feature');

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

    test('The user is an admin with no tournaments created and create a simple tournament', ({given,when,then}) => {

        let username;
        let password;

        given('An admin user without tournaments', () => {
            username = "ADMIN_TEST_E2E"
            password = "19|LjB#@op"
        });

        when('The user log in and create a tournament', async () => {

            //RELLENAMOS EL FORMULARIO DE LOGIN

            let userInput = await page.waitForSelector('input[name="name"]');
            await userInput.type(username);

            let passInput = await page.waitForSelector('input[name="password"]');
            await passInput.type(password);

            await expect(page).toClick('button', { text: 'Log In' });

            await delay(2000);

            //NOS MOVEMOS A LA PESTAÑA DE MIS TORNEOS Y HACEMOS CLICK EN EL BOTÓN DE CREAR TORNEO

            await expect(page).toMatchElement('a', { text: "Mis torneos" });
            await expect(page).toClick('a', {text: "Mis torneos"});

            await expect(page).toMatchElement('button', {text: "Crear Torneo"});
            await expect(page).toClick('button', { text: "Crear Torneo"});

            await delay(2000);

            //RELLENAMOS EL FORMULARIO DE CREACIÓN PASO 1

            let tournamentNameInput = await page.waitForSelector('input[name="tournament-name"]');
            await tournamentNameInput.type("TOURNAMENT_ADMIN_TEST_E2E");

            let leagueDiv = await page.waitForSelector('div[id="LEAGUE_OF_LEGENDS-img"]');
            await leagueDiv.click();

            let sizeComboboxButton = await page.waitForSelector('button[id="size-combobox-button"]');
            await sizeComboboxButton.click();

            let sizeOptionCombobox = await page.waitForSelector('div[id="size-combobox-option-1"]');
            await sizeOptionCombobox.click();

            await delay(1000);

            //HACEMOS CLICK EN SIGUIENTE

            await expect(page).toMatchElement('button', {text: "Continuar"});
            await expect(page).toClick('button', {text: "Continuar"});

            //RELLENAMOS EL FORMULARIO DE CREACIÓN PASO 2

            let descriptionTextArea = await page.waitForSelector('textarea[name="description"]');
            await descriptionTextArea.type("Descripción del torneo de admin_test_e2e");

            let rulesTextArea = await page.waitForSelector('textarea[name="rules"]');
            await rulesTextArea.type("Reglas del torneo de admin_test_e2e");

            await delay(1000);

            //HACEMOS CLICK EN SIGUIENTE

            await expect(page).toMatchElement('button', {text: "Continuar"});
            await expect(page).toClick('button', {text: "Continuar"});

            //RELLENAMOS EL FORMULARIO DE CREACIÓN PASO 3

            let phaseNameInput = await page.waitForSelector('input[name="phasename-0"]');
            await phaseNameInput.type("FASE_1_TORNEO");

            let typeComboboxButton = await page.waitForSelector('button[id="phasetype-0-combobox-button"]');
            await typeComboboxButton.click();

            let typeOptionCombobox = await page.waitForSelector('div[id="phasetype-0-combobox-option-1"]');
            await typeOptionCombobox.click();

            let numberOfPlayersComboboxButton = await page.waitForSelector('button[id="numerojugadores-0-combobox-button"]');
            await numberOfPlayersComboboxButton.click();

            let numberOfPlayersOptionCombobox = await page.waitForSelector('div[id="numerojugadores-0-combobox-option-0"]');
            await numberOfPlayersOptionCombobox.click();

            let bestOfComboboxButton = await page.waitForSelector('button[id="encuentromejorde-0-combobox-button"]');
            await bestOfComboboxButton.click();

            let bestOfOptionCombobox = await page.waitForSelector('div[id="encuentromejorde-0-combobox-option-1"]');
            await bestOfOptionCombobox.click();

            await delay(1000);

            //HACEMOS CLICK EN SIGUIENTE

            await expect(page).toMatchElement('button', {text: "Continuar"});
            await expect(page).toClick('button', {text: "Continuar"});

            //DEJAMOS FECHAS POR DEFECTO Y HACEMOS CLICK EN CREAR

            await delay(1000);

            await expect(page).toMatchElement('button', {text: "Crear"});
            await expect(page).toClick('button', {text: "Crear"});

            await delay(5000);

        });

        then('The user is redirected to tournaments list and the tournament appear in the list of tournaments', async () => {

            await delay(5000);

            await expect(page).toMatchElement('div', { text: 'TOURNAMENT_ADMIN_TEST_E2E' });
        });
    },70000)

    afterAll(async ()=>{
        browser.close()
    })

});