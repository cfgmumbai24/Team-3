# JPMMSS - Team 3

## Overview

This is a comprehensive application designed to manage and streamline the process of buying and managing products. It integrates several user roles and leverages an AI model to classify local artisan products by their SKU_IDs. The system includes functionalities for raising queries, uploading product images, handling inventory management and handling approvals through various administrative roles.

## Tech Stack

- **Frontend**: Next.js (for incremental static regeneration), Tailwind CSS
- **Backend**: GraphQL, Node.js
- **Storage**: AWS S3 for image storage
- **AI Model**: For SKU_ID classification

## User Roles and Workflow

### Buyer
- **Actions**:
  1. Buy products
  2. Decide quantity
  3. Raise queries

### Cluster Admin
- **Actions**:
  1. Upload product photos
  2. Select product category
  3. Optionally select quantity

### Sub-Admin
- **Actions**:
  1. Decide SKU (editable)
  2. Define product size
  3. Define product weight and height
  4. Determine quantity

### Master Admin
- **Actions**:
  1. Provide quotations and approvals
  2. Forward emails
  3. Assign administrative tasks

## System Flow

1. **Query Raised**: Buyers raise queries regarding products.
2. **Cluster Admin Tasks**:
   - Upload product images
   - Select product category
   - Optionally select product quantity
3. **AI Model Integration**:
   - The AI model classifies the SKU_ID based on the uploaded product images.
   - The classified image is stored in AWS S3.
4. **Sub-Admin Tasks**:
   - Decide and edit SKU
   - Set product size, weight, and height
   - Determine product quantity
5. **Master Admin Tasks**:
   - Provide quotations and approvals for the product
   - Forward related emails
   - Assign tasks to relevant admins
6. **Database Update**:
   - Update the database with SKU_ID and other product details.

![cfg archt](https://github.com/cfgmumbai24/Team-3/assets/78212328/fbc7cae9-181b-4ec5-8fc1-01eff0bd0344)

## Getting Started

### Prerequisites

- Node.js
- NPM/Yarn
- AWS API Keys (for S3)
- Huggingface Model Omniglue access

### Installation

1. **Clone the repository**:
   ```sh
   git clone <repository_url>
   cd user-product-inventory-system
   ```

2. **Install dependencies**:
  In both of backend and frontend directories, run the following
   ```sh
   yarn install
   ```

4. **Set up environment variables**:
   - Create `.env` files and add your AWS credentials, database connection strings, and other necessary configurations.

5. **Run the application**:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
