import each from 'jest-each'
import { parse, resolve } from './uri'

describe('parse', () => {
  each([
    [
      'https://someone:somepass@example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: 'https',
        userInfo: 'someone:somepass',
        host: 'example.com',
        port: 443,
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      'https://example.com/some/path#',
      {
        scheme: 'https',
        userInfo: null,
        host: 'example.com',
        port: null,
        path: '/some/path',
        query: null,
        fragment: '',
      },
    ],
    [
      '//someone:somepass@example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: null,
        userInfo: 'someone:somepass',
        host: 'example.com',
        port: 443,
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      'https://example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: 'https',
        userInfo: null,
        host: 'example.com',
        port: 443,
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      'file:///example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: 'file',
        userInfo: null,
        host: null,
        port: null,
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '///example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: null,
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '#testFragment',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: null,
        query: null,
        fragment: 'testFragment',
      },
    ],
    [
      'someone@example.com',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: 'someone@example.com',
        query: null,
        fragment: null,
      },
    ],
    [
      'meta/annotation',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: 'meta/annotation',
        query: null,
        fragment: null,
      },
    ],
    [
      './meta/annotation',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: './meta/annotation',
        query: null,
        fragment: null,
      },
    ],
    [
      '../meta/annotation',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: '../meta/annotation',
        query: null,
        fragment: null,
      },
    ],
    [
      '/meta/../annotation',
      {
        scheme: null,
        userInfo: null,
        host: null,
        port: null,
        path: '/meta/../annotation',
        query: null,
        fragment: null,
      },
    ],
    [
      'tel:+06813345611',
      {
        scheme: 'tel',
        userInfo: null,
        host: null,
        port: null,
        path: '+06813345611',
        query: null,
        fragment: null,
      },
    ],
    [
      'mailto:someone@example.com',
      {
        scheme: 'mailto',
        userInfo: null,
        host: null,
        port: null,
        path: 'someone@example.com',
        query: null,
        fragment: null,
      },
    ],
    [
      'mailto:someone@example.com?subject=Test&body=Some+body',
      {
        scheme: 'mailto',
        userInfo: null,
        host: null,
        port: null,
        path: 'someone@example.com',
        query: 'subject=Test&body=Some+body',
        fragment: null,
      },
    ],
    [
      'mailto:someone@example.com,someoneelse@example.com?subject=Test&body=Some+body',
      {
        scheme: 'mailto',
        userInfo: null,
        host: null,
        port: null,
        path: 'someone@example.com,someoneelse@example.com',
        query: 'subject=Test&body=Some+body',
        fragment: null,
      },
    ],
    [
      'urn:isbn:978-3-16-148410-0',
      {
        scheme: 'urn',
        userInfo: null,
        host: null,
        port: null,
        path: 'isbn:978-3-16-148410-0',
        query: null,
        fragment: null,
      },
    ],
    [
      'ws://example.com/some-path?q=1#test',
      {
        scheme: 'ws',
        userInfo: null,
        host: 'example.com',
        port: null,
        path: '/some-path',
        query: 'q=1',
        fragment: 'test',
      },
    ],
    [
      'wss://example.com/some-path?q=1#test',
      {
        scheme: 'wss',
        userInfo: null,
        host: 'example.com',
        port: null,
        path: '/some-path',
        query: 'q=1',
        fragment: 'test',
      },
    ],
    [
      'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      {
        scheme: 'urn',
        userInfo: null,
        host: null,
        port: null,
        path: 'uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
        query: null,
        fragment: null,
      },
    ],
  ]).it('should correctly parse the uri %s', (uriString, expected) => {
    const result = parse(uriString)
    expect(result).toEqual(expected)
  })
})

describe('resolve', () => {
  each([
    ['https://example.com/test.json', 'sub/directory', 'https://example.com/sub/directory'],
    ['https://example.com/test.json', '/sub/directory', 'https://example.com/sub/directory'],
    ['https://example.com/test.json', './sub/directory', 'https://example.com/sub/directory'],
    [
      'https://example.com/test.json/',
      './sub/directory',
      'https://example.com/test.json/sub/directory',
    ],
    ['https://example.com/test', './sub/directory', 'https://example.com/sub/directory'],
    ['https://example.com/test/', './sub/directory', 'https://example.com/test/sub/directory'],
    ['https://example.com/test', '../sub/directory', 'https://example.com/sub/directory'],
    ['https://example.com/test/other', '../sub/directory', 'https://example.com/sub/directory'],
    ['https://example.com/test/other', '/../sub/directory', 'https://example.com/sub/directory'],
    [
      'https://example.com/test/other/',
      '../sub/directory',
      'https://example.com/test/sub/directory',
    ],
    ['https://example.com/test/other/', '/../sub/directory', 'https://example.com/sub/directory'],
    [
      'https://example.com/test/other/ignored',
      '/../sub/directory',
      'https://example.com/sub/directory',
    ],
    ['file:///test.json', 'sub/directory', 'file:///sub/directory'],
    ['file:///test.json', '/sub/directory', 'file:///sub/directory'],
    ['file:///test.json', './sub/directory', 'file:///sub/directory'],
    ['file:///test', './sub/directory', 'file:///sub/directory'],
    ['file:///test/', './sub/directory', 'file:///test/sub/directory'],
    ['file:///test', '../sub/directory', 'file:///sub/directory'],
  ]).it('should correctly resolve %s with %s', (uriString, relativeUriString, expected) => {
    const result = resolve(uriString, relativeUriString)
    expect(result).toEqual(expected)
  })
})
