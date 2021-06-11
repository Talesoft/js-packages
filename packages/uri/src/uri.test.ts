import each from 'jest-each'
import { parse, resolve } from './uri'
import { ok } from '@talesoft/result'
import { none, some } from '@talesoft/option'

describe('parse', () => {
  each([
    [
      'https://someone:somepass@example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: some('https'),
        userInfo: some('someone:somepass'),
        host: some('example.com'),
        port: some(443),
        path: some('/example/path'),
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      '//someone:somepass@example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: none,
        userInfo: some('someone:somepass'),
        host: some('example.com'),
        port: some(443),
        path: some('/example/path'),
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      'https://example.com:443/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: some('https'),
        userInfo: none,
        host: some('example.com'),
        port: some(443),
        path: some('/example/path'),
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      'file:///example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: some('file'),
        userInfo: none,
        host: none,
        port: none,
        path: some('/example/path'),
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      '///example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('/example/path'),
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      '/example/path?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('/example/path'),
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      '?a=1&b[]=12&b=test&c#testFragment',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: none,
        query: some('a=1&b%5B%5D=12&b=test&c'),
        fragment: some('testFragment'),
      },
    ],
    [
      '#testFragment',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: none,
        query: none,
        fragment: some('testFragment'),
      },
    ],
    [
      'someone@example.com',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('someone@example.com'),
        query: none,
        fragment: none,
      },
    ],
    [
      'meta/annotation',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('meta/annotation'),
        query: none,
        fragment: none,
      },
    ],
    [
      './meta/annotation',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('./meta/annotation'),
        query: none,
        fragment: none,
      },
    ],
    [
      '../meta/annotation',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('../meta/annotation'),
        query: none,
        fragment: none,
      },
    ],
    [
      '/meta/../annotation',
      {
        scheme: none,
        userInfo: none,
        host: none,
        port: none,
        path: some('/meta/../annotation'),
        query: none,
        fragment: none,
      },
    ],
    [
      'tel:+06813345611',
      {
        scheme: some('tel'),
        userInfo: none,
        host: none,
        port: none,
        path: some('+06813345611'),
        query: none,
        fragment: none,
      },
    ],
    [
      'mailto:someone@example.com',
      {
        scheme: some('mailto'),
        userInfo: none,
        host: none,
        port: none,
        path: some('someone@example.com'),
        query: none,
        fragment: none,
      },
    ],
    [
      'mailto:someone@example.com?subject=Test&body=Some+body',
      {
        scheme: some('mailto'),
        userInfo: none,
        host: none,
        port: none,
        path: some('someone@example.com'),
        query: some('subject=Test&body=Some+body'),
        fragment: none,
      },
    ],
    [
      'mailto:someone@example.com,someoneelse@example.com?subject=Test&body=Some+body',
      {
        scheme: some('mailto'),
        userInfo: none,
        host: none,
        port: none,
        path: some('someone@example.com,someoneelse@example.com'),
        query: some('subject=Test&body=Some+body'),
        fragment: none,
      },
    ],
    [
      'urn:isbn:978-3-16-148410-0',
      {
        scheme: some('urn'),
        userInfo: none,
        host: none,
        port: none,
        path: some('isbn:978-3-16-148410-0'),
        query: none,
        fragment: none,
      },
    ],
    [
      'ws://example.com/some-path?q=1#test',
      {
        scheme: some('ws'),
        userInfo: none,
        host: some('example.com'),
        port: none,
        path: some('/some-path'),
        query: some('q=1'),
        fragment: some('test'),
      },
    ],
    [
      'wss://example.com/some-path?q=1#test',
      {
        scheme: some('wss'),
        userInfo: none,
        host: some('example.com'),
        port: none,
        path: some('/some-path'),
        query: some('q=1'),
        fragment: some('test'),
      },
    ],
    [
      'urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      {
        scheme: some('urn'),
        userInfo: none,
        host: none,
        port: none,
        path: some('uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6'),
        query: none,
        fragment: none,
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
