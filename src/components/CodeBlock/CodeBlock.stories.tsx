import { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from '@/components/CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  title: 'CodeBlocks/CodeBlock',
  tags: ['code-blocks', 'code-block', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

// Shows both the copy button and the wrap button. Both are rendered via
// `<CodeButton as={IconButton}>` (CodeButton = styled(EmptyButton)), exercising
// the `as`-prop path that bypasses EmptyButton's own render. This guards that
// path against the EmptyButton CSS Modules migration.
export const WithWrapButton: Story = {
  args: {
    children: 'SELECT customer_id, total_spent FROM orders LIMIT 10;',
    language: 'sql',
    showLineNumbers: true,
    showWrapButton: true,
    wrapLines: false,
  },
  decorators: [
    Story => (
      <div
        data-testid="codeblock-harness"
        style={{ display: 'inline-block', padding: '24px' }}
      >
        <Story />
      </div>
    ),
  ],
};

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
    language: 'sql',
    showLineNumbers: true,
    showWrapButton: false,
    wrapLines: false,
  },
};
