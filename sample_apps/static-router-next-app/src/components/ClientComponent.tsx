"use client"

import { ClickUIProvider, CodeBlock } from '@clickhouse/click-ui'

export default function ClientComponent() {
  return (
    <ClickUIProvider theme="dark">
      <CodeBlock
        language="sql"
        theme="dark"
        onCopy={() => { }}
        onCopyError={() => { }}
        showLineNumbers
      >
        {`SELECT
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
      `}
      </CodeBlock>
    </ClickUIProvider>
  )
}
