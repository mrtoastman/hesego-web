<style>
	#sc-admin-header {
		background-color: #fff;
		width: 100%;
		margin-left: -20px;
		padding-right: 20px;
	}

	#sc-admin-container {
		padding: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#sc-admin-title {
		margin: 0;
		font-size: var(--sc-font-size-large);
	}
</style>


<div id="sc-admin-header">
	<div id="sc-admin-container">
		<?php if ( ! empty( $breadcrumbs ) ) : ?>
			<sc-breadcrumbs style="font-size: 16px">
				<sc-breadcrumb>
					<img style="display: block" src="<?php echo esc_url( trailingslashit( plugin_dir_url( SURECART_PLUGIN_FILE ) ) . 'images/logo.svg' ); ?>" alt="SureCart" width="125">
				</sc-breadcrumb>
				<?php foreach ( $breadcrumbs as $breadcrumb ) : ?>
					<sc-breadcrumb><?php echo esc_html( $breadcrumb['title'] ?? '' ); ?></sc-breadcrumb>
				<?php endforeach; ?>
			</sc-breadcrumbs>
		<?php endif; ?>
	</div>
</div>
