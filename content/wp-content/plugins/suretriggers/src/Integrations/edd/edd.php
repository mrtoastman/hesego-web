<?php
/**
 * EDD core integrations file
 *
 * @since 1.0.0
 * @package SureTrigger
 */

namespace SureTriggers\Integrations\EDD;

use Easy_Digital_Downloads;
use EDD_Payment;
use SureTriggers\Controllers\IntegrationsController;
use SureTriggers\Integrations\Integrations;
use SureTriggers\Traits\SingletonLoader;

/**
 * Class SureTrigger
 *
 * @package SureTriggers\Integrations\EDD
 */
class EDD extends Integrations {

	use SingletonLoader;

	/**
	 * ID
	 *
	 * @var string
	 */
	protected $id = 'EDD';

	/**
	 * SureTrigger constructor.
	 */
	public function __construct() {
		$this->name        = __( 'EDD', 'suretriggers' );
		$this->description = __( 'Easy Digital Downloads is a complete eCommerce solution for selling digital products on WordPress.', 'suretriggers' );
		$this->icon_url    = SURE_TRIGGERS_URL . 'assets/icons/edd.svg';

		parent::__construct();
	}

	/**
	 * Get context for Order Created trigger.
	 *
	 * @param EDD_Payment|object|null $payment payment.
	 * @return array
	 */
	public static function get_product_purchase_context( EDD_Payment $payment ) {
		$purchased_products             = implode(
			', ',
			array_map(
				function ( $entry ) {
					return $entry['name'];
				},
				$payment->cart_details
			)
		);
		$context                        = [];
		$context['order_id']            = $payment->ID;
		$context['customer_email']      = $payment->email;
		$context['customer_first_name'] = $payment->first_name;
		$context['customer_last_name']  = $payment->last_name;
		$context['ordered_items']       = $purchased_products;
		$context['currency']            = $payment->currency;
		$context['status']              = $payment->status;
		$context['discount_codes']      = ( property_exists( $payment, 'discounts' ) ) ? $payment->discounts : 'NA';
		$context['order_discounts']     = number_format( $payment->order->discount, 2 );
		$context['order_subtotal']      = number_format( $payment->subtotal, 2 );
		$context['order_tax']           = number_format( $payment->tax, 2 );
		$context['order_total']         = number_format( $payment->total, 2 );
		$context['payment_method']      = $payment->gateway;
		$context['purchase_key']        = $payment->key;
		$context['ordered_items']       = $purchased_products;
		return $context;
	}

	/**
	 * Get context for Stripe Payment Refunded trigger.
	 *
	 * @param EDD_Payment|object|null $order_detail order details.
	 * @return array
	 */
	public static function get_purchase_refund_context( EDD_Payment $order_detail ) {
		$total_discount = 0;
		$item_names     = [];

		$order_items = edd_get_payment_meta_cart_details( $order_detail->ID );

		foreach ( $order_items as $item ) {
			$item_names[] = $item['name'];
			// Sum the discount.
			if ( is_numeric( $item['discount'] ) ) {
				$total_discount += $item['discount'];
			}
		}

		$context = [];

		$context['order_id']            = $order_detail->ID;
		$context['customer_email']      = $order_detail->email;
		$context['customer_first_name'] = $order_detail->first_name;
		$context['customer_last_name']  = $order_detail->last_name;
		$context['ordered_items']       = implode( ',', $item_names );
		$context['currency']            = $order_detail->currency;
		$context['status']              = $order_detail->status;
		$context['discount_codes']      = ( property_exists( $order_detail, 'discounts' ) ) ? $order_detail->discounts : 'NA';
		$context['order_discounts']     = number_format( $total_discount, 2 );
		$context['order_subtotal']      = number_format( $order_detail->subtotal, 2 );
		$context['order_tax']           = number_format( $order_detail->tax, 2 );
		$context['order_total']         = number_format( $order_detail->total, 2 );
		$context['payment_method']      = $order_detail->gateway;

		return $context;
	}

	/**
	 * Is Plugin dependent plugin is installed or not.
	 *
	 * @return bool
	 */
	public function is_plugin_installed() {
		return class_exists( Easy_Digital_Downloads::class );
	}
}

IntegrationsController::register( EDD::class );
