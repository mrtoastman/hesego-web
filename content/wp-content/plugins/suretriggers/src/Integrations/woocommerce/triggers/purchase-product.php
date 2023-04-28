<?php
/**
 * PurchaseProduct.
 * php version 5.6
 *
 * @category PurchaseProduct
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Integrations\Woocommerce\Triggers;

use SureTriggers\Controllers\AutomationController;
use SureTriggers\Integrations\WooCommerce\WooCommerce;
use SureTriggers\Integrations\WordPress\WordPress;
use SureTriggers\Traits\SingletonLoader;

if ( ! class_exists( 'PurchaseProduct' ) ) :

	/**
	 * PurchaseProduct
	 *
	 * @category PurchaseProduct
	 * @package  SureTriggers
	 * @author   BSF <username@example.com>
	 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
	 * @link     https://www.brainstormforce.com/
	 * @since    1.0.0
	 *
	 * @psalm-suppress UndefinedTrait
	 */
	class PurchaseProduct {

		/**
		 * Integration type.
		 *
		 * @var string
		 */
		public $integration = 'WooCommerce';

		/**
		 * Trigger name.
		 *
		 * @var string
		 */
		public $trigger = 'wc_purchase_product';

		use SingletonLoader;

		/**
		 * Constructor
		 *
		 * @since  1.0.0
		 */
		public function __construct() {
			add_filter( 'sure_trigger_register_trigger', [ $this, 'register' ] );
		}

		/**
		 * Register action.
		 *
		 * @param array $triggers trigger data.
		 * @return array
		 */
		public function register( $triggers ) {
			$triggers[ $this->integration ][ $this->trigger ] = [
				'label'         => __( 'User purchases a product', 'suretriggers' ),
				'action'        => $this->trigger,
				'common_action' => 'woocommerce_checkout_order_processed',
				'function'      => [ $this, 'trigger_listener' ],
				'priority'      => 10,
				'accepted_args' => 1,
			];

			return $triggers;
		}

		/**
		 *  Trigger listener
		 *
		 * @param int $order_id order ID.
		 *
		 * @return void
		 */
		public function trigger_listener( $order_id ) {
			if ( ! $order_id ) {
				return;
			}
			$order = wc_get_order( $order_id );

			if ( ! $order ) {
				return;
			}

			$user_id = $order->get_customer_id();

			$items       = $order->get_items();
			$product_ids = [];

			foreach ( $items as $item ) {
				$product_ids[] = $item->get_product_id();
			}
			$context = array_merge(
				WooCommerce::get_order_context( $order_id ),
				WordPress::get_user_context( $user_id )
			);

			$context['total_items_in_order'] = count( $product_ids );
			AutomationController::sure_trigger_handle_trigger(
				[
					'trigger' => $this->trigger,
					'context' => $context,
				]
			);
		}
	}

	/**
	 * Ignore false positive
	 *
	 * @psalm-suppress UndefinedMethod
	 */
	PurchaseProduct::get_instance();

endif;
