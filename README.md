# ReVeRec - Remote, Verify, Recruit

## A remote-recruitment platform on the blockchain

A recruitment application with blockchain-based backend, made with Node.js.

### Testing

- To test the application, run 'npm install' first.

- To test with multiple nodes, open 2-3 terminals and run the scripts commmands for each node: 'npm run node-1', 'npm run node-2', 'npm run node-3'.

- Use the collection of postman requests to test adding a job ad, update, delete etc (all adds a new block).

- When registering a new job candidate (node), the chain will be synchronized to that node.

- A logs folder with a file for requests and one for errors will be created automatically when requests or errors are made.

- A copy of the chain will be created in the data folder and called 'reverecBlockchain.json'.
