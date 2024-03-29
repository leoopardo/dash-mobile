export interface OrganizationBalance {
    balance_reserved?: number;
    balance_to_payment?: number;
    balance_to_transactions?: number;
    balance_total?: number;
    btc_balance_reserved?: number;
    btc_balance_to_payment?: number;
    btc_balance_to_transactions?: number;
    btc_balance_total?: number;
    createdAt?: string;
    eur_balance_reserved?: number;
    eur_balance_to_payment?: number;
    eur_balance_to_transactions?: number;
    eur_balance_total?: number;
    gbp_balance_reserved?: number;
    gbp_balance_to_payment?: number;
    gbp_balance_to_transactions?: number;
    gbp_balance_total?: number;
    in?: number;
    organization_id?: number;
    out?: number;
    pix_amount_fee?: number;
    pix_transactions_total?: number;
    refund_amount_fee?: number;
    refund_transactions_total?: number;
    updatedAt?: string;
    usd_balance_reserved?: number;
    usd_balance_to_payment?: number;
    usd_balance_to_transactions?: number;
    usd_balance_total?: number;
    withdraw_amount_fee?: number;
    withdraw_transactions_total?: number;
    _id?: string;
  }
  