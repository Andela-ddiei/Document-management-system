const config = require('../../../../nightwatch.conf.js');

module.exports = {
  'Create Document': function (browser) {
    browser
      .url('http://localhost:5050/app/')
      .waitForElementVisible('body')
      .click('a.login-btn')
      .setValue('input[type=text]', 'kez')
      .setValue('input[type=password]', 'damisi')
      .click('button[type="submit"]')
      .waitForElementVisible('div.center')
      .assert.containsText('div.center', 'Login Successful')
      .pause(1500)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .waitForElementVisible('body')
      .click('a#createDoc')
      .waitForElementVisible('div#modal')
      .waitForElementVisible('div#createDocModal')
      .assert.elementPresent('h4')
      .assert.containsText('h4#eh4', 'Create a Document')
      .useXpath()
      .setValue('(//input[@id="title"])[2]', 'Issa Title')
      .useCss()
      .click('select[id="selectAccess"] option[value="private"]')
      .pause(5000)
      .execute('tinyMCE.activeEditor.setContent("This is my new content!")')
      .pause(5000)
      .click('button#done')
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .assert.elementPresent('table')
      .end();
  },
  'Edit Document': function (browser) {
    browser
     .url('http://localhost:5050/app/')
      .waitForElementVisible('body')
      .click('a.login-btn')
      .setValue('input[type=text]', 'kez')
      .setValue('input[type=password]', 'damisi')
      .click('button[type="submit"]')
      .waitForElementVisible('div.center')
      .assert.containsText('div.center', 'Login Successful')
      .pause(2000)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .waitForElementVisible('body')
      .click('a#createDoc')
      .waitForElementVisible('div#modal')
      .waitForElementVisible('div#createDocModal')
      .assert.elementPresent('h4')
      .assert.containsText('h4#eh4', 'Create a Document')
      .useXpath()
      .setValue('(//input[@id="title"])[2]', 'Issa Title')
      .useCss()
      .click('select[id="selectAccess"] option[value="private"]')
      .execute('tinyMCE.activeEditor.setContent("This is my new content!")')
      .click('button#done')
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .assert.elementPresent('table')
      .end();
  },
  'Delete Document': function (browser) {
    browser
      .url('http://localhost:5050/app/')
      .waitForElementVisible('body')
      .click('a.login-btn')
      .setValue('input[type=text]', 'kez')
      .setValue('input[type=password]', 'damisi')
      .click('button[type="submit"]')
      .waitForElementVisible('div.center')
      .assert.containsText('div.center', 'Login Successful')
      .pause(2000)
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .waitForElementVisible('body')
      .click('a#createDoc')
      .waitForElementVisible('div#modal')
      .waitForElementVisible('div#createDocModal')
      .assert.elementPresent('h4')
      .assert.containsText('h4#eh4', 'Create a Document')
      .useXpath()
      .setValue('(//input[@id="title"])[2]', 'Issa Title')
      .useCss()
      .click('select[id="selectAccess"] option[value="private"]')
      .execute('tinyMCE.activeEditor.setContent("This is my new content!")')
      .click('button#done')
      .assert.urlEquals('http://localhost:5050/app/dashboard')
      .assert.elementPresent('table')
      .end();
  }
};