<?php
/**
 * @package   SureCartCore
 * @author    SureCart <support@surecart.com>
 * @copyright 2017-2019 SureCart
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0
 * @link      https://surecart.com/
 */

namespace SureCartCore\Middleware;

/**
 * Interface for HasControllerMiddlewareTrait.
 */
interface HasControllerMiddlewareInterface {
	/**
	 * Get middleware.
	 *
	 * @param  string $method
	 * @return string[]
	 */
	public function getMiddleware( $method );

	/**
	 * Add middleware.
	 *
	 * @param  string|string[] $middleware
	 * @return ControllerMiddleware
	 */
	public function addMiddleware( $middleware );

	/**
	 * Fluent alias for addMiddleware().
	 *
	 * @param  string|string[] $middleware
	 * @return ControllerMiddleware
	 */
	public function middleware( $middleware );
}
