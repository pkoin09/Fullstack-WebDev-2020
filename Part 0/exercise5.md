TITLE HTTP GET note/spa Sequence Diagram

note over Web:
submit,
method: POST
end note

Web->server: req https://studies.cs.helsinki.fi/exampleapp/spa
server-->Web: res .html code status code: 200 ok
Web->server: req https://studies.cs.helsinki.fi/exampleapp/main.css
server-->Web: res .css code status code: 200 ok
Web->server:  req https://studies.cs.helsinki.fi/exampleapp/main.js
server-->Web: res .js code status code: 200 ok
server-->Web: res [{ .json data }, ...], code: 200

note over Web:
Web page rendered
end note

[[img/exercise5.jpg]]