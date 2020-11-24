# Exercise 4

TITLE HTTP POST new_note Sequence Diagram

note over Web:
submit,
method: POST
end note

Web->server: `https://studies.cs.helsinki.fi/exampleapp/new_note`
server-->Web: .html code with status 302 redirect

note over Web:
redirect,
method: GET
end note

Web->server: req `https://studies.cs.helsinki.fi/exampleapp/notes`
server-->Web: res .html code status code: 200 ok
Web->server: req `https://studies.cs.helsinki.fi/exampleapp/main.css`
server-->Web: res .css code status code: 200 ok
Web->server:  req `https://studies.cs.helsinki.fi/exampleapp/main.js`
server-->Web: res .js code status code: 200 ok
server-->Web: res [{ content: "test note..", date: "2020-11-24T15:26:13.304Z" }, ...], code: 200

note over Web:
Web page rendered
end note

![ex4-image](/img/exercise4.png)