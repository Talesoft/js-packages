@talesoft/relate
===============

# Task 1: Simple, Safe Query Execution

# Scenario: Sql Tag Usage

```
const connection = await createConnection('mysql://localhost:3306/example')

const results: User[] = await connection.sql<User>`SELECT * FROM users WHERE id = ${5}`
```

# Scenario: Control Sql Tag Escaping with Values

```
const connection = await createConnection('mysql://localhost:3306/example')

const results: User[] = await connection.query<User>`SELECT * FROM ${id('users')} WHERE id = ${raw(5)}`
```

# Scenario: Prepared Statements

```
const connection = await createConnection('mysql://localhost:3306/example')

const statement = await connection.execute<User>`SELECT * FROM users WHERE id = ${raw(5)}`
```

# Task 2: Schema Manipulation

# Scenario: Schema manipulation from code
```
const connection = await createConnection('mysql://localhost:3306/example')

connection.schema('users', s => s
    s.table(')

)

```


# Task 3: Row Manipulation (Data CRUD)

# Scenario: Example Queries

```
inTable`users as u`.select.where`u.id = ${5}`.orderedBy('u.id')
inTable`users as u`.select.columns(['u.a', 'u.v']).where('u.id = 5').orderedBy('u.id')
inTable`users`.insert({ name: 'test' })
inTable`users`.update({ name: 'newName' }).only(1).where('u.id = 5')
inTable`users`.delete.where`u.id = ${5}`
```