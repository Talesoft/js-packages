import each from 'jest-each'
import { parse, resolve } from './uri'
import { ok } from '@talesoft/ok'

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
      '//someone:somepass@example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
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
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '///example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        path: '/example/path',
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '?a=1&b[]=12&b=test&c#testFragment',
      {
        query: 'a=1&b%5B%5D=12&b=test&c',
        fragment: 'testFragment',
      },
    ],
    [
      '#testFragment',
      {
        fragment: 'testFragment',
      },
    ],
    [
      'someone@example.com',
      {
        path: 'someone@example.com',
      },
    ],
    [
      'meta/annotation',
      {
        path: 'meta/annotation',
      },
    ],
    [
      './meta/annotation',
      {
        path: './meta/annotation',
      },
    ],
    [
      '../meta/annotation',
      {
        path: '../meta/annotation',
      },
    ],
    [
      '/meta/../annotation',
      {
        path: '/meta/../annotation',
      },
    ],
    [
      'tel:+06813345611',
      {
        scheme: 'tel',
        path: '+06813345611',
      },
    ],
    [
      'mailto:someone@example.com',
      {
        scheme: 'mailto',
        path: 'someone@example.com',
      },
    ],
    [
      'mailto:someone@example.com?subject=Test&body=Some+body',
      {
        scheme: 'mailto',
        path: 'someone@example.com',
        query: 'subject=Test&body=Some+body',
      },
    ],
    [
      'mailto:someone@example.com,someoneelse@example.com?subject=Test&body=Some+body',
      {
        scheme: 'mailto',
        path: 'someone@example.com,someoneelse@example.com',
        query: 'subject=Test&body=Some+body',
      },
    ],
    [
      'urn:isbn:978-3-16-148410-0',
      {
        scheme: 'urn',
        path: 'isbn:978-3-16-148410-0',
      },
    ],
    [
      'ws://example.com/some-path?q=1#test',
      {
        scheme: 'ws',
        host: 'example.com',
        path: '/some-path',
        query: 'q=1',
        fragment: 'test',
      },
    ],
    [
      'wss://example.com/some-path?q=1#test',
      {
        scheme: 'wss',
        host: 'example.com',
        path: '/some-path',
        query: 'q=1',
        fragment: 'test',
      },
    ],
    [
      'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      {
        scheme: 'urn',
        path: 'uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      },
    ],
  ]).it('should correctly parse the uri %s', (uriString, expected) => {
    const result = parse(uriString)
    expect(result).toEqual(ok(expected))
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
