import { Meta, StoryObj } from "@storybook/react-vite";
import { InlineCodeBlock } from "./InlineCodeBlock";

const meta: Meta<typeof InlineCodeBlock> = {
  component: InlineCodeBlock,
  title: "CodeBlocks/Inline",
  tags: ["code-blocks", "inline", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof InlineCodeBlock>;

export const Playground: Story = {
  args: {
    children: "Text Content",
  },
};

export const Variations: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}
    >
      <section>
        <h3>Basic Usage</h3>
        <div style={{ marginTop: "1rem" }}>
          <p>
            You can install the package using{" "}
            <InlineCodeBlock>npm install click-ui</InlineCodeBlock> or{" "}
            <InlineCodeBlock>yarn add click-ui</InlineCodeBlock>.
          </p>
        </div>
      </section>

      <section>
        <h3>Command Examples</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            Run <InlineCodeBlock>npm start</InlineCodeBlock> to start the development
            server.
          </p>
          <p>
            Execute <InlineCodeBlock>docker ps</InlineCodeBlock> to list running
            containers.
          </p>
          <p>
            Use <InlineCodeBlock>git status</InlineCodeBlock> to check your repository
            status.
          </p>
          <p>
            Build with <InlineCodeBlock>npm run build</InlineCodeBlock> for production.
          </p>
        </div>
      </section>

      <section>
        <h3>Variable and Function Names</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            The <InlineCodeBlock>useState</InlineCodeBlock> hook is used for state
            management.
          </p>
          <p>
            Set the <InlineCodeBlock>isLoading</InlineCodeBlock> variable to{" "}
            <InlineCodeBlock>true</InlineCodeBlock>.
          </p>
          <p>
            Call the <InlineCodeBlock>fetchData()</InlineCodeBlock> function to retrieve
            data.
          </p>
          <p>
            Access the <InlineCodeBlock>user.email</InlineCodeBlock> property.
          </p>
        </div>
      </section>

      <section>
        <h3>File Paths and URLs</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            The configuration file is located at{" "}
            <InlineCodeBlock>/etc/config/app.json</InlineCodeBlock>.
          </p>
          <p>
            Navigate to{" "}
            <InlineCodeBlock>src/components/Button/Button.tsx</InlineCodeBlock>.
          </p>
          <p>
            Visit <InlineCodeBlock>https://clickhouse.com</InlineCodeBlock> for more
            information.
          </p>
        </div>
      </section>

      <section>
        <h3>SQL and Database</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            Use the <InlineCodeBlock>SELECT</InlineCodeBlock> statement to query data.
          </p>
          <p>
            The <InlineCodeBlock>WHERE</InlineCodeBlock> clause filters results.
          </p>
          <p>
            Join tables using <InlineCodeBlock>INNER JOIN</InlineCodeBlock>.
          </p>
        </div>
      </section>

      <section>
        <h3>Short vs Long Code Snippets</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            Short: <InlineCodeBlock>npm i</InlineCodeBlock>
          </p>
          <p>
            Medium: <InlineCodeBlock>const greeting = "Hello, World!";</InlineCodeBlock>
          </p>
          <p>
            Long:{" "}
            <InlineCodeBlock>
              function calculateTotal(items) return items.reduce((sum, item) =&gt; sum +
              item.price, 0);
            </InlineCodeBlock>
          </p>
        </div>
      </section>

      <section>
        <h3>In Paragraphs</h3>
        <div style={{ marginTop: "1rem" }}>
          <p>
            To get started with Click UI, first install the package using{" "}
            <InlineCodeBlock>npm install click-ui</InlineCodeBlock>. Then, import the
            components you need:{" "}
            <InlineCodeBlock>import Button from 'click-ui/Button'</InlineCodeBlock>. You
            can customize the <InlineCodeBlock>theme</InlineCodeBlock> prop to match your
            design system. For more advanced usage, check the{" "}
            <InlineCodeBlock>src/examples</InlineCodeBlock> directory.
          </p>
        </div>
      </section>

      <section>
        <h3>Keyboard Shortcuts</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            Press <InlineCodeBlock>Ctrl+C</InlineCodeBlock> to copy.
          </p>
          <p>
            Use <InlineCodeBlock>Cmd+S</InlineCodeBlock> to save.
          </p>
          <p>
            Hit <InlineCodeBlock>Esc</InlineCodeBlock> to close the dialog.
          </p>
        </div>
      </section>

      <section>
        <h3>Configuration Values</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            Set <InlineCodeBlock>PORT=3000</InlineCodeBlock> in your environment
            variables.
          </p>
          <p>
            Configure <InlineCodeBlock>maxConnections: 100</InlineCodeBlock> in your
            database settings.
          </p>
          <p>
            Enable <InlineCodeBlock>debug: true</InlineCodeBlock> for development mode.
          </p>
        </div>
      </section>

      <section>
        <h3>Mixed Content</h3>
        <div style={{ marginTop: "1rem" }}>
          <p>
            To deploy your application, first build it using{" "}
            <InlineCodeBlock>npm run build</InlineCodeBlock>, then create a Docker image
            with <InlineCodeBlock>docker build -t myapp .</InlineCodeBlock>. Push the
            image to your registry using{" "}
            <InlineCodeBlock>docker push myapp:latest</InlineCodeBlock>, and finally
            deploy it to your cluster with{" "}
            <InlineCodeBlock>kubectl apply -f deployment.yaml</InlineCodeBlock>. Monitor
            the deployment status using{" "}
            <InlineCodeBlock>kubectl get pods</InlineCodeBlock>.
          </p>
        </div>
      </section>

      <section>
        <h3>Special Characters</h3>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p>
            Use <InlineCodeBlock>{"<Component />"}</InlineCodeBlock> for JSX syntax.
          </p>
          <p>
            Template literals: <InlineCodeBlock>{"`Hello, ${name}`"}</InlineCodeBlock>
          </p>
          <p>
            Regular expression: <InlineCodeBlock>/[a-z]+/gi</InlineCodeBlock>
          </p>
        </div>
      </section>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    pseudo: {},
  },
};
