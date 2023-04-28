<?php
/**
 * ChangeRole.
 * php version 5.6
 *
 * @category ChangeRole
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Integrations\Wordpress\Actions;

use SureTriggers\Integrations\AutomateAction;
use SureTriggers\Traits\SingletonLoader;
use WP_User;

/**
 * ChangeRole
 *
 * @category ChangeRole
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */
class ChangeRole extends AutomateAction {

	/**
	 * Integration type.
	 *
	 * @var string
	 */
	public $integration = 'WordPress';

	/**
	 * Action name.
	 *
	 * @var string
	 */
	public $action = 'change_role';

	use SingletonLoader;

	/**
	 * Register action.
	 *
	 * @param array $actions action data.
	 * @return array
	 */
	public function register( $actions ) {
		$actions[ $this->integration ][ $this->action ] = [
			'label'    => __( "Role: Change the user's role to a new role", 'suretriggers' ),
			'action'   => 'change_role',
			'function' => [ $this, 'action_listener' ],
		];

		return $actions;
	}

	/**
	 * Action listener.
	 *
	 * @param int   $user_id user_id.
	 * @param int   $automation_id automation_id.
	 * @param array $fields fields.
	 * @param array $selected_options selectedOptions.
	 *
	 * @return bool
	 */
	public function _action_listener( $user_id, $automation_id, $fields, $selected_options ) {
		$field = reset( $fields );
		$user  = new WP_User( $user_id );

		if ( ! $user instanceof WP_User ) {
			$this->set_error(
				[
					'wp_user_id' => $user_id,
					'msg'        => __( 'This user is not type of WP_User', 'suretriggers' ),
				]
			);
			return false;
		}

		$user->set_role( $selected_options[ $field['name'] ] );

		return true;
	}
}

ChangeRole::get_instance();
