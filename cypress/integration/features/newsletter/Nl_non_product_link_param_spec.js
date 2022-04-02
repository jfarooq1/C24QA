import Nl_helper from '../../../support/helpers/Nl_helper';
import Nl_template_PO from '../../../support/pageObjects/Nl_template_PO';
/// <reference types="Cypress" />

describe('Check tracking parameters for non-product links', () => {

    let data;
    before(function () {

        cy.fixture('nl_urls.json').then((fixture_data) => {
            data = fixture_data;
        })
    })

    /** @type {Nl_helper} */
    const nl_helper = new Nl_helper();

    /** @type {object} */
    const nl_url_list = nl_helper.getTestData('nl_urls.json');

    /** @type {string} */
    let nl_url = "https://news.shopping.check24.de/u/gm.php?prm=VDLjGz1AeJ_766749435_6267609_1";

    /** @type {Nl_template_PO} */
    const nl_template = new Nl_template_PO(nl_url);

    // Ignore errors from the site itself
    Cypress.on('uncaught:exception', () => {
        return false;
    });



    it('C962349 Check if utm_campaign value of all non product links is the same, url: ', () => {

        /* Add your test code here
       //filter out all links which contain utm_campaign
       //check if the links were found
       //check if all paramter values are equal to each other
       */


        data.campaign_urls.forEach(url => {
            let counter = 0;
            cy.visit(url);
            cy.get('a').each(($el, index, $list) => {
                if ($el.prop('href').includes("utm_campaign")) {
                    counter++;
                    const params = new URLSearchParams('utm_campaign=nl_20220401_catgory')
                    for (const param of params) {
                        assert.equal(param[1], "nl_20220401_catgory");
                    }
                }
            }).then(() => cy.log("Total No of utm_campaign parameters Validated: " + counter))

        })
    })



    it('C955682 Check if wpset value of all non product links is the same, url: ', () => {

        /* Add your test code here
        //filter out all links which contain wpset
        //check if the links were found
        //check if all paramter values are equal to each other
        */

        data.campaign_urls.forEach(url => {
            let counter = 0;
            cy.visit(url);
            cy.get('a').each(($el, index, $list) => {
                if ($el.prop('href').includes("wpset")) {
                    counter++;
                    const params = new URLSearchParams('wpset=newsletter_shopping_02')
                    for (const param of params) {
                        assert.equal(param[1], "newsletter_shopping_02");
                    }
                }
            }).then(() => cy.log("Total No of wpset parameters Validated: " + counter))
        })
    })

})