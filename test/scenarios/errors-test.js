const { getInstance } = require('../util')

require('../mocha-node-setup')

describe('api.github.com', () => {
  let octokit

  beforeEach(() => {
    return getInstance('errors')

      .then(instance => {
        octokit = instance
      })
  })

  it('(#684) errors-test', () => {
    octokit.authenticate({
      type: 'token',
      token: '0000000000000000000000000000000000000001'
    })

    return octokit.issues.createLabel({
      owner: 'octokit-fixture-org',
      repo: 'errors',
      name: 'foo',
      color: 'invalid'
    })

      .catch(error => {
        expect(error.message).to.equal('Validation Failed')
        expect(error.errors).to.deep.equal([{
          resource: 'Label',
          code: 'invalid',
          field: 'color'
        }])
        expect(error.documentation_url).to.match(new RegExp('v3/issues/labels/#create-a-label'))
      })
  })
})
