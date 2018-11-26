const stringToArrayBuffer = require('string-to-arraybuffer')
const { getInstance } = require('../util')

require('../mocha-node-setup')

describe('api.github.com', () => {
  let octokit

  beforeEach(() => {
    return getInstance('release-assets')

      .then(instance => {
        octokit = instance

        octokit.authenticate({
          type: 'token',
          token: '0000000000000000000000000000000000000001'
        })
      })
  })

  it('octokit.repos.uploadReleaseAsset as Buffer', () => {
    return octokit.repos.getReleaseByTag({
      owner: 'octokit-fixture-org',
      repo: 'release-assets',
      tag: 'v1.0.0'
    })

      .then(result => {
        return octokit.repos.uploadReleaseAsset({
          url: result.data.upload_url,
          headers: {
            'content-type': 'text/plain',
            'content-length': 14
          },
          file: Buffer.from('Hello, world!\n'),
          name: 'test-upload.txt',
          label: 'test'
        })
      })
  })

  it('octokit.repos.uploadReleaseAsset as ArrayBuffer', () => {
    return octokit.repos.getReleaseByTag({
      owner: 'octokit-fixture-org',
      repo: 'release-assets',
      tag: 'v1.0.0'
    })

      .then(result => {
        return octokit.repos.uploadReleaseAsset({
          url: result.data.upload_url,
          headers: {
            'content-type': 'text/plain',
            'content-length': 14
          },
          file: stringToArrayBuffer('Hello, world!\n'),
          name: 'test-upload.txt',
          label: 'test'
        })
      })
  })
})
