const nock = require('nock')

const Octokit = require('../../')

require('../mocha-node-setup')

describe('apps', () => {
  let octokit

  beforeEach(() => {
    octokit = new Octokit({
      baseUrl: 'https://apps-test-host.com'
    })
  })

  it('adds "machine-man" preview header', () => {
    nock('https://apps-test-host.com', {
      reqheaders: {
        authorization: 'Bearer 123',
        accept: 'application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json'
      }
    })
      .get('/orgs/myorg')
      .reply(200, {})

    octokit.authenticate({
      type: 'app',
      token: '123'
    })

    return octokit.orgs.get({ org: 'myorg' })
  })

  it('adds "machine-man" preview header to custom accept header', () => {
    nock('https://apps-test-host.com', {
      reqheaders: {
        authorization: 'Bearer 123',
        accept: 'foo-bar,application/vnd.github.machine-man-preview+json'
      }
    })
      .get('/orgs/myorg')
      .reply(200, {})

    octokit.authenticate({
      type: 'app',
      token: '123'
    })

    return octokit.orgs.get({
      org: 'myorg',
      headers: {
        accept: 'foo-bar'
      }
    })
  })

  it('does not add "machine-man" preview header if it is already set', () => {
    nock('https://apps-test-host.com', {
      reqheaders: {
        authorization: 'Bearer 123',
        accept: 'application/vnd.github.machine-man-preview+json'
      }
    })
      .get('/orgs/myorg')
      .reply(200, {})

    octokit.authenticate({
      type: 'app',
      token: '123'
    })

    return octokit.orgs.get({
      org: 'myorg',
      headers: {
        accept: 'application/vnd.github.machine-man-preview+json'
      }
    })
  })
})
