![Logo](https://www.browserstack.com/images/static/header-logo.jpg)

# BrowserStack Examples WebdriverIO <a href="https://webdriver.io/"><img src="https://avatars.githubusercontent.com/u/72550141?s=48&v=4" alt="WebdriverIO" height="22" /></a> <a href="https://nodejs.org/en/"><img src="https://brandslogos.com/wp-content/uploads/images/large/nodejs-icon-logo.png" alt="nodejs" height="22" /></a> <a href="https://mochajs.org/"><img src="https://brandslogos.com/wp-content/uploads/images/large/mocha-logo.png" alt="mochs" height="22" /></a>

## Introduction

WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and flakiness test suite.

---

## Repository setup

- Clone the repository

- Ensure you have the following dependencies installed on the machine
  - NodeJS >= 14.16.0 (includes npm 6.14.11)

- Run below command to configure dependencies

    ```sh
    npm install
    ```

## About the tests in this repository

  This repository contains the following test profiles:

| Profiles      | Description                                                                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bstack-wdio-standalone    | Sequential or coordinated multi-platform scenario execution using Mocha default runner  |
| bstack-multiremote | Specializes in coordinated multi-platform scenario execution using WDIO multiremote functionality                            |
| bstack-parallel | Sequential or multi-platform scenario execution using native WDIO test runner. Uses native WDIO test runner and same configs as other regular scenarios.                             |
| bstack-parallel-app  |  Sequential or coordinated multi-platform scenario execution for mobile web and mobile app. Useful for testing deep link scenarios.                                                         |


The scenarios also have a BrowserStackLocal equivalent profile. This is needed if test servers are in an internal network.  
  ---


## Test infrastructure environments 

- [BrowserStack](#browserstack)


## Configuring the maximum parallel test threads for this repository

  For all the parallel run configuration profiles, you can configure the maximum parallel test threads by changing the settings below.
  
  - BrowserStack
    
    `./resources/conf/*.conf.js`

    ```js
    maxInstances: 5,
    ...
    ```

## Test Reporting

- [Mochawesome reports](#generating-mochawesome-reports)

---

## BrowserStack App Upload

- Upload your app on BrowserStack using cUrl or a REST Client.

  cUrl Example:

  ```sh
    curl -u $BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY \
    -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
    -F "file=@<DIR_PATH>/browserstack-examples-cucumber-testng/app/*.<apk/aab/ipa>" \
    -F "custom_id=<custom_name_for_app>"
  ```

  where, <DIR_PATH> = Directory path to the repossitory on the machine.


# BrowserStack

[BrowserStack](https://browserstack.com) provides instant access to 2,000+ real mobile devices and browsers on a highly reliable cloud infrastructure that effortlessly scales as testing needs grow.

## Prerequisites

- Create a new [BrowserStack account](https://www.browserstack.com/users/sign_up) or use an existing one.
- Identify your BrowserStack username and access key from the [BrowserStack Automate Dashboard](https://automate.browserstack.com/) and export them as environment variables using the below commands.

    - For \*nix based and Mac machines:

  ```sh
  export BROWSERSTACK_USERNAME=<browserstack-username> &&
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

    - For Windows:

  ```shell
  set BROWSERSTACK_USERNAME=<browserstack-username>
  set BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```
  
  Alternatively, you can also hardcode username and access_key objects in conf files releated to BrowserStack at `./resources/conf/` file.

Note:
- We have configured a list of test capabilities in the files at `./resources/conf/`. You can certainly update them based on your device / browser test requirements. 
- The exact test capability values can be easily identified using the [Browserstack Automate Capability Generator](https://browserstack.com/automate/capabilities) OR [Browserstack App Automate Capability Generator](https://browserstack.com/app-automate/capabilities)


## Running Your Tests

### Run automation tests on BrowserStack

- How to run the test?
  
  1. bstack-wdio-standalone

    ```sh
    BROWSERSTACK_BUILD_NAME=MultidriverStandaloneBuild_$(date +%s) npm run bstack-wdio-standalone
    ```
  2. bstack-multiremote

    ```sh
    BROWSERSTACK_BUILD_NAME=MultiremoteBuild_$(date +%s) npm run bstack-multiremote
    ```

  3. bstack-parallel

    ```sh
    BROWSERSTACK_BUILD_NAME=MultiremoteBuild_$(date +%s) npm run bstack-parallel
    ```
  
  4. bstack-parallel-app

    ```sh
    BROWSERSTACK_BUILD_NAME=SwitchActivityBuild_$(date +%s) npm run bstack-parallel-app
    ```

## Generating Mochawesome reports

- Generate Report using the following command: `npm run generateMochawesome`

## Additional Resources

- View your test results on the [BrowserStack Automate dashboard](https://www.browserstack.com/automate) OR [BrowserStack App Automate dashboard](https://www.browserstack.com/app-automate) 
- Documentation for writing [Automate test scripts in WebdriverIO NodeJS](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/webdriverio)
- Customizing your tests capabilities on BrowserStack using our [Automate test capability generator](https://www.browserstack.com/automate/capabilities) OR [App Automate test capability generator](https://www.browserstack.com/app-automate/capabilities)
- Use [Automate REST API](https://www.browserstack.com/automate/rest-api) OR [App Automate REST API](https://www.browserstack.com/app-automate/rest-api) to access information about your tests via the command-line interface
- Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github)
- For testing public web applications behind IP restriction, [Inbound IP Whitelisting](https://www.browserstack.com/local-testing/inbound-ip-whitelisting) can be enabled with the [BrowserStack Enterprise](https://www.browserstack.com/enterprise) offering