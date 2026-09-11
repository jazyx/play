# React + Socket.io #

Simple React frontend that uses Socket.io to connect to an Express + Socket.io backend.

* Connection made immediately after page loaded
* Socket can be disconnected
* Connection state shown, by text and button colour
* Messages sent with a `timeout` after which no response is expected
* Messages sent with a callback that triggers only in sender
* "incoming" messages treated centrally in App.jsx
