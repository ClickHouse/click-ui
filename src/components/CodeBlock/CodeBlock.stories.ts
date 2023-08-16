import { CodeBlock } from "./CodeBlock";

export default {
  title: "CodeBlocks/CodeBlock",
  component: CodeBlock,
  tags: ["code-blocks", "code-block", "autodocs"],
};

export const Playground = {
  args: {
    children: `
    SELECT
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
