import { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  title: "CodeBlocks/CodeBlock",
  tags: ["code-blocks", "code-block", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Playground: Story = {
  args: {
    children: `SELECT
    customer_id,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_quantity,
    SUM(quantity * price) AS total_spent,
    MIN(order_date) AS first_order_date,
    MAX(order_date) AS last_order_date,
    arrayJoin(arraySort(groupArray((order_date, product_id)))) AS ordered_products
FROM
    orders
WHERE
    order_date BETWEEN '2022-01-01' AND '2022-12-31'
GROUP BY
    customer_id
HAVING
    total_orders > 5 AND total_spent > 1000
ORDER BY
    total_spent DESC
LIMIT
    10;
    `,
    language: "sql",
    showLineNumbers: true,
    showWrapButton: false,
    wrapLines: false,
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>SQL with Line Numbers</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="sql"
            showLineNumbers={true}
          >
            {`SELECT
    customer_id,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_quantity
FROM orders
WHERE order_date BETWEEN '2022-01-01' AND '2022-12-31'
GROUP BY customer_id
ORDER BY total_orders DESC
LIMIT 10;`}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>SQL without Line Numbers</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="sql"
            showLineNumbers={false}
          >
            {"SELECT * FROM users WHERE active = true;"}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>Bash Script</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="bash"
            showLineNumbers={true}
          >
            {`#!/bin/bash
echo "Starting deployment..."
npm install
npm run build
docker build -t myapp:latest .
docker push myapp:latest
echo "Deployment complete!"`}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>JSON Data</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="json"
            showLineNumbers={true}
          >
            {`{
  "name": "click-ui",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}`}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>TypeScript / TSX</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="tsx"
            showLineNumbers={true}
          >
            {`interface User {
  id: number;
  name: string;
  email: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};`}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>With Wrap Button</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="sql"
            showLineNumbers={true}
            showWrapButton={true}
          >
            {
              "SELECT customer_id, first_name, last_name, email, phone_number, address, city, state, zip_code, country FROM customers WHERE registration_date >= '2023-01-01' ORDER BY last_name, first_name;"
            }
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>With Wrap Lines Enabled</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="sql"
            showLineNumbers={true}
            wrapLines={true}
          >
            {
              "SELECT customer_id, first_name, last_name, email, phone_number, address, city, state, zip_code, country FROM customers WHERE registration_date >= '2023-01-01' ORDER BY last_name, first_name;"
            }
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>Short Code Snippet</h3>
        <div style={{ marginTop: "1rem" }}>
          <CodeBlock
            language="bash"
            showLineNumbers={false}
          >
            {"npm install click-ui"}
          </CodeBlock>
        </div>
      </section>

      <section>
        <h3>Multi-language Examples</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div>
            <h4>SQL</h4>
            <CodeBlock
              language="sql"
              showLineNumbers={true}
            >
              {`SELECT COUNT(*)
FROM users
WHERE active = true;`}
            </CodeBlock>
          </div>
          <div>
            <h4>Bash</h4>
            <CodeBlock
              language="bash"
              showLineNumbers={true}
            >
              {`#!/bin/bash
echo "Hello, World!"
date`}
            </CodeBlock>
          </div>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {
      hover: [".cuiCodeButton"],
    },
  },
};
