<?php
/**
 * SpecificPostFieldValueUpdate.
 * php version 5.6
 *
 * @category SpecificPostFieldValueUpdate
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Integrations\JetEngine\Triggers;

use SureTriggers\Controllers\AutomationController;
use SureTriggers\Traits\SingletonLoader;
use SureTriggers\Integrations\WordPress\WordPress;

if ( ! class_exists( 'SpecificPostFieldValueUpdate' ) ) :

	/**
	 * SpecificPostFieldValueUpdate
	 *
	 * @category SpecificPostFieldValueUpdate
	 * @package  SureTriggers
	 * @author   BSF <username@example.com>
	 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
	 * @link     https://www.brainstormforce.com/
	 * @since    1.0.0
	 *
	 * @psalm-suppress UndefinedTrait
	 */
	class SpecificPostFieldValueUpdate {


		/**
		 * Integration type.
		 *
		 * @var string
		 */
		public $integration = 'JetEngine';


		/**
		 * Trigger name.
		 *
		 * @var string
		 */
		public $trigger = 'specific_post_field_value_update';

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
				'label'         => __( 'A user updates a specific JetEngine field on a specific post type to a specific value', 'suretriggers' ),
				'action'        => $this->trigger,
				'common_action' => [ 'added_post_meta', 'updated_post_meta' ],
				'function'      => [ $this, 'trigger_listener' ],
				'priority'      => 10,
				'accepted_args' => 4,
			];

			return $triggers;
		}

		/**
		 * Trigger listener
		 *
		 * @param int $meta_id Meta ID.
		 * @param int $object_id Object ID.
		 * @param int $meta_key Meta Key.
		 * @param int $meta_value Meta Value.
		 * @return void|bool
		 */
		public function trigger_listener( $meta_id, $object_id, $meta_key, $meta_value ) {
		
			// Bail out if value didn't change or if meta value is empty.
			if ( 'added_post_meta' === current_action() ) {
				if ( empty( $meta_value ) ) {
					return false;
				}

				$metaboxes = (array) get_option( 'jet_engine_meta_boxes', [] );

				$post_fields = array_filter(
					$metaboxes,
					function( $metabox ) {
						/** 
						 * 
						 * Ignore line
						 * 
						 * @phpstan-ignore-next-line
						 */
						return 'post' === $metabox['args']['object_type'];
					}
				);
				
				$post_fields = array_column( $post_fields, 'meta_fields' );
				$post_fields = end( $post_fields );

				if ( empty( $post_fields ) && ! is_array( $post_fields ) ) {
					return false;
				}

				$meta_values = get_post_meta( $object_id );

				$meta_keys = [];
				
				foreach ( (array) $meta_values as $key => $value ) {
					/** 
					 * 
					 * Ignore line
					 * 
					 * @phpstan-ignore-next-line
					 */
					if ( ! empty( $value[0] ) ) {
						$meta_keys[] = $key;
					}
				}

				$options_checked = [];
				if ( ! empty( $post_fields ) ) {
					foreach ( $post_fields as $fields ) {
						if ( in_array( $fields['name'], $meta_keys ) ) {
							$options_checked[] = $fields['name'];
						}   
					}
				}

				$context = WordPress::get_post_context( $object_id );
				if ( ! empty( $options_checked ) ) {
					$context[ $options_checked[0] ] = get_post_meta( $object_id, $options_checked[0], true );
					$context['meta_text']           = get_post_meta( $object_id, $options_checked[0], true );
				}
				
				AutomationController::sure_trigger_handle_trigger(
					[
						'trigger' => $this->trigger,
						'context' => $context,
					]
				);
			}
		}
	}

	/**
	 * Ignore false positive
	 *
	 * @psalm-suppress UndefinedMethod
	 */
	SpecificPostFieldValueUpdate::get_instance();

endif;
