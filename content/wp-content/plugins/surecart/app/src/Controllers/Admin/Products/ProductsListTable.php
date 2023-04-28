<?php

namespace SureCart\Controllers\Admin\Products;

use SureCart\Models\Product;
use SureCart\Support\Currency;
use SureCart\Support\TimeDate;
use SureCart\Controllers\Admin\Tables\ListTable;
use SureCart\Models\Integration;

/**
 * Create a new table class that will extend the WP_List_Table
 */
class ProductsListTable extends ListTable {
	public $checkbox = true;
	public $error    = '';

	/**
	 * Prepare the items for the table to process
	 *
	 * @return Void
	 */
	public function prepare_items() {
		$columns  = $this->get_columns();
		$hidden   = $this->get_hidden_columns();
		$sortable = $this->get_sortable_columns();

		$this->_column_headers = array( $columns, $hidden, $sortable );

		$query = $this->table_data();
		if ( is_wp_error( $query ) ) {
			$this->error = $query->get_error_message();
			$this->items = [];
			return;
		}

		$this->set_pagination_args(
			[
				'total_items' => $query->pagination->count,
				'per_page'    => $this->get_items_per_page( 'products' ),
			]
		);

		$this->items = $query->data;
	}

	/**
	 * @global int $post_id
	 * @global string $comment_status
	 * @global string $comment_type
	 */
	protected function get_views() {
		$stati = [
			'active'   => __( 'Active', 'surecart' ),
			'archived' => __( 'Archived', 'surecart' ),
			'all'      => __( 'All', 'surecart' ),
		];

		$link = admin_url( 'admin.php?page=sc-products' );

		foreach ( $stati as $status => $label ) {
			$current_link_attributes = '';

			if ( ! empty( $_GET['status'] ) ) {
				if ( $status === $_GET['status'] ) {
					$current_link_attributes = ' class="current" aria-current="page"';
				}
			} elseif ( 'active' === $status ) {
				$current_link_attributes = ' class="current" aria-current="page"';
			}

			$link = add_query_arg( 'status', $status, $link );

			$status_links[ $status ] = "<a href='$link'$current_link_attributes>" . $label . '</a>';
		}

		/**
		 * Filters the comment status links.
		 *
		 * @since 2.5.0
		 * @since 5.1.0 The 'Mine' link was added.
		 *
		 * @param string[] $status_links An associative array of fully-formed comment status links. Includes 'All', 'Mine',
		 *                              'Pending', 'Approved', 'Spam', and 'Trash'.
		 */
		return apply_filters( 'comment_status_links', $status_links );
	}

	/**
	 * Override the parent columns method. Defines the columns to use in your listing table
	 *
	 * @return Array
	 */
	public function get_columns() {
		return [
			// 'cb'          => '<input type="checkbox" />',
			'name'         => __( 'Name', 'surecart' ),
			// 'description' => __( 'Description', 'surecart' ),
			'price'        => __( 'Price', 'surecart' ),
			// 'type'         => __( 'Type', 'surecart' ),
			'integrations' => __( 'Integrations', 'surecart' ),
			'date'         => __( 'Date', 'surecart' ),
		];
	}

	/**
	 * Displays the checkbox column.
	 *
	 * @param Product $product The product model.
	 */
	public function column_cb( $product ) {
		?>
		<label class="screen-reader-text" for="cb-select-<?php echo esc_attr( $product['id'] ); ?>"><?php _e( 'Select comment', 'surecart' ); ?></label>
		<input id="cb-select-<?php echo esc_attr( $product['id'] ); ?>" type="checkbox" name="delete_comments[]" value="<?php echo esc_attr( $product['id'] ); ?>" />
			<?php
	}

	/**
	 * Show any integrations.
	 */
	public function column_integrations( $product ) {
		$list = $this->productIntegrationsList( $product->id );
		return $list ? $list : '-';
	}

	/**
	 * Define which columns are hidden
	 *
	 * @return Array
	 */
	public function get_hidden_columns() {
		return array();
	}

	/**
	 * Define the sortable columns
	 *
	 * @return Array
	 */
	public function get_sortable_columns() {
		return array( 'title' => array( 'title', false ) );
	}

	/**
	 * Get the table data
	 *
	 * @return Array
	 */
	private function table_data() {
		return Product::where(
			[
				'archived' => $this->getArchiveStatus(),
				'query'    => $this->get_search_query(),
			]
		)->with(
			[
				'prices',
			]
		)->paginate(
			[
				'per_page' => $this->get_items_per_page( 'products' ),
				'page'     => $this->get_pagenum(),
			]
		);
	}

	/**
	 * Nothing found.
	 *
	 * @return void
	 */
	public function no_items() {
		if ( $this->error ) {
			echo esc_html( $this->error );
			return;
		}
		echo esc_html_e( 'No products found.', 'surecart' );
	}

	/**
	 * Handle the type column output.
	 *
	 * @param \SureCart\Models\Price $product Product model.
	 *
	 * @return string
	 */
	public function column_type( $product ) {
		if ( $product->recurring ) {
			return '<sc-tag type="success">
			<div
				style="
					display: flex;
					align-items: center;
					gap: 0.5em;"
			>
				<sc-icon name="repeat"></sc-icon>
				' . esc_html__( 'Subscription', 'surecart' ) . '
			</div>
		</sc-tag>';
		}

		return '<sc-tag type="info">
		<div
			style="
				display: flex;
				align-items: center;
				gap: 0.5em;"
		>
			<sc-icon name="bookmark"></sc-icon>
			' . esc_html__( 'One-Time', 'surecart' ) . '
		</div>
	</sc-tag>';
	}

	/**
	 * Handle the price column.
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return string
	 */
	public function column_price( $product ) {
		$prices = $product->prices->data ?? [];

		// this has no prices.
		if ( empty( $prices ) || ! is_array( $prices ) ) {
			return '<sc-tag type="warning">' . esc_html__( 'No price', 'surecart' ) . '</sc-tag>';
		}

		// map the prices into an array of formatted price strings.
		$price_display = array_map(
			function( $price ) {
				if ( $price->ad_hoc ) {
					return esc_html__( 'Name your own price', 'surecart' );
				}
				if ( 0 === $price->amount ) {
					return esc_html__( 'Free', 'surecart' );
				}
				return '<sc-format-number type="currency" currency="' . $price->currency . '" value="' . $price->amount . '"></sc-format-number>';     },
			$prices
		);

		// combine into string with commas.
		$price_output = implode( ', ', array_slice( $price_display, 0, 2 ) );

		if ( $product->metrics->prices_count > 2 ) {
			// translators: %d is the number of other prices.
			$price_output .= sprintf( _n( ' and %d other price.', ' and %d other prices.', $product->metrics->prices_count - 2, 'surecart' ), $product->metrics->prices_count - 2 );
		}

		return $price_output;
	}

	/**
	 * Handle the status
	 *
	 * @param \SureCart\Models\Price $product Product model.
	 *
	 * @return string
	 */
	public function column_date( $product ) {
		$created = sprintf(
			'<time datetime="%1$s" title="%2$s">%3$s</time>',
			esc_attr( $product->created_at ),
			esc_html( TimeDate::formatDateAndTime( $product->created_at ) ),
			esc_html( TimeDate::humanTimeDiff( $product->created_at ) )
		);
		$updated = sprintf(
			'%1$s <time datetime="%2$s" title="%3$s">%4$s</time>',
			__( 'Updated', 'surecart' ),
			esc_attr( $product->updated_at ),
			esc_html( TimeDate::formatDateAndTime( $product->updated_at ) ),
			esc_html( TimeDate::humanTimeDiff( $product->updated_at ) )
		);
		return $created . '<br /><small style="opacity: 0.75">' . $updated . '</small>';
	}

	/**
	 * Name column
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 *
	 * @return string
	 */
	public function column_name( $product ) {
		ob_start();
		?>

		<div class="sc-product-name">
		<?php if ( $product->image_url ) { ?>
			<img src="<?php echo esc_url( $product->image_url ); ?>" class="sc-product-image-preview" />
		<?php } else { ?>
		<div class="sc-product-image-preview">
			<svg xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
			  </svg>
		</div>
	  <?php } ?>

	  <div>
		<a class="row-title" aria-label="<?php echo esc_attr( 'Edit Product', 'surecart' ); ?>" href="<?php echo esc_url( \SureCart::getUrl()->edit( 'product', $product->id ) ); ?>">
			<?php echo esc_html_e( $product->name, 'surecart' ); ?>
		</a>

		<script> function copyClick(e, content){
			navigator.clipboard.writeText(content).then(() =>{
				const oldText = e.target.innerText;
				e.target.innerText = '<?php echo esc_html_e( 'Copied!', 'surecart' ); ?>';
				setTimeout(() =>{
					e.target.innerText = oldText;
				}, 2000);
			}).catch(err => {

			});
		} </script>


		<?php
		echo $this->row_actions(
			[
				'edit'  => '<a href="' . esc_url( \SureCart::getUrl()->edit( 'product', $product->id ) ) . '" aria-label="' . esc_attr( 'Edit Product', 'surecart' ) . '">' . __( 'Edit', 'surecart' ) . '</a>',
				'trash' => $this->action_toggle_archive( $product ),
			],
		);
		?>
		</div>

		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Toggle archive action link and text.
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 * @return string
	 */
	public function action_toggle_archive( $product ) {
		$text            = $product->archived ? __( 'Un-Archive', 'surecart' ) : __( 'Archive', 'surecart' );
		$confirm_message = $product->archived ? __( 'Are you sure you want to restore this product? This will be be available to purchase.', 'surecart' ) : __( 'Are you sure you want to archive this product? This will be unavailable for purchase.', 'surecart' );
		$link            = \SureCart::getUrl()->toggleArchive( 'product', $product->id );

		return sprintf(
			'<a class="submitdelete" onclick="return confirm(\'%1s\')" href="%2s" aria-label="%3s">%4s</a>',
			esc_attr( $confirm_message ),
			esc_url( $link ),
			esc_attr__( 'Toggle Product Archive', 'surecart' ),
			esc_html( $text )
		);
	}

	/**
	 * Define what data to show on each column of the table
	 *
	 * @param \SureCart\Models\Product $product Product model.
	 * @param String                   $column_name - Current column name.
	 *
	 * @return Mixed
	 */
	public function column_default( $product, $column_name ) {
		switch ( $column_name ) {
			case 'name':
				return '<a href="' . \SureCart::getUrl()->edit( 'product', $product->id ) . '">' . $product->name . '</a>';
			case 'name':
			case 'description':
				return $product->$column_name ?? '';
		}
	}
}
