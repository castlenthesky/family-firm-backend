import { AccountBase, Item, AccountType } from "plaid";

export async function parse_accounts(account_data: {
  accounts: {
    account_id: string;
    name: string;
    official_name: string;
    mask: string;
    type: string;
    subtype: string;
  }[];
  item: {
    item_id: string;
  };
  request_id: string;
}): Promise<object[]> {
  const account_data_array: object[] = [];
  account_data.accounts.map((account) => {
    const account_object = {
      item_id: account_data.item.item_id,
      account_id: account.account_id,
      mask: account.mask,
      name: account.name,
      name_official: account.official_name,
      type: account.type,
      subtype: account.subtype,
    };
    account_data_array.push(account_object);
  });
  return account_data_array;
}
