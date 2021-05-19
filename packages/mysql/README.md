@talesoft/mysql
===============

# Task 1: Simple, Safe Query Execution

# Scenario: Sql Tag Usage

```ts
const sql = createSqlExecutor({ url: 'mysql://example:example@localhost:3306/example' })

const users: Users[] = sql.query`SELECT * FROM users`

await sql.query`UPDATE users SET ${{ name: "Example" }} WHERE id = ${5}`
```

# Scenario: Control Sql Tag Escaping with Values

```ts
const sql = createSqlExecutor('mysql://example:example@localhost:3306/example')

await sql.query`UPDATE ${id('tasks')} WHERE deadline = ${raw('CURRENT_TIMESTAMP')}`
```

# Scenario: Prepared Statements

```ts
const sql = createSqlExecutor('mysql://example:example@localhost:3306/example')

const users: User[] = await sql.execute<User>`SELECT * FROM users WHERE name LIKE ${"%example%"}`
// Statements are automatically prepared and cached
```
