import { render, screen } from "@testing-library/react";
import App from "./App";
// make the test return 1 if the test is unsuccessful
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

if (require.main === module) {
  (async () => {
    try {
      await require("jest").run(process.argv.slice(2));
      process.exit(0); // Exit with code 0 if Jest succeeds
    } catch (err) {
      console.error(err);
      process.exit(1); // Exit with code 1 if Jest fails
    }
  })();
}
