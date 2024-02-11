// Endpoint to get link token
// 1. Call api
// 2. respond with link token

// Endpoint to exchange public token received from link
// 1. Receive public token from front-end
// 2. Call plaid api to exchange public token for access token
// 3. Write access token to server (DO NOT send to client)

// Endpoint to update institutions
// 1. Iterate over plaid Institutions endpoint (paginated endpoint)
// Accumulate all institutions in a constant
// Map institutions array
// 2. Update institutions collection in firebase? or full-replace
