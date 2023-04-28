<?php
/**
 * Global AutomatePlug Functions.
 *
 * @package  Automateplug
 */

/**
 * Get or prepare user id.
 *
 * @return int|mixed|string|void
 */
function ap_get_current_user_id() {

	$user_id = get_current_user_id();

	if ( $user_id ) {
		return $user_id;
	}

	if ( ! session_id() ) { //phpcs:ignore
		session_start(); //phpcs:ignore
	}

	if ( isset( $_SESSION['ap_user_identifier'] ) ) {
		return $_SESSION['ap_user_identifier']; //phpcs:ignore
	}

	$ap_user_id                     = wp_generate_password( 16, false );
	$_SESSION['ap_user_identifier'] = $ap_user_id; //phpcs:ignore

	return $_SESSION['ap_user_identifier']; //phpcs:ignore

}

/**
 * Get or prepare user id.
 *
 * @param string $email user email.
 *
 * @return int|mixed|string|void
 */
function ap_get_user_id_from_email( $email ) {

	if ( empty( $email ) || ! email_exists( $email ) ) {
		return false;
	}

	$get_user = get_user_by( 'email', $email );
	return $get_user->ID;

}

add_action(
	'in_admin_header',
	function () {
		if ( isset( $_GET['page'] ) && 'suretriggers' === sanitize_text_field( $_GET['page'] ) ) { // phpcs:ignore
			remove_all_actions( 'admin_notices' );
			remove_all_actions( 'all_admin_notices' );
		}
	},
	999
);

add_action( 'wp_login', 'suretrigger_capture_login_time', 10, 2 );

/**
 * Login time.
 *
 * @param string $user_login user login.
 * @param object $user user.
 * @return void
 */
function suretrigger_capture_login_time( $user_login, $user ) {
	update_user_meta( $user->ID, 'st_last_login', time() );
}
