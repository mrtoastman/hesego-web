<?php
/**
 * @package   SureCartCore
 * @author    SureCart <support@surecart.com>
 * @copyright 2017-2019 SureCart
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0
 * @link      https://surecart.com/
 */

namespace SureCartCore\Routing\Conditions;

use SureCartCore\Requests\RequestInterface;

/**
 * Check against the current post's status.
 *
 * @codeCoverageIgnore
 */
class PostStatusCondition implements ConditionInterface {
	/**
	 * Post status to check against.
	 *
	 * @var string
	 */
	protected $post_status = '';

	/**
	 * Constructor
	 *
	 * @codeCoverageIgnore
	 * @param string $post_status
	 */
	public function __construct( $post_status ) {
		$this->post_status = $post_status;
	}

	/**
	 * {@inheritDoc}
	 */
	public function isSatisfied( RequestInterface $request ) {
		$post = get_post();
		return ( is_singular() && $post && $this->post_status === $post->post_status );
	}

	/**
	 * {@inheritDoc}
	 */
	public function getArguments( RequestInterface $request ) {
		return [ 'post_status' => $this->post_status ];
	}
}
