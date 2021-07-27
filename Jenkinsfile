import org.jenkinsci.plugins.pipeline.modeldefinition.Utils
import groovy.json.JsonSlurperClassic
node {
    try {
        properties([
            pipelineTriggers([
                [
                    $class: 'TimerTrigger',
                    spec: 'H 0 * * 5'
                ],
                [
                    $class: 'GenericTrigger',
                        genericVariables: [
                            [key: 'data', value: '$']
                        ],
                    token: 'wdio-multiplatform-scenarios-boilerplate',
                    tokenCredentialId: '',
                    printContributedVariables: true,
                    printPostContent: true,
                    silentResponse: false
                ]
            ]),
            parameters([
                credentials(credentialType: 'com.browserstack.automate.ci.jenkins.BrowserStackCredentials', defaultValue: 'samiran11', description: 'Select your BrowserStack Username', name: 'BROWSERSTACK_USERNAME', required: true),
                [$class: 'ExtensibleChoiceParameterDefinition',
                choiceListProvider: [
                    $class: 'TextareaChoiceListProvider',
                    addEditedValue: false,
                    choiceListText: '''bstack-wdio-standalone
bstack-multiremote
bstack-parallel
bstack-parallel-app''',
                    defaultChoice: 'bstack-wdio-standalone'
                ],
                description: 'Select the test you would like to run',
                editable: false,
                name: 'TEST_TYPE']
            ])
        ])
        stage('Pull from Github') {
            def branch = 'main'
            dir('test') {
                git branch: "${branch}", changelog: false, poll: false, url: 'https://github.com/samirans89/wdio-multiplatform-scenarios-boilerplate.git'
            }
        }
        stage('Run Test') {
            browserstack(credentialsId: "${params.BROWSERSTACK_USERNAME}", localConfig: [localOptions: '', localPath: '']) {
                def user = "${env.BROWSERSTACK_USERNAME}"
                if ( user.contains('-')) {
                    user = user.substring(0, user.lastIndexOf('-'))
                }
                if (!params.TEST_TYPE) {
                    env.TEST_TYPE = "bstack-wdio-standalone"
                }
                withEnv(['BROWSERSTACK_USERNAME=' + user]) {
                    sh label: '', returnStatus: true, script: '''#!/bin/bash -l
                                                                cd test
                                                                npm install
                                                                npm run ${TEST_TYPE}
                                                                '''
                }
            }
        }
    } catch (e) {
        currentBuild.result = 'FAILURE'
        echo e
        throw e
    } finally {
        notifySlack(currentBuild.result)
    }
}
def notifySlack(String buildStatus = 'STARTED') {
    // Build status of null means success.
    buildStatus = buildStatus ?: 'SUCCESS'
    def color
    if (buildStatus == 'STARTED') {
        color = '#D4DADF'
    } else if (buildStatus == 'SUCCESS') {
        color = '#BDFFC3'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#FFFE89'
    } else {
        color = '#FF9FA1'
    }
    def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}"
    if (buildStatus != 'STARTED' && buildStatus != 'SUCCESS') {
        slackSend(color: color, message: msg)
    }
}