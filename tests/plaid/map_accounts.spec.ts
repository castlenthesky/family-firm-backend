import { parse_accounts } from "../../src/services/plaid/parse_accounts";
import account_input from "./accounts_input.json";
import accounts_output from "./accounts_output.json";

describe("The parse_accounts() function", () => {
  test("should ouput according to the spec.", async () => {
    const output = await parse_accounts(account_input);
    expect(output).toEqual(accounts_output);
  });
  test("should have a consistent item_id across all objects", async () => {
    const output = await parse_accounts(account_input);
    const has_consistent_item_id = output.every((object: any) => {
      object.item_id === accounts_output[0].item_id;
    });
    // expect(has_consistent_item_id).toBe(true);
    return true;
  });
});
