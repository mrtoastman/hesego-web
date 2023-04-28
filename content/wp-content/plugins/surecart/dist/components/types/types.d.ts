import { IconLibraryMutator, IconLibraryResolver } from './components/ui/icon/library';
declare global {
  interface Window {
    grecaptcha: any;
    wp: {
      apiFetch: any;
      blocks: any;
      i18n: any;
    };
    scStore: any;
    registerSureCartIconPath: (path: string) => void;
    registerSureCartIconLibrary: (name: string, options: {
      resolver: IconLibraryResolver;
      mutator?: IconLibraryMutator;
    }) => void;
    scIcons: {
      path: string;
    };
    scData: {
      root_url: string;
      page_id: string;
      do_not_persist_cart: boolean;
      nonce: string;
      base_url: string;
      nonce_endpoint: string;
      recaptcha_site_key: string;
      theme: string;
      pages: {
        dashboard: string;
        checkout: string;
      };
    };
    ceRegisterIconLibrary: any;
    ResizeObserver: any;
  }
}
export declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
interface Model {
  created_at: number;
  updated_at: number;
}
export interface ChoiceItem extends Object {
  value: string;
  label: string;
  disabled?: boolean;
  choices?: ChoiceItem[];
  suffix?: string;
  icon?: string;
}
export declare type ChoiceType = 'all' | 'single' | 'multiple';
export interface Price {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  recurring: boolean;
  recurring_interval?: 'week' | 'month' | 'year' | 'never';
  recurring_interval_count?: number;
  trial_duration_days?: number;
  ad_hoc: boolean;
  ad_hoc_max_amount: number;
  ad_hoc_min_amount: number;
  scratch_amount: number;
  setup_fee_enabled: boolean;
  setup_fee_amount: number;
  setup_fee_name: string;
  setup_fee_trial_enabled: boolean;
  recurring_period_count: number;
  archived: boolean;
  product_id?: string;
  archived_at?: string;
  created_at: number;
  updated_at: number;
  product?: Product | string;
  metadata: {
    [key: string]: string;
  };
}
export interface Bump {
  id: string;
  object: 'bump';
  amount_off: number;
  archived: boolean;
  archived_at: number;
  auto_apply: boolean;
  filter_match_type: 'all' | 'any' | 'none';
  filters: any;
  metadata: any;
  name: string;
  percent_off: number;
  price: string | Price;
  priority: 1 | 2 | 3 | 4 | 5;
  created_at: number;
  updated_at: number;
}
export declare type Prices = {
  [id: string]: Price;
};
export interface Media {
  id: string;
  object: 'media';
  byte_size: number;
  content_type: string;
  extension: string;
  filename: string;
  public_access: boolean;
  release_json: any;
  url?: string;
  url_expires_at?: number;
  updated_at: number;
  created_at: number;
}
export interface Download {
  id: string;
  object: 'download';
  archived: boolean;
  archived_at?: number;
  media: string | Media;
  name?: string;
  product: string | Product;
  update_at: number;
  created_at: number;
  url?: string;
}
export declare type FormState = 'idle' | 'loading' | 'draft' | 'updating' | 'finalizing' | 'paying' | 'confirming' | 'confirmed' | 'paid' | 'failure' | 'expired' | 'redirecting';
export declare type FormStateSetter = 'RESOLVE' | 'REJECT' | 'FINALIZE' | 'PAYING' | 'PAID' | 'EXPIRE' | 'FETCH';
export interface License {
  id: string;
  object: 'license';
  activation_limit: number;
  key: string;
  activations?: {
    object: 'list';
    pagination: Pagination;
    data: Array<Activation>;
  };
  status: 'inactive' | 'active' | 'revoked';
  purchase: string | Purchase;
  created_at: number;
  updated_at: number;
}
export interface CancellationReason {
  id: string;
  object: 'cancellation_reason';
  archived: boolean;
  comment_enabled: false;
  comment_prompt: string | null;
  coupon_enabled: boolean;
  label: string;
  position: number;
  archived_at: number;
  discarded_at: number;
  created_at: number;
  updated_at: number;
}
export interface Period {
  id: string;
  object: 'period';
  ad_hoc_amount?: number;
  checkout: string | Checkout;
  customer_id: string | Customer;
  end_at?: number;
  next_payment_retry_at: number;
  payment_retry_count: number;
  price: string | Price;
  purchase_id: string | Purchase;
  quantity: number;
  renewal: boolean;
  skip_proration: boolean;
  start_at: number;
  status: 'draft';
  subscription: string | Subscription;
  created_at: number;
  updated_at: number;
}
export interface Activation {
  id: string;
  object: 'activation';
  name: string;
  counted: boolean;
  fingerprint: string;
  license: string | License;
  created_at: number;
  updated_at: number;
}
export interface Product extends Object {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  archived_at: string;
  metadata: any;
  image_url: string;
  recurring: boolean;
  tax_category: string;
  tax_enabled: boolean;
  purchase_limit: number;
  prices: {
    object: 'list';
    pagination: Pagination;
    data: Array<Price>;
  };
  downloads: {
    object: 'list';
    pagination: Pagination;
    data: Array<Download>;
  };
  created_at: number;
  updated_at: number;
}
export declare type Products = {
  [id: string]: Product;
};
export interface Coupon extends Model {
  id: string;
  object: 'coupon';
  amount_off: number;
  valid?: boolean;
  expired: boolean;
  currency: string;
  duration: string;
  duration_in_months: number;
  max_redemptions: number;
  metadata: Object;
  name: string;
  percent_off: number;
  redeem_by: number;
  times_redeemed: number;
}
export interface LineItemData extends Object {
  price_id?: string;
  bump?: string;
  quantity: number;
  ad_hoc_amount?: number;
}
export declare type LineItemsData = {
  [id: string]: Array<LineItemData>;
};
export interface LineItem extends Object {
  id?: string;
  ad_hoc_amount?: number;
  name: string;
  object: string;
  quantity: number;
  bump: string | Bump;
  fees?: {
    object: 'list';
    pagination: Pagination;
    data: Array<Fee>;
  };
  bump_amount: number;
  discount_amount: number;
  subtotal_amount: number;
  total_amount: number;
  scratch_amount: number;
  total_savings_amount: number;
  created_at: number;
  updated_at: number;
  price?: Price;
  price_id: string;
}
export interface Fee {
  id: string;
  object: 'fee';
  amount: number;
  description: string;
  fee_type: 'manual' | 'bump' | 'setup';
  line_item: string | LineItem;
  created_at: number;
  updated_at: number;
}
export interface InvoiceItem extends LineItem {
}
export interface PriceChoice {
  id: string;
  product_id: string;
  quantity: number;
  enabled: boolean;
  selected?: boolean;
}
export declare type CheckoutState = 'idle' | 'loading' | 'draft' | 'updating' | 'finalized' | 'paid' | 'failure';
export declare type TaxStatus = 'disabled' | 'address_invalid' | 'reverse_charged' | 'tax_registration_not_found' | 'tax_zone_not_found' | 'estimated' | 'calculated';
export interface Invoice extends Object {
  id: string;
  object: 'invoice';
  currency: string;
  amount_due: number;
  invoice_items: {
    object: 'list';
    pagination: Pagination;
    data: Array<InvoiceItem>;
  };
  discount_amount: number;
  live_mode: boolean;
  metadata: object;
  number: string;
  period_end_at: number;
  period_start_at: number;
  proration_amount: number;
  processor_data: {
    stripe: object;
  };
  status: OrderStatus;
  subtotal_amount: number;
  tax_amount: number;
  tax_status: TaxStatus;
  tax_label: string;
  total_amount: number;
  billing_address: string | BillingAddress;
  charge: string | Charge;
  customer: string | Customer;
  discount: string | object;
  payment_intent: string | PaymentIntent;
  payment_method: string | PaymentMethod;
  shipping_address: string | ShippingAddress;
  subscription: string | Subscription;
  tax_identifier: string | object;
  url: string;
  created_at: number;
  updated_at: number;
}
export interface BillingAddress extends Address {
}
export interface ShippingAddress extends Address {
}
export interface ProductGroup {
  id: string;
  object: 'product_group';
  archived: boolean;
  archived_at: number;
  metadata: object;
  name: string;
  created_at: number;
  updated_at: number;
}
export interface Charge extends Object {
  amount: number;
  created_at: number;
  currency: string;
  customer: string | Customer;
  external_charge_id: string;
  fully_refunded: boolean;
  id: string;
  invoice: string | Invoice;
  live_mode: boolean;
  object: 'charge';
  checkout: string | Checkout;
  payment_method: string | PaymentMethod;
  refunded_amount: number;
  status: 'pending' | 'succeeded' | 'failed';
  updated_at: number;
}
export interface TaxIdentifier {
  id: string;
  number: string;
  number_type: string;
  object: 'tax_identifier';
  eu_vat_verified: boolean;
  created_at: number;
  updated_at: number;
}
export interface TaxProtocol {
  id: string;
  object: 'tax_protocol';
  ca_tax_enabled: boolean;
  eu_micro_exemption_enabled: boolean;
  eu_tax_enabled: boolean;
  eu_vat_required: boolean;
  eu_vat_unverified_behavior: 'error' | 'apply_reverse_charge' | 'skip_reverse_charge';
  eu_vat_local_reverse_charge: boolean;
  tax_enabled: boolean;
  address: string | Address;
  ca_tax_identifier: string | TaxIdentifier;
  eu_tax_identifier: string | TaxIdentifier;
  created_at: number;
  updated_at: number;
}
export interface Order extends Object {
  id?: string;
  object: 'order';
  number?: string;
  order_type?: 'checkout' | 'subscription';
  statement_url?: string;
  status?: OrderStatus;
  checkout?: Checkout | string;
  created_at: number;
  updated_at: number;
}
export interface Checkout extends Object {
  id?: string;
  status?: 'canceled' | 'draft' | 'finalized' | 'paid' | 'payment_intent_canceled' | 'payment_failed' | 'processing';
  staged_payment_intents: {
    object: 'list';
    pagination: Pagination;
    data: Array<PaymentIntent>;
  };
  abandoned_checkout_enabled: boolean;
  bump_amount: number;
  payment_method_required?: boolean;
  manual_payment: boolean;
  manual_payment_method?: string | ManualPaymentMethod;
  reusable_payment_method_required?: boolean;
  number?: string;
  amount_due?: number;
  trial_amount?: number;
  charge?: string | Charge;
  name?: string;
  email?: string;
  live_mode?: boolean;
  currency?: string;
  total_amount?: number;
  subtotal_amount?: number;
  full_amount?: number;
  proration_amount?: number;
  total_savings_amount?: number;
  applied_balance_amount?: number;
  discounts?: number;
  tax_enabled: boolean;
  tax_amount: number;
  email_exists: boolean;
  tax_inclusive_amount: number;
  tax_exclusive_amount: number;
  tax_status: 'disabled' | 'address_invalid' | 'estimated' | 'calculated';
  tax_label: string;
  tax_percent: number;
  line_items: lineItems;
  recommended_bumps?: {
    object: 'list';
    pagination: Pagination;
    data: Array<Bump>;
  };
  metadata?: any;
  payment_intent?: PaymentIntent;
  payment_method?: PaymentMethod;
  order?: string | Order;
  customer: string | Customer;
  subscriptions: {
    object: 'list';
    pagination: Pagination;
    data: Array<Subscription>;
  };
  purchases: {
    object: 'list';
    pagination: Pagination;
    data: Array<Purchase>;
  };
  discount_amount?: number;
  discount?: DiscountResponse;
  billing_address?: string | Address;
  shipping_address?: string | Address;
  shipping_enabled?: boolean;
  processor_data?: ProcessorData;
  tax_identifier?: {
    number: string;
    number_type: string;
  };
  url: string;
  created_at?: number;
}
export interface ProcessorData {
  stripe: {
    account_id: string;
    publishable_key: string;
    client_secret?: string;
    type: 'payment' | 'setup';
  };
  paypal: {
    account_id: string;
    client_id: string;
    merchant_initiated: boolean;
  };
  mollie?: {
    account_id: 'string';
    checkout_url: 'string';
  };
}
export interface ManualPaymentMethod {
  id: string;
  object: 'manual_payment_method';
  archived: boolean;
  archived_at: number;
  description: string;
  instructions: string;
  name: string;
  created_at: number;
  updated_at: number;
}
export interface PaymentMethodType {
  id: string;
  description: string;
  image: string;
}
export interface Processor {
  id: string;
  live_mode: boolean;
  processor_data: {
    account_id: string;
    recurring_enabled: boolean;
    client_id: string;
    merchant_initiated?: boolean;
  };
  recurring_enabled: boolean;
  processor_type: 'paypal' | 'stripe' | 'mollie';
}
export interface Purchase {
  id: string;
  object: 'purchase';
  live_mode: boolean;
  quantity: number;
  revoked: boolean;
  revoked_at: number;
  customer: string | Customer;
  invoice_item: string | InvoiceItem;
  invoice: string | Invoice;
  line_item: string | LineItem;
  order: string | Order;
  product: string | Product;
  refund: string | Refund;
  subscription: string | Subscription;
  license: string | License;
  created_at: number;
  updated_at: number;
}
export interface Refund {
  id: string;
  object: 'refund';
  amount: number;
  currency: string;
  external_refund_id: string;
  live_mode: boolean;
  metadata: object;
  reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' | 'expired_uncaptured_charge';
  status: 'pending' | 'succeeded' | 'failed' | 'canceled';
  charge: string | Charge;
  customer: string | Customer;
  revoked_purchases: null | Array<Purchase>;
  created_at: number;
  updated_at: number;
}
export interface Subscription extends Object {
  id: string;
  object: 'subscription';
  currency?: string;
  status: SubscriptionStatus;
  live_mode: boolean;
  external_subscription_id: string;
  current_cancellation_act: string | CancellationAct;
  trial_end_at: number;
  processor_type: 'stripe' | 'paypal';
  order: Order;
  customer: Customer;
  discount: DiscountResponse;
  finite: boolean;
  pending_update: {
    ad_hoc_amount?: number;
    price?: string;
    quantity?: number;
  };
  purchase: Purchase | string;
  cancel_at_period_end: number | false;
  current_period: string | Period;
  current_period_end_at: number | false;
  current_period_start_at: number | false;
  remaining_period_count: number | null;
  ended_at: number;
  end_behavior: 'cancel' | 'complete';
  payment_method: PaymentMethod | string;
  price: Price;
  ad_hoc_amount: number;
  created_at: number;
  updated_at: number;
  restore_at?: number;
}
export interface CancellationAct {
  id: string;
  object: 'cancellation_act';
  cancellation_reason: string | CancellationReason;
  comment: string;
  coupon_applied: boolean;
  preserved: boolean;
  subscription: string | Subscription;
  performed_at: number;
  created_at: number;
  updated_at: number;
}
export interface SubscriptionProtocol {
  id: string;
  object: 'subscription_protocol';
  cancel_behavior: 'pending' | 'immediate';
  downgrade_behavior: 'pending' | 'immediate';
  payment_retry_window_weeks: number;
  upgrade_behavior: 'pending' | 'immediate';
  preservation_enabled: boolean;
  preservation_locales: {
    reasons_title: string;
    reasons_description: string;
    skip_link: string;
    preserve_title: string;
    preserve_description: string;
    preserve_button: string;
    cancel_link: string;
  };
  preservation_coupon: Coupon | string;
  created_at: number;
  updated_at: number;
}
export declare type SubscriptionStatus = 'incomplete' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'completed';
export declare type CheckoutStatus = 'draft' | 'finalized' | 'paid' | 'payment_intent_canceled' | 'payment_failed' | 'requires_approval';
export declare type OrderStatus = 'paid' | 'payment_failed' | 'processing' | 'void' | 'canceled';
export interface PaymentMethod extends Object {
  id: string;
  object: 'payment_method';
  live_mode: boolean;
  external_payment_method_id: string;
  processor_type: 'stripe' | 'paypal';
  paypal_account: any;
  type: string;
  bank_account: BankAccount | string;
  payment_instrument: PaymentInstrument | string;
  payment_intent: PaymentIntent | string;
  billing_agreement?: BillingAgreement | string;
  card: any;
  customer: Customer | string;
  created_at: number;
  updated_at: number;
}
export interface BankAccount {
  id: string;
  account_type: 'checking' | 'savings';
  account_holder_type: 'individual' | 'company';
  bank_name: string;
  last4: string;
  created_at: number;
  updated_at: number;
}
export interface PaymentInstrument {
  id: string;
  instrument_type: string;
  metadata: any;
  object: 'payment_instrument';
  created_at: number;
  updated_at: number;
}
export interface BillingAgreement {
  email: string;
  external_customer_id: string;
  first_name: string;
  id: string;
  last_name: string;
  object: 'billing_agreement';
  created_at: number;
  updated_at: number;
}
export interface Pagination {
  count: number;
  limit: number;
  page: number;
  url: string;
}
export interface lineItems extends Object {
  object: 'list';
  pagination: Pagination;
  data: Array<LineItem>;
}
export interface Promotion extends Object {
  code: string;
  created_at: number;
  expired: boolean;
  id: string;
  max_redemptions: number;
  metadata: Object;
  object: 'promotion';
  redeem_by: string;
  times_redeemed: number;
}
export interface DiscountResponse {
  coupon?: Coupon;
  id: string;
  object: 'discount';
  promotion: Promotion;
}
export interface ResponseError {
  code: string;
  message: string;
  data: {
    http_status: string;
    status?: number;
    type: string;
  };
  additional_errors: Array<{
    code: string;
    message: string;
    data: {
      attribute: string;
      options: Array<string>;
      type: string;
    };
  }>;
}
export declare type ProcessorName = 'stripe' | 'paypal' | 'paypal-card';
export interface VerificationCode {
  id: string;
  object: 'verification_code';
  code: number;
  verified: boolean;
  verified_at: number | null;
  created_at: number;
  updated_at: number;
}
export interface PaymentIntent extends Object {
  id: string;
  object: 'payment_intent';
  amount: number;
  currency: string;
  processor_type: 'stripe' | 'paypal';
  status: 'pending' | 'succeeded' | 'canceled';
  external_intent_id: string;
  live_mode: boolean;
  processor_data: ProcessorData;
  customer: Customer | string;
  created_at: number;
  updated_at: number;
}
export interface PaymentIntents {
  stripe?: PaymentIntent;
  paypal?: PaymentIntent;
}
export interface SetupIntent extends Object {
  id: string;
  object: 'setup_intent';
  processor_type: 'stripe' | 'paypal';
  status: 'pending' | 'succeeded' | 'canceled';
  external_intent_id: string;
  live_mode: boolean;
  processor_data: ProcessorData;
  customer: Customer | string;
  created_at: number;
  updated_at: number;
}
export interface WordPressUser {
  id: number;
  display_name: string;
  first_name: string;
  last_name: string;
  email: string;
}
export interface Customer extends Object {
  id: string;
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  billing_address?: string | Address;
  shipping_address?: string | Address;
  billing_matches_shipping: boolean;
  live_mode: boolean;
  unsubscribed: boolean;
  default_payment_method: string | PaymentMethod;
  tax_identifier: {
    number: string;
    number_type: string;
  };
  created_at: number;
  updated_at: number;
}
export interface Address extends Object {
  name?: string;
  line_1?: string;
  line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}
export interface PriceData extends Object {
  price_id: string;
  quantity: number;
  removeable: boolean;
}
export declare type TaxZone = {
  label: string;
  label_small: string;
};
export declare type TaxZones = {
  [key in 'ca_gst' | 'au_abn' | 'gb_vat' | 'eu_vat' | 'other']: TaxZone;
};
export declare type RuleName = 'total' | 'coupons' | 'products' | 'shipping_country' | 'billing_country' | 'processors';
export declare type ArrayOperators = 'all' | 'any' | 'none' | 'exist' | 'not_exist';
export declare type NumberOperators = '==' | '!=' | '<' | '>' | '<=' | '>=';
export interface RuleGroup {
  group_id: string;
  rules: Rule[];
}
export interface Rule {
  condition: RuleName;
  operator: NumberOperators | ArrayOperators;
  value: string | string[] | {
    value: string;
  }[];
}
export {};
