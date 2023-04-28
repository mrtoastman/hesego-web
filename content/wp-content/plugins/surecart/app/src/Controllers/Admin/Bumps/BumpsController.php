<?php

namespace SureCart\Controllers\Admin\Bumps;

use SureCart\Controllers\Admin\AdminController;
use SureCart\Models\Product;
use SureCartCore\Responses\RedirectResponse;
use SureCart\Controllers\Admin\Bumps\BumpsListTable;

/**
 * Handles product admin requests.
 */
class BumpsController extends AdminController {

	/**
	 * Bumps index.
	 */
	public function index() {
		$table = new BumpsListTable();
		$table->prepare_items();
		$this->withHeader(
			[
				'bumps' => [
					'title' => __( 'Bumps', 'surecart' ),
				],
			]
		);
		return \SureCart::view( 'admin/bumps/index' )->with( [ 'table' => $table ] );
	}

	/**
	 * Edit
	 */
	public function edit() {
		// enqueue needed script.
		add_action( 'admin_enqueue_scripts', \SureCart::closure()->method( BumpScriptsController::class, 'enqueue' ) );
		// return view.
		return '<div id="app"></div>';
	}

	/**
	 * Change the archived attribute in the model
	 *
	 * @param \SureCartCore\Requests\RequestInterface $request Request.
	 * @return void
	 */
	public function toggleArchive( $request ) {
		$product = Product::find( $request->query( 'id' ) );

		if ( is_wp_error( $product ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $product->get_error_messages() ) ) );
		}

		$updated = $product->update(
			[
				'archived' => ! (bool) $product->archived,
			]
		);

		if ( is_wp_error( $updated ) ) {
			wp_die( implode( ' ', array_map( 'esc_html', $updated->get_error_messages() ) ) );
		}

		\SureCart::flash()->add(
			'success',
			$updated->archived ? __( 'Product archived.', 'surecart' ) : __( 'Product restored.', 'surecart' )
		);

		return $this->redirectBack( $request );
	}

	public function redirectBack( $request ) {
		return ( new RedirectResponse( $request ) )->back();
	}
}
