# Beauty Saloon

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd beauty-saloon-fork1
   ```

2. Install dependencies and setup environment:
   ```bash
   npm run install:all
   ```
   > This command installs dependencies for root, client, and server, and automatically configures your `.env` file from `env.example`.

3. Start the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting

### "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
This error occurs if `server/.env` is missing or the password is incorrect.
The setup script should handle this automatically. If you still see this, ensure `server/.env` exists and contains the correct `DB_PASSWORD`.