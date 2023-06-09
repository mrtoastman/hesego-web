<?php
/**
 * @package   SureCartCore
 * @author    SureCart <support@surecart.com>
 * @copyright 2017-2019 SureCart
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0
 * @link      https://surecart.com/
 */

namespace SureCartCore\View;

/**
 * Interface that view finders must implement.
 */
interface ViewFinderInterface {
	/**
	 * Check if a view exists.
	 *
	 * @param  string $view
	 * @return boolean
	 */
	public function exists( $view );

	/**
	 * Return a canonical string representation of the view name.
	 *
	 * @param  string $view
	 * @return string
	 */
	public function canonical( $view );
}
