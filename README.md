# Blockchain Project for Detecting Counterfeit Drugs in Medicine Supply

## Description

This project leverages blockchain technology to detect and prevent counterfeit drugs within the medicine supply chain. The system provides a secure, immutable, and transparent ledger to track the lifecycle of pharmaceutical products from manufacturers to end consumers. The primary goal is to ensure drug authenticity, enhance patient safety, and combat counterfeit drug trafficking.

## Key Features

- **Drug Tracking**: Trace the origin and movement of medicines throughout the supply chain.
- **Immutable Ledger**: Blockchain ensures tamper-proof records of drug transactions.
- **Smart Contracts**: Automate verification processes to validate drug authenticity.
- **Decentralized Storage**: Distributed ledger provides transparency and trust among stakeholders.
- **Real-time Monitoring**: Track shipments and detect anomalies in the supply chain.

## Architecture Overview

The project employs Hyperledger Fabric for its permissioned blockchain network. The components include:
- **Manufacturer**: Registers drug batches on the blockchain.
- **Distributor**: Updates location and shipment status.
- **Pharmacy**: Verifies drug authenticity before distribution.
- **Consumer**: Scans QR codes to verify the source and authenticity of the medicine.

## Setting up the Development Environment

Before we start, please install the following tools and dependencies:

1. **Node.js and npm** (comes with Node)
2. **Git**
3. **ganache-cli**
4. **Truffle**
5. **nodemon** (install globally with `npm install -g nodemon`)

## Running the Geth Client or Ganache-cli

```bash
$ ganache-cli -i 5777
```

## Compiling and Deploying the Smart Contract

1. **Compile the contract:**
```bash
$ truffle compile
```
2. **Deploy the contract:**
```bash
$ truffle migrate
```

## Installation

Install all dependencies:
```bash
$ npm install
```

## Run Dapp

To run the application:
```bash
$ nodemon
```

## Available Accounts

- **Manufacturer:** 0xa979c826045277fc53eA0CDC71E9E7B3333d71aC
- **Wholesaler:** 0x7608c8887Bdcd9094Aba725fAfadDeD8fB46a6aA
- **Retailer:** 0xC752Ac4F151D210623582B3f48fde870DF3dfdAa
- **Customer:** 0xeFdc965B5a26E9Ca83634BdBf9325cb79D9150F7

## API Endpoints

- **POST /addDrug**: Add a new drug to the blockchain.
- **GET /verifyDrug/:id**: Verify a drug's authenticity using its ID.
- **GET /trackDrug/:id**: Track the drug's journey through the supply chain.

## Sample API Request

### POST /addDrug

```bash
curl -X POST "https://api.example.com/addDrug" \
     -H "Content-Type: application/json" \
     -d '{
          "drug_id": "12345",
          "name": "PainRelief",
          "manufacturer": "PharmaCorp",
          "batch_number": "PR202410",
          "expiry_date": "2026-12-31"
     }'
```

### Sample Response

```json
{
  "status": "success",
  "message": "Drug successfully added to the blockchain."
}
```

## Security Measures

- **Role-Based Access Control (RBAC)**: Restrict access based on user roles.
- **Data Encryption**: Secure sensitive information using AES encryption.
- **Smart Contract Auditing**: Regularly audit smart contracts to identify vulnerabilities.

## Technologies Used

- **Blockchain Framework**: Hyperledger Fabric
- **Programming Language**: Node.js
- **Database**: PostgreSQL
- **Tools**: Docker, Kubernetes

