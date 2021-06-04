export type GenericDelimiter = ':' | '/' | '?' | '#' | '[' | ']' | '@'
export type SubDelimiter = '!' | '$' | '&' | "'" | '(' | ')' | '*' | '+' | ',' | ';' | '='
export type UppercaseAlphabeticalLetter =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
export type LowercaseAlphabeticalLetter = Lowercase<UppercaseAlphabeticalLetter>

export type AlphabeticalLetter = UppercaseAlphabeticalLetter | LowercaseAlphabeticalLetter

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ReservedCharacter = GenericDelimiter | SubDelimiter
export type UnreservedCharacter = AlphabeticalLetter | Digit | '-' | '.' | '_' | '~'

// Can't represent this in TypeScript
// export type Scheme = AlphabeticalLetter * ( AlphabeticalLetter | Digit | "+" | "-" | "." )
export type Scheme = string

export type UserInfo<User extends string, Password extends string> = `${User extends ''
  ? ''
  : User}${Password extends '' ? '' : `:${Password}`}`

export type Authority<
  UserInfoType extends UserInfo<string, string>,
  Host extends string,
  Port extends number,
> = `${UserInfoType extends '' ? '' : `${UserInfoType}@`}${Host}${Port extends 0 ? '' : `:${Port}`}`

export type EmptyPath = ''
export type EmptyOrPrefixedPath = EmptyPath | `/${string}`
export type AbsolutePath = `/${string}`
export type RootlessPath = `${string}/${string}`

export type HierPart<
  AuthorityType extends Authority<UserInfo<string, string>, string, 0>,
  PathType extends EmptyOrPrefixedPath = '',
> = `${AuthorityType extends '' ? '' : `//${AuthorityType}`}${PathType}`

export type Uri<
  SchemeType extends Scheme,
  HierPartType extends HierPart<Authority<UserInfo<string, string>, string, 0>, string>,
  Query extends string,
  Fragment extends string,
> = `${SchemeType extends '' ? '' : `${SchemeType}:`}${HierPartType}${Query extends ''
  ? ''
  : `?${Query}`}${Fragment extends '' ? '' : `#${Fragment}`}`

const uri: Uri<'https', 'user@localhost/test', '', 'test'>

// URI         = scheme ":" hier-part [ "?" query ] [ "#" fragment ]

//       hier-part   = "//" authority path-abempty
//                   / path-absolute
//                   / path-rootless
//                   / path-empty
