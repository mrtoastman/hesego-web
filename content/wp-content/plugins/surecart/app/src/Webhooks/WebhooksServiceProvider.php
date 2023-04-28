<?php

namespace SureCart\Webhooks;

use SureCartCore\ServiceProviders\ServiceProviderInterface;

/**
 * WordPress Users service.
 */
class WebhooksServiceProvider implements ServiceProviderInterface {
	/**
	 * Register all dependencies in the IoC container.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function register( $container ) {
		$container['surecart.webhooks'] = function () use ( $container ) {
			return new WebhooksService( new WebhooksHistoryService() );
		};

		$app = $container[ SURECART_APPLICATION_KEY ];
		$app->alias( 'webhooks', 'surecart.webhooks' );
	}

	/**
	 * Bootstrap any services if needed.
	 *
	 * @param \Pimple\Container $container Service container.
	 * @return void
	 */
	public function bootstrap( $container ) {
		if ( ! empty( $container['surecart.webhooks'] ) ) {
			$container['surecart.webhooks']->maybeCreateWebooks();
			$container['surecart.webhooks']->listenForDomainChanges();
		}
	}
}
