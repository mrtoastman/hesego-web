<?php
/**
 * ReviewProduct.
 * php version 5.6
 *
 * @category ReviewProduct
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Integrations\Wordpress\Triggers;

use SureTriggers\Controllers\AutomationController;
use SureTriggers\Integrations\WooCommerce\WooCommerce;
use SureTriggers\Integrations\WordPress\WordPress;
use SureTriggers\Traits\SingletonLoader;
use WP_Post;

/**
 * ReviewProduct
 *
 * @category ReviewProduct
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */
class ReviewProduct {

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
	public $trigger = 'wc_review_product';

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
			'event_name'    => 'wp_insert_comment',
			'label'         => __( 'User reviews a product', 'suretriggers' ),
			'action'        => $this->trigger,
			'common_action' => 'wp_insert_comment',
			'function'      => [ $this, 'trigger_listener' ],
			'priority'      => 10,
			'accepted_args' => 2,
		];

		return $triggers;
	}

	/**
	 * Trigger listener
	 *
	 * @param int          $comment_id comment id.
	 * @param object|array $comment comment.
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function trigger_listener( $comment_id, $comment ) {
		if ( is_object( $comment ) ) {
			$comment = get_object_vars( $comment );
		}

		$post = get_post( absint( $comment['comment_post_ID'] ) );

		if ( ! $post instanceof WP_Post ) {
			return;
		}

		if ( 'review' !== $comment['comment_type'] ) {
			return;
		}

		$context               = array_merge(
			WooCommerce::get_product_context( $comment['comment_post_ID'] ),
			WordPress::get_user_context( $comment['user_id'] )
		);
		$context['comment_id'] = $comment_id;
		$context['comment']    = $comment['comment_content'];
		AutomationController::sure_trigger_handle_trigger(
			[
				'trigger' => $this->trigger,
				'context' => $context,
			]
		);
	}
}

ReviewProduct::get_instance();
