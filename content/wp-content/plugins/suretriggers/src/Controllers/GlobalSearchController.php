<?php
/**
 * GlobalSearchController.
 * php version 5.6
 *
 * @category GlobalSearchController
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Controllers;

use DOMDocument;
use FluentCrm\App\Models\CustomContactField;
use FluentCrm\App\Models\Subscriber;
use FluentCrm\App\Models\Tag;
use FluentCrm\Framework\Support\Arr;
use GFCommon;
use GFFormsModel;
use Give_Payment;
use MeprBaseRealGateway;
use MeprOptions;
use PrestoPlayer\Models\Video;
use RGFormsModel;
use SureTriggers\Integrations\AffiliateWP\AffiliateWP;
use SureTriggers\Integrations\EDD\EDD;
use SureTriggers\Integrations\LearnDash\LearnDash;
use SureTriggers\Integrations\LifterLMS\LifterLMS;
use SureTriggers\Integrations\MemberPress\MemberPress;
use SureTriggers\Integrations\PeepSo\PeepSo;
use SureTriggers\Integrations\RestrictContent\RestrictContent;
use SureTriggers\Integrations\TheEventCalendar\TheEventCalendar;
use SureTriggers\Integrations\WishlistMember\WishlistMember;
use SureTriggers\Integrations\WooCommerce\WooCommerce;
use SureTriggers\Integrations\WordPress\WordPress;
use SureTriggers\Models\Utilities;
use SureTriggers\Traits\SingletonLoader;
use Tribe__Tickets__Tickets_Handler;
use WC_Subscription;
use WC_Subscriptions_Product;
use WP_Query;
use WP_Comment_Query;
use WP_REST_Request;
use WP_REST_Response;
use WPForms_Form_Handler;
use CP_V2_Popups;
use Project_Huddle;
use FrmForm;
use Forminator_API;

/**
 * GlobalSearchController- Add ajax related functions here.
 *
 * @category GlobalSearchController
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 *
 * @psalm-suppress UndefinedTrait
 */
class GlobalSearchController {

	use SingletonLoader;

	/**
	 * Search post by post type.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_post( $data ) {
		$result = [];
		$posts  = Utilities::find_posts_by_title( $data );

		foreach ( $posts['results'] as $post ) {
			$result[] = [
				'label' => $post['post_title'],
				'value' => $post['ID'],
			];
		}

		return [
			'options' => $result,
			'hasMore' => $posts['has_more'],
		];
	}

	/**
	 * Search Course.
	 *
	 * @param array $data quesry params.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function search_ld_course( $data ) {
		$courses = get_posts(
			[

				'post_type'   => 'product',
				'meta_key'    => '_related_course',
				'post_status' => 'publish',
			]
		);
		$options = [];
		foreach ( $courses as $course ) {
			$options[] = [
				'label' => $course->post_title,
				'value' => $course->ID,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Search achievement by post type.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_achievements( $data ) {
		$post = get_post( $data['dynamic'] );
		$slug = $post->post_name;

		$achievements = get_posts(
			[
				'post_type'   => $slug,
				'post_status' => 'publish',
			]
		);
		$options      = [];
		foreach ( $achievements as $achievement ) {
			$options[] = [
				'label' => $achievement->post_title,
				'value' => (string) $achievement->ID,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Search Course.
	 *
	 * @param array $data quesry params.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function search_tutor_course( $data ) {
		$courses = get_posts(
			[
				'post_type'   => tutor()->course_post_type,
				'post_status' => 'publish',
				'numberposts' => '-1',
			]
		);
		$options = [];
		foreach ( $courses as $course ) {
			$options[] = [
				'label' => $course->post_title,
				'value' => $course->ID,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Search Products.
	 *
	 * @param array $data quesry params.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function search_product( $data ) {
		$result = [];
		$posts  = Utilities::find_posts_by_title( $data );

		foreach ( $posts['results'] as $post ) {
			$result[] = [
				'label' => $post['post_title'],
				'value' => $post['post_title'],
			];
		}

		return [
			'options' => $result,
			'hasMore' => $posts['has_more'],
		];
	}

	/**
	 * Search Product Categories.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 */
	public function search_product_category( $data ) {
		if ( ! empty( $data['dynamic'] ) ) {
			$taxonomy = $data['dynamic'];
		} else {
			$taxonomy = isset( $data['taxonomy'] ) ? $data['taxonomy'] : '';
		}

		$term   = $data['term'];
		$result = [];
		$terms  = Utilities::get_terms( $term, $data['page'], $taxonomy );
		foreach ( $terms['result'] as $tax_term ) {
			$result[] = [
				'label' => $tax_term->name,
				'value' => $tax_term->name,
			];
		}

		return [
			'options' => $result,
			'hasMore' => $terms['has_more'],
		];
	}

	/**
	 * Search Product Tags.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 */
	public function search_product_tags( $data ) {
		if ( ! empty( $data['dynamic'] ) ) {
			$taxonomy = $data['dynamic'];
		} else {
			$taxonomy = isset( $data['taxonomy'] ) ? $data['taxonomy'] : '';
		}

		$term   = $data['term'];
		$result = [];
		$terms  = Utilities::get_terms( $term, $data['page'], $taxonomy );

		foreach ( $terms['result'] as $tax_term ) {
			$result[] = [
				'label' => $tax_term->name,
				'value' => $tax_term->name,
			];
		}

		return [
			'options' => $result,
			'hasMore' => $terms['has_more'],
		];
	}

	/**
	 * Global ajax search.
	 * Here you need to add the field action name to work.
	 *
	 * @param WP_REST_Request $request Request data.
	 *
	 * @return WP_REST_Response
	 * @since 1.0.0
	 */
	public function global_search( $request ) {
		$post_type   = $request->get_param( 'post_type' );
		$dynamic     = $request->get_param( 'dynamic' );
		$search_term = $request->get_param( 'term' );
		$identifier  = $request->get_param( 'field_identifier' );
		$page        = max( 1, $request->get_param( 'page' ) );
		$taxonomy    = $request->get_param( 'taxonomy' ) ? $request->get_param( 'taxonomy' ) : [];

		$filter = $request->get_param( 'filter' ) ? json_decode( stripslashes( $request->get_param( 'filter' ) ), true ) : [];

		$data     = [
			'dynamic'     => $dynamic,
			'search_term' => $search_term,
			'page'        => $page,
			'taxonomy'    => $taxonomy,
			'filter'      => $filter,
			'post_type'   => $post_type,
		];
		$response = [
			'hasMore' => false,
			'options' => [],
		];

		$method_name = 'search_' . $identifier;

		if ( method_exists( $this, $method_name ) ) {
			$response = $this->{$method_name}( $data );
		} else {
			return RestController::error_message( 'Invalid field Identifier param.' );
		}

		return RestController::success_message( $response );
	}

	/**
	 * Search Taxonomy Terms.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_term( $data ) {
		if ( ! empty( $data['dynamic'] ) ) {
			$taxonomy = $data['dynamic'];
		} else {
			$taxonomy = isset( $data['taxonomy'] ) ? $data['taxonomy'] : '';
		}

		$term   = $data['term'];
		$result = [];
		$terms  = Utilities::get_terms( $term, $data['page'], $taxonomy );
		foreach ( $terms['result'] as $tax_term ) {
			$result[] = [
				'label' => $tax_term->name,
				'value' => $tax_term->term_id,
			];
		}

		return [
			'options' => $result,
			'hasMore' => $terms['has_more'],
		];
	}

	/**
	 * Search users.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_user( $data ) {
		$result = [];
		$page   = $data['page'];
		$users  = Utilities::get_users( $data, $page );

		if ( is_array( $users['results'] ) ) {
			foreach ( $users['results'] as $user ) {
				$result[] = [
					'label' => $user->user_login,
					'value' => $user->ID,
				];
			}
		}

		return [
			'options' => $result,
			'hasMore' => $users['has_more'],
		];

	}

	/**
	 * Search WPForm fields.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_pluggable_wpform_fields( $data ) {
		$result        = [];
		$page          = $data['page'];
		$form_id       = absint( $data['dynamic'] );
		$wpform_fields = Utilities::get_wpform_fields( $data['search_term'], $page, $form_id );

		if ( is_array( $wpform_fields['results'] ) ) {
			foreach ( $wpform_fields['results'] as $field ) {
				$result[] = [
					'label' => $field['label'],
					'value' => '{' . $field['id'] . '}',
				];
			}
		}

		return [
			'options' => $result,
			'hasMore' => $wpform_fields['has_more'],
		];
	}

	/**
	 * Prepare variable products.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_variable_products( $data ) {
		$products = Utilities::get_variable_products( $data['search_term'], $data['page'] );
		$options  = [];

		foreach ( $products['result'] as $product ) {
			$options[] = [
				'label' => $product->get_title(),
				'value' => (string) $product->get_id(),
			];
		}

		return [
			'options' => $options,
			'hasMore' => $products['has_more'],
		];
	}

	/**
	 * Prepare variable products.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_product_variations( $data ) {
		$variations = Utilities::get_product_variations( $data['dynamic'] );
		$options    = [];

		foreach ( $variations['result'] as $product ) {
			$options[] = [
				'label' => ! empty( $product->post_excerpt ) ? $product->post_excerpt : $product->post_title,
				'value' => (string) $product->ID,
			];
		}

		return [
			'options' => $options,
			'hasMore' => $variations['has_more'],
		];
	}

	/**
	 * Search WooCommerce Subscriptions.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_subscription_variation( $data ) {
		$subscription_products = Utilities::get_subscription_variation( $data['search_term'], $data['page'] );
		$result                = [];

		if ( ! function_exists( 'wc_get_products' ) ) {
			return $result;
		}

		foreach ( $subscription_products['result'] as $post ) {
			if ( $data['search_term'] ) {
				if ( false !== stripos( $post->get_title(), $data['search_term'] ) ) {
					$result[] = [
						'label' => $post->get_title(),
						'value' => (string) $post->get_id(),
					];
				}
			} else {
				$result[] = [
					'label' => $post->get_title(),
					'value' => (string) $post->get_id(),
				];
			}
		}

		return [
			'options' => $result,
			'hasMore' => $subscription_products['has_more'],
		];
	}

	/**
	 * Prepare WooCommerce Payment Methods.
	 *
	 * @param array $data Search Params.
	 * @return array[]
	 */
	public function search_woo_payment_methods( $data ) {
		$payment_methods = WC()->payment_gateways->get_available_payment_gateways();
		$options         = [];

		if ( ! empty( $payment_methods ) ) {
			foreach ( $payment_methods as $payment ) {
				$options[] = [
					'label' => $payment->title,
					'value' => $payment->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare WooCommerce Order Status List.
	 *
	 * @param array $data Search Params.
	 * @return array[]
	 */
	public function search_woo_order_status_list( $data ) {
		$order_status = wc_get_order_statuses();
		$options      = [];

		if ( ! empty( $order_status ) ) {
			foreach ( $order_status as $key => $status ) {
				$options[] = [
					'label' => $status,
					'value' => $key,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare WooCommerce Country List.
	 *
	 * @param array $data Search Params.
	 * @return array[]
	 */
	public function search_woo_country_list( $data ) {
		$countries = WC()->countries->get_countries();
		$options   = [];

		if ( ! empty( $countries ) ) {
			foreach ( $countries as $key => $country ) {
				$options[] = [
					'label' => $country,
					'value' => $key,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare WooCommerce Country States List.
	 *
	 * @param array $data Search Params.
	 * @return array[]
	 */
	public function search_woo_country_state_list( $data ) {
		if ( ! empty( $data['dynamic']['shipping_country'] ) ) {
			$cc = $data['dynamic']['shipping_country'];
		} else {
			$cc = $data['dynamic'];
		}

		$states = WC()->countries->get_states( $cc );

		$options = [];
		if ( ! empty( $states ) ) {
			foreach ( $states as $key => $state ) {
				$options[] = [
					'label' => $state,
					'value' => $key,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get Memberpress gatways (payment methods) for  subscription.
	 *
	 * @param array $data QueryParams.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function search_memberpress_gayways( $data ) {
		$mp_options = MeprOptions::fetch();

		$pms      = array_keys( $mp_options->integrations );
		$gateways = [];

		foreach ( $pms as $pm_id ) {
			$obj = $mp_options->payment_method( $pm_id );
			if ( $obj instanceof MeprBaseRealGateway ) {
				$gateways[] = [
					'label' => sprintf( '%1$s (%2$s)', $obj->label, $obj->name ),
					'value' => $obj->id,
				];
			}
		}

		return [
			'options' => $gateways,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare roles.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_roles( $data ) {
		if ( function_exists( 'get_editable_roles' ) ) {
			$roles = get_editable_roles();
		} else {
			$roles = wp_roles()->roles;
			$roles = apply_filters( 'editable_roles', $roles );
		}

		$options = [];
		foreach ( $roles as $role => $details ) {

			$options[] = [
				'label' => $details['name'],
				'value' => $role,
			];

		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Fetch operators.
	 *
	 * @return array
	 */
	public function search_condition_operators() {
		return [
			'options' => EventHelperController::get_instance()->prepare_operators(),
			'hasMore' => false,
		];
	}

	/**
	 * Prepare post types.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_post_types( $data ) {
		$post_types = get_post_types( [ 'public' => true ], 'object' );
		$post_types = apply_filters( 'suretriggers_post_types', $post_types );
		if ( isset( $post_types['attachment'] ) ) {
			unset( $post_types['attachment'] );
		}

		$options = [];
		foreach ( $post_types as $post_type => $details ) {
			$options[] = [
				'label' => $details->label,
				'value' => $post_type,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get post statuses.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_post_statuses( $data ) {
		$post_statuses = get_post_stati( [], 'objects' );
		$post_statuses = apply_filters( 'suretriggers_post_types', $post_statuses );
		$options       = [];

		foreach ( $post_statuses as $post_status => $details ) {
			if ( 'woocommerce' === $details->label_count['domain'] ) {
				$options[] = [
					'label' => 'WooCommerce - ' . $details->label,
					'value' => $post_status,
				];
			} else {
				$options[] = [
					'label' => $details->label,
					'value' => $post_status,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get Taxonomies.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_taxonomy_list( $data ) {
		$taxonomies = get_taxonomies( [ 'public' => true ], 'objects' );
		$options    = [];
		$options[0] = [
			'label' => 'Any Taxonomy',
			'value' => -1,
		];

		foreach ( $taxonomies as $taxonomy => $taxonomy_obj ) {
			$options[] = [
				'label' => $taxonomy_obj->label,
				'value' => $taxonomy_obj->name,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get WPForms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_wp_forms( $data ) {
		if ( ! class_exists( 'WPForms_Form_Handler' ) ) {
			return;
		}

		$wpforms = new WPForms_Form_Handler();
		$forms   = $wpforms->get( '', [ 'orderby' => 'title' ] );
		$options = [];

		if ( ! empty( $forms ) ) {
			foreach ( $forms as $form ) {
				$options[] = [
					'label' => $form->post_title,
					'value' => $form->ID,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get Gravity Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_gravity_forms( $data ) {
		if ( ! class_exists( 'GFFormsModel' ) ) {
			return;
		}

		$forms   = GFFormsModel::get_forms();
		$options = [];

		if ( ! empty( $forms ) ) {
			foreach ( $forms as $form ) {
				$options[] = [
					'label' => $form->title,
					'value' => $form->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get tag & contact details.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_pluggables_fluentcrm_contact_added_to_tags( $data ) {
		$context        = [];
		$pluggable_data = [];
		$tag_id         = $data['filter'];

		if ( $tag_id > 0 ) {
			$tags = Tag::where( 'id', $tag_id )->first();
		} else {
			$tags = Tag::orderBy( 'id', 'DESC' )->first();
		}
		$contact = Subscriber::orderBy( 'id', 'DESC' )->first();
		if ( $contact ) {
			$pluggable_data['contact'] = $contact;
			$context['tag_id']         = $tag_id;
			$pluggable_data['tag']     = $tags;
			$context['response_type']  = 'live';
		} else {
			$pluggable_data['conatct']['full_name']      = 'Test User';
			$pluggable_data['conatct']['first_name']     = 'Test';
			$pluggable_data['conatct']['last_name']      = 'User';
			$pluggable_data['conatct']['company_id']     = 112;
			$pluggable_data['conatct']['email']          = 'testuser@gmail.com';
			$pluggable_data['conatct']['address_line_1'] = '33, Vincent Road';
			$pluggable_data['conatct']['address_line_2'] = 'Chicago Street';
			$pluggable_data['conatct']['postal_code']    = '212342';
			$pluggable_data['conatct']['city']           = 'New York City';
			$pluggable_data['conatct']['state']          = 'New York';
			$pluggable_data['conatct']['country']        = 'USA';
			$pluggable_data['conatct']['phone']          = '9992191911';
			$pluggable_data['conatct']['status']         = 'subscribed';
			$pluggable_data['conatct']['contact_type']   = 'lead';
			$pluggable_data['conatct']['source']         = '';
			$pluggable_data['conatct']['date_of_birth']  = '2022-11-09';
			$context['tag_id']                           = 1;
			$pluggable_data['tag']                       =
				[
					'id'          => '1',
					'title'       => 'new',
					'slug'        => 'new',
					'description' => null,
					'created_at'  => '2023-01-19 10:23:23',
					'updated_at'  => '2023-01-19 10:23:23',
					'pivot'       => [
						'subscriber_id' => '1',
						'object_id'     => '1',
						'object_type'   => 'FluentCrm\\App\\Models\\Tag',
						'created_at'    => '2023-01-19 10:42:55',
						'updated_at'    => '2023-01-19 10:42:55',

					],
				];
			$context['response_type'] = 'sample';
		}

		$context['pluggable_data'] = $pluggable_data;
		return $context;
	}

	/**
	 * Get Divi Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_divi_forms( $data ) {
		$form_posts = Utilities::get_divi_forms();
		$options    = [];

		if ( empty( $form_posts ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}

		foreach ( $form_posts as $form_post ) {
			$pattern_regex = '/\[et_pb_contact_form(.*?)](.+?)\[\/et_pb_contact_form]/';
			preg_match_all( $pattern_regex, $form_post['post_content'], $forms, PREG_SET_ORDER );
			if ( empty( $forms ) ) {
				continue;
			}

			$count = 0;

			foreach ( $forms as $form ) {
				$pattern_form = get_shortcode_regex( [ 'et_pb_contact_form' ] );
				preg_match_all( "/$pattern_form/", $form[0], $forms_extracted, PREG_SET_ORDER );

				if ( empty( $forms_extracted ) ) {
					continue;
				}

				foreach ( $forms_extracted as $form_extracted ) {
					$form_attrs = shortcode_parse_atts( $form_extracted[3] );
					$form_id    = isset( $form_attrs['_unique_id'] ) ? $form_attrs['_unique_id'] : '';
					if ( empty( $form_id ) ) {
						continue;
					}
					$form_id    = sprintf( '%d-%s', $form_post['ID'], $form_id );
					$form_title = isset( $form_attrs['title'] ) ? $form_attrs['title'] : '';
					$form_title = sprintf( '%s %s', $form_post['post_title'], $form_title );
					$options[]  = [
						'label' => $form_title,
						'value' => $form_id,
					];
				}
				$count++;
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get Comment Pluggable data.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_pluggables_wp_insert_comment( $data ) {
		$context   = [];
		$post_data = [];
		$args      = [
			'number' => '1',
			'status' => 'approve',
		];

		if ( isset( $data['filter']['post']['value'] ) ) {
			$post_id = $data['filter']['post']['value'];
			if ( $post_id > 0 ) {
				$args['post_id'] = $post_id;
			}
		}

		$comments = get_comments( $args );
		if ( empty( $comments ) ) {
			unset( $args['post_id'] );
			$comments = get_comments( $args );
		}
		$context['context_data'] = $data;
		$context['context_args'] = $args;
		if ( ! empty( $comments ) ) {
			foreach ( $comments as $comment ) :
				if ( is_object( $comment ) ) {
					$comment = get_object_vars( $comment );
				}
				$post                      = get_post( absint( $comment['comment_post_ID'] ) );
				$user_email                = $comment['comment_author_email'];
				$user                      = get_user_by( 'email', $user_email );
				$context['pluggable_data'] = [
					'post'       => $post->ID,
					'post_title' => $post->post_title,
					'comment_id' => $comment['comment_ID'],
					'comment'    => $comment['comment_content'],
				];
				if ( $user ) {
					$context['pluggable_data']['wp_user_id']     = $user->ID;
					$context['pluggable_data']['user_login']     = $user->user_login;
					$context['pluggable_data']['display_name']   = $user->display_name;
					$context['pluggable_data']['user_firstname'] = $user->user_firstname;
					$context['pluggable_data']['user_lastname']  = $user->user_lastname;
					$context['pluggable_data']['user_email']     = $user->user_email;
					$context['pluggable_data']['user_role']      = $user->roles;
				}

				$context['response_type'] = 'live';
			endforeach;
		} else {
			$sample_comment                   = [
				'post'       => 100,
				'post_title' => 'Sample Post',
				'comment_id' => 101,
				'comment'    => 'Sample Comment',
			];
			$sample_comment['wp_user_id']     = 7;
			$sample_comment['user_login']     = 'testuser@gmail.com';
			$sample_comment['display_name']   = 'Test User';
			$sample_comment['user_firstname'] = 'Test';
			$sample_comment['user_lastname']  = 'User';
			$sample_comment['user_email']     = 'testuser@gmail.com';
			$sample_comment['user_role']      = [ 'Subscriber' ];

			$context['pluggable_data'] = $sample_comment;
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * User reset password.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_user_reset_password( $data ) {
		$user_context                                   = $this->search_pluggables_add_user_role( $data );
		$user_context['pluggable_data']['new_password'] = '***password***';
		return $user_context;
	}

	/**
	 * User pluggable data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_add_user_role( $data ) {
		$context = [];
		$args    = [
			'meta_key' => 'last_update',
			'order'    => 'DESC',
			'number'   => 1,
		];

		if ( isset( $data['filter']['role']['value'] ) ) {
			$role         = $data['filter']['role']['value'];
			$args['role'] = $role;
		}
		if ( isset( $data['filter']['new_role']['value'] ) ) {
			$role         = $data['filter']['new_role']['value'];
			$args['role'] = $role;
		}

		$users = get_users( $args );

		if ( isset( $data['filter']['meta_key']['value'] ) ) {
			$meta_key            = $data['filter']['meta_key']['value'];
			$args['st_meta_key'] = $meta_key;
		}

		if ( isset( $data['filter']['profile_field']['value'] ) ) {
			$meta_key              = $data['filter']['profile_field']['value'];
			$args['profile_field'] = $meta_key;
		}

		if ( ! empty( $users ) ) {
			$user                             = $users[0];
			$pluggable_data                   = [];
			$pluggable_data['wp_user_id']     = $user->ID;
			$pluggable_data['user_login']     = $user->user_login;
			$pluggable_data['display_name']   = $user->display_name;
			$pluggable_data['user_firstname'] = $user->user_firstname;
			$pluggable_data['user_lastname']  = $user->user_lastname;
			$pluggable_data['user_email']     = $user->user_email;
			$pluggable_data['user_role']      = $user->roles;

			if ( isset( $args['st_meta_key'] ) ) {
				$pluggable_data['meta_key']   = $args['st_meta_key'];
				$pluggable_data['meta_value'] = get_user_meta( $user->ID, $args['st_meta_key'], true );
			}
			if ( isset( $args['profile_field'] ) ) {
				$userdata = get_userdata( $user->ID );
				$userdata = json_decode( wp_json_encode( $userdata->data ), true );

				$pluggable_data['profile_field']       = $args['profile_field'];
				$pluggable_data['profile_field_value'] = $userdata[ $args['profile_field'] ];
			}
			$context['pluggable_data'] = $pluggable_data;
			$context['response_type']  = 'live';
		} else {
			$role                      = isset( $args['role'] ) ? $args['role'] : 'subscriber';
			$context['pluggable_data'] = [
				'wp_user_id'     => 1,
				'user_login'     => 'admin',
				'display_name'   => 'Test User',
				'user_firstname' => 'Test',
				'user_lastname'  => 'User',
				'user_email'     => 'testuser@gmail.com',
				'user_role'      => [ $role ],
			];
			if ( isset( $args['st_meta_key'] ) ) {
				$context['pluggable_data']['meta_key']   = $args['st_meta_key'];
				$context['pluggable_data']['meta_value'] = 'test meta value';
			}
			if ( isset( $args['profile_field'] ) ) {
				$context['pluggable_data']['profile_field']       = $args['profile_field'];
				$context['pluggable_data']['profile_field_value'] = 'Profile Field Value';
			}
			$context['response_type'] = 'sample';
		}
		return $context;
	}

	/**
	 * User pluggable data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_last_user_login( $data ) {
		$context = [];
		$args    = [
			'orderby'  => 'meta_value',
			'meta_key' => 'st_last_login',
			'order'    => 'DESC',
			'number'   => 1,
		];
		$users   = get_users( $args );

		if ( ! empty( $users ) ) {
			$user                             = $users[0];
			$pluggable_data                   = [];
			$pluggable_data['wp_user_id']     = $user->ID;
			$pluggable_data['user_login']     = $user->user_login;
			$pluggable_data['display_name']   = $user->display_name;
			$pluggable_data['user_firstname'] = $user->user_firstname;
			$pluggable_data['user_lastname']  = $user->user_lastname;
			$pluggable_data['user_email']     = $user->user_email;
			$pluggable_data['user_role']      = $user->roles;

			$context['pluggable_data'] = $pluggable_data;
			$context['response_type']  = 'live';
		} else {
			$role                      = isset( $args['role'] ) ? $args['role'] : 'subscriber';
			$context['pluggable_data'] = [
				'wp_user_id'     => 1,
				'user_login'     => 'admin',
				'display_name'   => 'Test User',
				'user_firstname' => 'Test',
				'user_lastname'  => 'User',
				'user_email'     => 'testuser@gmail.com',
				'user_role'      => [ $role ],
			];
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * Donation pluggable data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_wordpress_post( $data ) {
		$context = [];
		$args    = [
			'post_type'      => 'any',
			'posts_per_page' => 1,
			'orderby'        => 'modified',
			'order'          => 'DESC',
		];

		if ( isset( $data['filter']['post_type']['value'] ) ) {
			$post_type         = $data['filter']['post_type']['value'];
			$args['post_type'] = $post_type;
		}

		if ( isset( $data['filter']['status']['value'] ) ) {
			$post_status         = $data['filter']['status']['value'];
			$args['post_status'] = $post_status;
		}

		if ( isset( $data['filter']['post_status']['value'] ) ) {
			$post_status         = $data['filter']['post_status']['value'];
			$args['post_status'] = $post_status;
		}

		if ( isset( $data['filter']['post']['value'] ) ) {
			$post_id = $data['filter']['post']['value'];
			if ( $post_id > 0 ) {
				$args['p'] = $post_id;
				unset( $args['post_status'] );
			}
		}

		$posts = get_posts( $args );
		if ( ! empty( $posts ) ) {
			$context['pluggable_data']       = $posts[0];
			$context['pluggable_data']->post = $posts[0]->ID;
			$context['response_type']        = 'live';
		} else {
			$context['pluggable_data'] = [
				'ID'                    => 557,
				'post'                  => 557,
				'post_author'           => 1,
				'post_date'             => '2022-11-18 12:18:14',
				'post_date_gmt'         => '2022-11-18 12:18:14',
				'post_content'          => 'Test Post Content',
				'post_title'            => 'Test Post',
				'post_excerpt'          => '',
				'post_status'           => $args['post_status'],
				'comment_status'        => 'open',
				'ping_status'           => 'open',
				'post_password'         => '',
				'post_name'             => 'test-post',
				'to_ping'               => '',
				'pinged'                => '',
				'post_modified'         => '2022-11-18 12:18:14',
				'post_modified_gmt'     => '2022-11-18 12:18:14',
				'post_content_filtered' => '',
				'post_parent'           => 0,
				'guid'                  => 'https://abc.com/test-post/',
				'menu_order'            => 0,
				'post_type'             => 'post',
				'post_mime_type'        => '',
				'comment_count'         => 0,
				'filter'                => 'raw',
			];
			$context['response_type']  = 'sample';
		}

		return $context;
	}

	/**
	 * Donation pluggable data
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_givewp_donation_via_form( $data ) {
		global $wpdb;
		$context        = [];
		$pluggable_data = [];

		$payment = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}posts WHERE post_type=%s ORDER BY id DESC LIMIT 1", 'give_payment' ) );

		if ( ! empty( $payment ) ) {
			$payment      = new Give_Payment( $payment->ID );
			$address_data = $payment->address;

			$pluggable_data['first_name']        = $payment->first_name;
			$pluggable_data['last_name']         = $payment->last_name;
			$pluggable_data['email']             = $payment->email;
			$pluggable_data['currency']          = $payment->currency;
			$pluggable_data['donated_amount']    = $payment->subtotal;
			$pluggable_data['donation_amount']   = $payment->subtotal;
			$pluggable_data['form_id']           = (int) $payment->form_id;
			$pluggable_data['form_title']        = $payment->form_title;
			$pluggable_data['name_title_prefix'] = $payment->title_prefix;
			$pluggable_data['date']              = $payment->date;

			if ( is_array( $address_data ) ) {
				$pluggable_data['address_line_1'] = $address_data['line1'];
				$pluggable_data['address_line_2'] = $address_data['line2'];
				$pluggable_data['city']           = $address_data['city'];
				$pluggable_data['state']          = $address_data['state'];
				$pluggable_data['zip']            = $address_data['zip'];
				$pluggable_data['country']        = $address_data['country'];
			}
			$donor_comment             = give_get_donor_donation_comment( $payment->ID, $payment->donor_id );
			$pluggable_data['comment'] = isset( $doner['comment_content'] ) ? $donor_comment : '';
			$context['response_type']  = 'live';
		} else {
			$pluggable_data['first_name']        = 'Test';
			$pluggable_data['last_name']         = 'User';
			$pluggable_data['email']             = 'testuser@gmail.com';
			$pluggable_data['currency']          = 'USD';
			$pluggable_data['donated_amount']    = 100;
			$pluggable_data['donation_amount']   = 100;
			$pluggable_data['form_id']           = 23;
			$pluggable_data['form_title']        = 'Test Donation';
			$pluggable_data['name_title_prefix'] = 'Mr';
			$pluggable_data['date']              = '2022-11-07 16:06:05';
			$pluggable_data['address_line_1']    = '33, Vincent Road';
			$pluggable_data['address_line_2']    = 'Chicago Street';
			$pluggable_data['city']              = 'New York City';
			$pluggable_data['state']             = 'New York';
			$pluggable_data['zip']               = '223131';
			$pluggable_data['country']           = 'USA';
			$pluggable_data['comment']           = 'Test Comment';
			$context['response_type']            = 'sample';
		}

		$context['pluggable_data'] = $pluggable_data;
		return $context;
	}

	/**
	 * Search Divi Form fields.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_pluggable_divi_form_fields( $data ) {
		$result     = [];
		$form_id    = absint( $data['dynamic'] );
		$form_posts = Utilities::get_divi_forms();

		if ( empty( $form_posts ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}
		$fields = [];
		foreach ( $form_posts as $form_post ) {
			$pattern_regex = '/\[et_pb_contact_form(.*?)](.+?)\[\/et_pb_contact_form]/';
			preg_match_all( $pattern_regex, $form_post['post_content'], $forms, PREG_SET_ORDER );
			if ( empty( $forms ) ) {
				continue;
			}

			$count = 0;

			foreach ( $forms as $form ) {
				$pattern = get_shortcode_regex( [ 'et_pb_contact_field' ] );

				preg_match_all( "/$pattern/", $form[0], $contact_fields, PREG_SET_ORDER );

				if ( empty( $contact_fields ) ) {
					return $fields;
				}

				foreach ( $contact_fields as $contact_field ) {
					$contact_field_attrs = shortcode_parse_atts( $contact_field[3] );
					$field_id            = strtolower( self::array_get( $contact_field_attrs, 'field_id' ) );
					$fields[]            = [
						'field_title' => self::array_get( $contact_field_attrs, 'field_title', __( 'No title', 'suretriggers' ) ),
						'field_id'    => $field_id,
					];
				}
			}
		}

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				$result[] = [
					'label' => $field['field_title'],
					'value' => '{' . $field['field_id'] . '}',
				];
			}
		}

		return [
			'options' => $result,
			'hasMore' => false,
		];
	}

	/**
	 * Pseudo function copied from Divi
	 *
	 * @param array        $array An array which contains value located at `$address`.
	 * @param string|array $address The location of the value within `$array` (dot notation).
	 * @param mixed        $default Value to return if not found. Default is an empty string.
	 *
	 * @return mixed The value, if found, otherwise $default.
	 */
	public static function array_get( $array, $address, $default = '' ) {
		$keys  = is_array( $address ) ? $address : explode( '.', $address );
		$value = $array;

		foreach ( $keys as $key ) {
			if ( ! empty( $key ) && isset( $key[0] ) && '[' === $key[0] ) {
				$index = substr( $key, 1, -1 );

				if ( is_numeric( $index ) ) {
					$key = (int) $index;
				}
			}

			if ( ! isset( $value[ $key ] ) ) {
				return $default;
			}

			$value = $value[ $key ];
		}

		return $value;
	}

	/**
	 * Get UAG Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_spectra_forms( $data ) {
		$form_posts = Utilities::get_uag_forms();

		$options = [];
		if ( empty( $form_posts ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}

		foreach ( $form_posts as $form_post ) {
			$blocks = parse_blocks( $form_post['post_content'] );

			foreach ( $blocks as $block ) {
				if ( 'uagb/forms' === $block['blockName'] ) {
					$options[] = [
						'label' => $form_post['post_title'],
						'value' => $block['attrs']['block_id'],
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Search UAG Form fields.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public function search_spectraform_fields( $data ) {
		$result     = [];
		$form_id    = absint( $data['dynamic'] );
		$form_posts = Utilities::get_uag_forms();

		if ( empty( $form_posts ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}

		foreach ( $form_posts as $form_post ) {
			$blocks = parse_blocks( $form_post['post_content'] );

			foreach ( $blocks as $block ) {
				if ( (int) $block['attrs']['block_id'] === $form_id ) {
					$doc            = new DOMDocument();
					$rendered_block = render_block( $block );
					$doc->loadHTML( $rendered_block );
					$child_node_list = $doc->getElementsByTagName( 'div' );
					for ( $i = 0; $i < $child_node_list->length; $i++ ) {
						$temp = $child_node_list->item( $i );
						if ( $temp && stripos( $temp->getAttribute( 'class' ), 'uagb-forms-input-label' ) !== false ) {
							$nodes[] = $temp;
						}
					}

					foreach ( $nodes as $node ) {
						$result[] = [
                            'label' => $node->textContent, //phpcs:ignore
                            'value' => $node->textContent, //phpcs:ignore
						];
					}
				}
			}
		}

		return [
			'options' => $result,
			'hasMore' => false,
		];
	}

	/**
	 * Get Fluent Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_fluent_forms( $data ) {

		if ( ! function_exists( 'wpFluent' ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}

		$forms = wpFluent()->table( 'fluentform_forms' )
			->select( [ 'id', 'title' ] )
			->orderBy( 'id', 'DESC' )
			->get();

		$options = [];
		if ( ! empty( $forms ) ) {
			foreach ( $forms as $form ) {
				$options[] = [
					'label' => $form->title,
					'value' => $form->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];

	}

	/**
	 * Get Fluent Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_bricks_builder_forms( $data ) {
		$bricks_theme = wp_get_theme( 'bricks' );
		if ( ! $bricks_theme->exists() ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}

		$args = [
			'post_type'      => 'bricks_template',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
		];

		$templates = get_posts( $args );

		$options = [];
		if ( ! empty( $templates ) ) {
			foreach ( $templates as $template ) {
				$fetch_content = get_post_meta( $template->ID, BRICKS_DB_PAGE_CONTENT, true );
				if ( is_array( $fetch_content ) ) {
					foreach ( $fetch_content as $content ) {
						if ( 'form' === $content['name'] ) {
							$options[] = [
								'label' => $template->post_title . ' - ' . ( isset( $content['label'] ) ? $content['label'] : 'Form' ),
								'value' => $content['id'],
							];
						}
					}
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];

	}

	/**
	 * Bricks builder form fields.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggable_bricks_builder_form_fields( $data ) {
		$result        = [];
		$fields        = [];
		$form_id_str   = $data['dynamic'];
		$ids           = explode( '_', $form_id_str );
		$post_id       = $ids[0];
		$form_id       = $ids[1];
		$fetch_content = get_post_meta( $post_id, BRICKS_DB_PAGE_CONTENT, true );
		if ( is_array( $fetch_content ) ) {
			foreach ( $fetch_content as $content ) {
				if ( 'form' === $content['name'] && $form_id === $content['id'] ) {
					$fields = $content['settings']['fields'];
					break;
				}
			}
		}

		if ( ! empty( $fields ) ) {
			foreach ( $fields as $field ) {
				$result[] = [
					'label' => $field['label'],
					'value' => '{' . strtolower( $field['label'] ) . '}',
				];
			}
		}

		return [
			'options' => $result,
			'hasMore' => false,
		];
	}

	/**
	 * Get fluent form fields
	 *
	 * @param array $data Data array.
	 *
	 * @return array
	 */
	public function search_pluggable_fluent_form_fields( $data ) {
		$result  = [];
		$form_id = absint( $data['dynamic'] );

		$fluentform_fields = Utilities::get_fluentform_fields( $data['search_term'], -1, $form_id );

		if ( is_array( $fluentform_fields['results'] ) ) {
			foreach ( $fluentform_fields['results'] as $field ) {
				$result[] = [
					'label' => $field['text'],
					'value' => "{{$field['value']}}",
				];
			}
		}

		$result[] = [
			'value' => '{form_id}',
			'label' => 'Form ID',
		];

		$result[] = [
			'value' => '{form_title}',
			'label' => 'Form Title',
		];
		$result[] = [
			'value' => '{entry_id}',
			'label' => 'Entry ID',
		];

		$result[] = [
			'value' => '{entry_source_url}',
			'label' => 'Entry Source URL',
		];

		$result[] = [
			'value' => '{submission_date}',
			'label' => 'Submission Date',
		];

		$result[] = [
			'value' => '{user_ip}',
			'label' => 'User IP',
		];

		return [
			'options' => $result,
			'hasMore' => false,
		];
	}

	/**
	 * Search Gravity Form fields.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 */
	public function search_gform_fields( $data ) {
		if ( ! class_exists( 'RGFormsModel' ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}
		$result  = [];
		$page    = $data['page'];
		$form_id = absint( $data['dynamic'] );

		$form = RGFormsModel::get_form_meta( $form_id );

		if ( is_array( $form['fields'] ) ) {
			foreach ( $form['fields'] as $field ) {
				if ( isset( $field['inputs'] ) && is_array( $field['inputs'] ) ) {
					foreach ( $field['inputs'] as $input ) {
						if ( ! isset( $input['isHidden'] ) || ( isset( $input['isHidden'] ) && ! $input['isHidden'] ) ) {
							$result[] = [
								'value' => $input['id'],
								'label' => GFCommon::get_label( $field, $input['id'] ),
							];
						}
					}
				} elseif ( ! rgar( $field, 'displayOnly' ) ) {
					$result[] = [
						'value' => $field['id'],
						'label' => GFCommon::get_label( $field ),
					];
				}
			}
		}

		return [
			'options' => $result,
			'hasMore' => false,
		];

	}

	/**
	 * Search Gravity Form fields.
	 *
	 * @param array $data Search Params.
	 *
	 * @since 1.0.0
	 */
	public function search_pluggable_gravity_form_fields( $data ) {
		if ( ! class_exists( 'RGFormsModel' ) ) {
			return [
				'options' => [],
				'hasMore' => false,
			];
		}
		$result  = [];
		$form_id = absint( $data['dynamic'] );

		$form = RGFormsModel::get_form_meta( $form_id );

		if ( is_array( $form['fields'] ) ) {
			foreach ( $form['fields'] as $field ) {
				if ( isset( $field['inputs'] ) && is_array( $field['inputs'] ) ) {
					foreach ( $field['inputs'] as $input ) {
						if ( ! isset( $input['isHidden'] ) || ( isset( $input['isHidden'] ) && ! $input['isHidden'] ) ) {
							$result[] = [
								'value' => '{' . $input['id'] . '}',
								'label' => GFCommon::get_label( $field, $input['id'] ),
							];
						}
					}
				} elseif ( ! rgar( $field, 'displayOnly' ) ) {
					$result[] = [
						'value' => '{' . $field['id'] . '}',
						'label' => GFCommon::get_label( $field ),
					];
				}
			}
		}

		$result[] = [
			'value' => '{gravity_form}',
			'label' => 'Form ID',
		];
		$result[] = [
			'value' => '{form_title}',
			'label' => 'Form Title',
		];
		$result[] = [
			'value' => '{entry_id}',
			'label' => 'Entry ID',
		];
		$result[] = [
			'value' => '{user_ip}',
			'label' => 'User IP',
		];
		$result[] = [
			'value' => '{entry_source_url}',
			'label' => 'Entry Source URL',
		];
		$result[] = [
			'value' => '{entry_submission_date}',
			'label' => 'Entry Submission Date',
		];

		return [
			'options' => $result,
			'hasMore' => false,
		];

	}

	/**
	 * Prepare fluentcrm lists.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_fluentcrm_lists( $data ) {

		$list_api  = FluentCrmApi( 'lists' );
		$all_lists = $list_api->all();
		$options   = [];

		if ( ! empty( $all_lists ) ) {
			foreach ( $all_lists as $list ) {
				$options[] = [
					'label' => $list->title,
					'value' => $list->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare fluentcrm contact status.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_fluentcrm_contact_status( $data ) {

		$options = [
			[
				'label' => __( 'Subscribed', 'suretriggers' ),
				'value' => 'subscribed',
			],
			[
				'label' => __( 'Pending', 'suretriggers' ),
				'value' => 'pending',
			],
			[
				'label' => __( 'Unsubscribed', 'suretriggers' ),
				'value' => 'unsubscribed',
			],
			[
				'label' => __( 'Bounced', 'suretriggers' ),
				'value' => 'bounced',
			],
			[
				'label' => __( 'Complained', 'suretriggers' ),
				'value' => 'complained',
			],
		];

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare fluentcrm contact status.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_fluentcrm_fetch_custom_fields( $data ) {

		$options = [
			[
				'label' => __( 'Yes', 'suretriggers' ),
				'value' => 'true',
			],
			[
				'label' => __( 'No', 'suretriggers' ),
				'value' => 'false',
			],
		];

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare fluentcrm tags.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_fluentcrm_tags( $data ) {

		$tag_api  = FluentCrmApi( 'tags' );
		$all_tags = $tag_api->all();
		$options  = [];

		if ( ! empty( $all_tags ) ) {
			foreach ( $all_tags as $tag ) {
				$options[] = [
					'label' => $tag->title,
					'value' => $tag->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare Wishlist Memberlists level.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_wishlistmember_lists( $data ) {

		$wlm_levels = wlmapi_get_levels();
		$options    = [];

		if ( ! empty( $wlm_levels ) ) {
			foreach ( $wlm_levels['levels']['level'] as $list ) {
				$options[] = [
					'label' => $list['name'],
					'value' => (string) $list['id'],
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare elementor popups.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_elementor_popups( $data ) {

		$posts = get_posts(
			[
				'post_type'   => 'elementor_library',
				'orderby'     => 'title',
				'order'       => 'ASC',
				'post_status' => 'publish',
				'meta_query'  => [
					[
						'key'     => '_elementor_template_type',
						'value'   => 'popup',
						'compare' => '=',
					],
				],
			]
		);

		$options = [];
		if ( ! empty( $posts ) ) {
			foreach ( $posts as $post ) {
				$options[] = [
					'label' => $post->post_title,
					'value' => $post->ID,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare givewp forms.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_givewp_forms( $data ) {

		$posts = get_posts(
			[
				'post_type'   => 'give_forms',
				'orderby'     => 'title',
				'order'       => 'ASC',
				'post_status' => 'publish',
			]
		);

		$options = [];
		if ( ! empty( $posts ) ) {
			foreach ( $posts as $post ) {
				$options[] = [
					'label' => $post->post_title,
					'value' => $post->ID,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare buddyboss group users.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_bb_group_users( $data ) {
		$options = [];

		$group_id = $data['dynamic'];
		$admins   = groups_get_group_admins( $group_id );

		if ( ! empty( $admins ) ) {
			foreach ( $admins as $admin ) {
				$admin_user = get_user_by( 'id', $admin->user_id );
				$options[]  = [
					'label' => $admin_user->display_name,
					'value' => $admin_user->ID,
				];
			}
		}

		$members = groups_get_group_members( [ 'group_id' => $group_id ] );

		if ( isset( $members['members'] ) && ! empty( $members['members'] ) ) {
			foreach ( $members['members'] as $member ) {
				$options[] = [
					'label' => $member->display_name,
					'value' => $member->ID,
				];
			}
		}
		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare buddyboss groups.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_buddyboss_groups( $data ) {
		$args   = [
			'status'   => [ 'public' ],
			'per_page' => -1,
		];
		$groups = groups_get_groups( $args );

		if ( isset( $groups['groups'] ) ) {
			$groups = $groups['groups'];
		}

		$options = [];
		if ( ! empty( $groups ) ) {
			foreach ( $groups as $group ) {
				$options[] = [
					'label' => $group->name,
					'value' => $group->id,
				];
			}
		}
		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare buddyboss public groups.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_buddyboss_public_groups( $data ) {
		$options = [];
		$groups  = groups_get_groups();
		if ( isset( $groups['groups'] ) && ! empty( $groups['groups'] ) ) {
			foreach ( $groups['groups'] as $group ) {
				if ( 'public' === $group->status ) {
					$options[] = [
						'label' => $group->name,
						'value' => $group->id,
					];
				}
			}
		}
		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare elementor forms.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_elementor_forms( $data ) {

		$elementor_forms = Utilities::get_elementor_forms();

		$options = [];
		if ( ! empty( $elementor_forms ) ) {
			foreach ( $elementor_forms as $key => $value ) {
				$options[] = [
					'label' => $value,
					'value' => $key,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare elementor form fields.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_pluggable_elementor_form_fields( $data ) {
		$result                = [];
		$form_id               = absint( $data['dynamic'] );
		$elementor_form_fields = ( new Utilities() )->get_elementor_form_fields( $data );
		$options               = [];
		if ( ! empty( $elementor_form_fields ) ) {
			foreach ( $elementor_form_fields as $key => $value ) {
				$options[] = [
					'label' => $value,
					'value' => '{' . $key . '}',
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get all events
	 *
	 * @param array $data Data array.
	 *
	 * @return array
	 */
	public function search_event_calendar_event( $data ) {
		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$posts = get_posts(
			[
				'post_type'      => 'tribe_events',
				'orderby'        => 'title',
				'order'          => 'ASC',
				'post_status'    => 'publish',
				'posts_per_page' => $limit,
				'offset'         => $offset,
			]
		);

		$options = [];
		if ( ! empty( $posts ) ) {
			foreach ( $posts as $post ) {
				$options[] = [
					'label' => $post->post_title,
					'value' => $post->ID,
				];
			}
		}

		$count = count( $options );

		return [
			'options' => $options,
			'hasMore' => $count > $limit && $count > $offset,
		];
	}

	/**
	 * Prepare rsvp event calendar events.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_event_calendar_rsvp_event( $data ) {

		$posts = get_posts(
			[
				'post_type'   => 'tribe_events',
				'orderby'     => 'title',
				'order'       => 'ASC',
				'post_status' => 'publish',
			]
		);

		$options = [];
		if ( ! empty( $posts ) ) {
			$ticket_handler = new Tribe__Tickets__Tickets_Handler();
			foreach ( $posts as $post ) {

				$get_rsvp_ticket = $ticket_handler->get_event_rsvp_tickets( $post->ID );

				if ( ! empty( $get_rsvp_ticket ) ) {
					$options[] = [
						'label' => $post->post_title,
						'value' => $post->ID,
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare Restrict Content Membership Level.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_restrictcontent_membership_level( $data ) {

		$rcp_memberships = rcp_get_membership_levels();
		$options         = [];

		if ( ! empty( $rcp_memberships ) ) {
			foreach ( $rcp_memberships as $list ) {
				$options[] = [
					'label' => ucfirst( $list->name ),
					'value' => $list->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare Restrict Content Customer.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_restrictcontent_customer( $data ) {

		$rcp_users = rcp_get_memberships();
		$options   = [];

		if ( ! empty( $rcp_users ) ) {
			foreach ( $rcp_users as $list ) {
				$user       = get_user_by( 'ID', $list->get_user_id() );
				$user_label = $user->user_email;

				if ( $user->display_name !== $user->user_email ) {
					$user_label .= ' (' . $user->display_name . ')';
				}

				$options[] = [
					'label' => $user_label,
					'value' => $list->get_customer_id(),
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}


	/**
	 * Fetch the Presto Player video List.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_ap_presto_player_video_list( $data ) {

		$videos  = ( new Video() )->all();
		$options = [];
		if ( ! empty( $videos ) ) {
			foreach ( $videos as $video ) {
				$options[] = [
					'label' => $video->__get( 'title' ),
					'value' => (string) $video->__get( 'id' ),
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Presto Player Video percentage.
	 *
	 * @param array $data Search Params.
	 *
	 * @return array[]
	 */
	public function search_prestoplayer_video_percent( $data ) {

		$percents = [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 ];
		$options  = [];

		foreach ( $percents as $percent ) {
			$options[] = [
				'label' => $percent . '%',
				'value' => (string) $percent,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get user profile field options.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function search_user_field_options() {

		$options = apply_filters(
			'sure_trigger_get_user_field_options',
			[
				[
					'label' => __( 'User Name', 'suretriggers' ),
					'value' => 'user_login',
				],
				[
					'label' => __( 'User Email', 'suretriggers' ),
					'value' => 'user_email',
				],
				[
					'label' => __( 'Display Name', 'suretriggers' ),
					'value' => 'display_name',
				],
				[
					'label' => __( 'User Password', 'suretriggers' ),
					'value' => 'user_pass',
				],
				[
					'label' => __( 'Website', 'suretriggers' ),
					'value' => 'user_url',
				],
			]
		);

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get user post field options.
	 *
	 * @return array
	 * @since 1.0.0
	 */
	public function search_post_field_options() {

		return [
			'options' => [
				[
					'label'         => __( 'Type', 'suretriggers' ),
					'value'         => 'post_type',
					'dynamic_field' => [
						'type'           => 'select-creatable',
						'ajaxIdentifier' => 'post_types',
					],
				],
				[
					'label'         => __( 'Status', 'suretriggers' ),
					'value'         => 'post_status',
					'dynamic_field' => [
						'type'           => 'select-async',
						'ajaxIdentifier' => 'post_statuses',
					],
				],
				[
					'label'         => __( 'Author', 'suretriggers' ),
					'value'         => 'post_author',
					'dynamic_field' => [
						'type'           => 'select-async',
						'ajaxIdentifier' => 'user',
					],
				],
				[
					'label'         => __( 'Title', 'suretriggers' ),
					'value'         => 'post_title',
					'dynamic_field' => [
						'type' => 'select-creatable',
					],
				],
				[
					'label'         => __( 'Slug', 'suretriggers' ),
					'value'         => 'post_slug',
					'dynamic_field' => [
						'type' => 'select-creatable',
					],
				],
				[
					'label'         => __( 'Content', 'suretriggers' ),
					'value'         => 'post_content',
					'dynamic_field' => [
						'type' => 'html-editor',
					],
				],
			],
			'hasMore' => false,
		];
	}

	/**
	 * Bricksbuilder grouped data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_bb_groups( $data ) {

		global $wpdb;
		$options = [];

		if ( $wpdb->query( $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->prefix . 'bp_groups' ) ) ) {

			$results = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM %s', $wpdb->prefix . 'bp_groups' ) );

			if ( $results ) {
				foreach ( $results as $result ) {
					$options[] = [
						'label' => $result->name,
						'value' => $result->id,
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Search forms.
	 *
	 * @return array
	 */
	public function search_bb_forums() {
		$options        = [];
		$allowed_atatus = [ 'publish', 'private' ];
		$forum_args     = [
			'post_type'      => bbp_get_forum_post_type(),
			'posts_per_page' => -1,
			'orderby'        => 'title',
			'order'          => 'ASC',
			'post_status'    => 'any',
		];
		$forums         = get_posts( $forum_args );

		if ( ! empty( $forums ) ) {
			foreach ( $forums as $forum ) {
				if ( in_array( $forum->post_status, $allowed_atatus, true ) ) {
					$options[] = [
						'label' => $forum->post_title,
						'value' => $forum->ID,
					];
				}
			}
		}
		return [
			'options' => $options,
			'hasMore' => false,
		];
	}


	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_affiliate_wp_triggers_last_data( $data ) {
		global $wpdb;

		$context                  = [];
		$context['response_type'] = 'sample';

		$user_data = WordPress::get_sample_user_context();

		$affiliate_data = [
			'affiliate_id'    => 1,
			'rest_id'         => '',
			'user_id'         => 1,
			'rate'            => '',
			'rate_type'       => '',
			'flat_rate_basis' => '',
			'payment_email'   => 'admin@bsf.io',
			'status'          => 'active',
			'earnings'        => 0,
			'unpaid_earnings' => 0,
			'referrals'       => 0,
			'visits'          => 0,
			'date_registered' => '2023-01-18 13:35:22',
			'dynamic_coupon'  => 'KDJSKS',
		];

		$referral_data = [
			'referral_id'  => 1,
			'affiliate_id' => 1,
			'visit_id'     => 0,
			'rest_id'      => '',
			'customer_id'  => 0,
			'parent_id'    => 0,
			'description'  => 'Testing',
			'status'       => 'unpaid',
			'amount'       => '12.00',
			'currency'     => '',
			'custom'       => 'custom',
			'context'      => '',
			'campaign'     => '',
			'reference'    => 'Reference',
			'products'     => '',
			'date'         => '2023-01-18 16:36:59',
			'type'         => 'opt-in',
			'payout_id'    => 0,
		];

		$term = isset( $data['search_term'] ) ? $data['search_term'] : '';

		if ( in_array( $term, [ 'affiliate_approved', 'affiliate_awaiting_approval' ], true ) ) {
			$affiliate = $wpdb->get_row( "SELECT * FROM {$wpdb->prefix}affiliate_wp_affiliates WHERE affiliate_id = ( SELECT max(affiliate_id) FROM {$wpdb->prefix}affiliate_wp_affiliates )" );

			if ( ! empty( $affiliate ) ) {
				$affiliate                = affwp_get_affiliate( $affiliate->affiliate_id );
				$affiliate_data           = get_object_vars( $affiliate );
				$user_data                = WordPress::get_user_context( $affiliate->user_id );
				$context['response_type'] = 'live';
			}
			$context['pluggable_data'] = array_merge( $user_data, $affiliate_data );

		} else {
			$referral = $wpdb->get_row( "SELECT * FROM {$wpdb->prefix}affiliate_wp_referrals WHERE referral_id = ( SELECT max(referral_id) FROM {$wpdb->prefix}affiliate_wp_referrals )" );

			if ( ! empty( $referral ) ) {
				$referral                 = affwp_get_referral( $referral->referral_id );
				$affiliate                = affwp_get_affiliate( $referral->affiliate_id );
				$affiliate_data           = get_object_vars( $affiliate );
				$user_data                = WordPress::get_user_context( $affiliate->user_id );
				$referral_data            = get_object_vars( $referral );
				$context['response_type'] = 'live';
			}
			$context['pluggable_data'] = array_merge( $user_data, $affiliate_data, $referral_data );
		}

		return $context;
	}


	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_edd_triggers_last_data( $data ) {
		$context                  = [];
		$context['response_type'] = 'sample';

		$order_data = [
			'order_id'            => '1',
			'customer_email'      => 'john_doe@bsf.io',
			'customer_first_name' => 'John',
			'customer_last_name'  => 'Doe',
			'ordered_items'       => 'Any Sample Book',
			'currency'            => 'USD',
			'status'              => 'complete',
			'discount_codes'      => 'KDJSKS',
			'order_discounts'     => '2.00',
			'order_subtotal'      => '48.00',
			'order_tax'           => '0.00',
			'order_total'         => '48.00',
			'payment_method'      => 'stripe',
		];

		$term = isset( $data['search_term'] ) ? $data['search_term'] : '';

		if ( 'order_created' === $term ) {
			$order_data['purchase_key'] = '06d3b7d923ca922dc889354f9bc33fbb';

			$args     = [
				'number' => 1,
				'status' => [ 'complete', 'refunded', 'partially_refunded' ],
			];
			$payments = edd_get_payments( $args );

			if ( count( $payments ) > 0 ) {
				$order_data               = EDD::get_product_purchase_context( $payments[0] );
				$context['response_type'] = 'live';
			}
		} else {
			$args     = [
				'number' => 1,
				'status' => 'complete',
				'type'   => 'refund',
			];
			$payments = edd_get_payments( $args );

			if ( count( $payments ) > 0 ) {
				$order_data               = EDD::get_purchase_refund_context( $payments[0] );
				$context['response_type'] = 'live';
			}
		}

		$context['pluggable_data'] = $order_data;
		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_presto_player_triggers_last_data( $data ) {
		$context                  = [];
		$context['response_type'] = 'sample';

		$user_data = WordPress::get_sample_user_context();

		$video_data = [
			'pp_video'            => '1',
			'pp_video_percentage' => '100',
			'video_id'            => '1',
			'video_title'         => 'SureTriggers Is Here 🎉 The Easiest Automation Builder WordPress Websites & Apps',
			'video_type'          => 'youtube',
			'video_external_id'   => '-cYbNYgylLs',
			'video_attachment_id' => '0',
			'video_post_id'       => '127',
			'video_src'           => 'https://www.youtube.com/watch?v=-cYbNYgylLs',
			'video_created_by'    => '1',
			'video_created_at'    => '2022-11-10 00:28:25',
			'video_updated_at'    => '2022-11-10 00:34:40',
			'video_deleted_at'    => '',
		];

		$videos = ( new Video() )->all();

		if ( count( $videos ) > 0 ) {
			$video_id                          = '-1' === $data['filter']['pp_video']['value'] ? $videos[0]->id : $data['filter']['pp_video']['value'];
			$video_data                        = ( new Video( $video_id ) )->toArray();
			$video_data['pp_video']            = $video_id;
			$video_data['pp_video_percentage'] = isset( $data['filter']['pp_video_percentage']['value'] ) ? $data['filter']['pp_video_percentage']['value'] : '100';
			$user_data                         = WordPress::get_user_context( $video_data['created_by'] );

			$context['response_type'] = 'live';
		}

		$context['pluggable_data'] = array_merge( $user_data, $video_data );

		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_member_press_triggers_last_data( $data ) {
		global $wpdb;

		$context                  = [];
		$context['response_type'] = 'sample';

		$user_data = WordPress::get_sample_user_context();

		$membership_data = [
			'membership_id'                 => '190',
			'membership_title'              => 'Sample Membership',
			'amount'                        => '12.00',
			'total'                         => '12.00',
			'tax_amount'                    => '0.00',
			'tax_rate'                      => '0.00',
			'trans_num'                     => 't_63a03f3334f44',
			'status'                        => 'complete',
			'subscription_id'               => '0',
			'membership_url'                => site_url() . '/register/premium/',
			'membership_featured_image_id'  => '521',
			'membership_featured_image_url' => SURE_TRIGGERS_URL . 'assets/images/sample.svg',
		];

		$membership_id = (int) ( isset( $data['filter']['membership_id']['value'] ) ? $data['filter']['membership_id']['value'] : '-1' );

		if ( $membership_id > 0 ) {

			$subscription = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}mepr_transactions WHERE product_id= %s ORDER BY id DESC LIMIT 1", $membership_id ) );
		} else {
			$subscription = $wpdb->get_row( "SELECT * FROM {$wpdb->prefix}mepr_transactions ORDER BY id DESC LIMIT 1" );
		}

		if ( ! empty( $subscription ) ) {
			$membership_data = MemberPress::get_membership_context( $subscription );
			$user_data       = WordPress::get_user_context( $subscription->user_id );

			$context['response_type'] = 'live';
		}

		$context['pluggable_data'] = array_merge( $user_data, $membership_data );

		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_wishlist_member_triggers_last_data( $data ) {
		global $wpdb;

		$context                  = [];
		$context['response_type'] = 'sample';

		$user_data = WordPress::get_sample_user_context();

		$membership_data = [
			'membership_level_id'   => '1',
			'membership_level_name' => 'Sample Membership Level',
		];

		$membership_level_id = (int) ( isset( $data['filter']['membership_level_id']['value'] ) ? $data['filter']['membership_level_id']['value'] : '-1' );

		if ( $membership_level_id > 0 ) {
			$membership = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}wlm_userlevels WHERE level_id= %s ORDER BY id DESC LIMIT 1", $membership_level_id ) );
		} else {
			$membership = $wpdb->get_row( "SELECT * FROM {$wpdb->prefix}wlm_userlevels ORDER BY id DESC LIMIT 1" );
		}
		if ( ! empty( $membership ) ) {
			$membership_data = WishlistMember::get_membership_detail_context( (int) $membership->level_id );
			$user_data       = WordPress::get_user_context( $membership->user_id );

			$context['response_type'] = 'live';
		}

		$context['pluggable_data'] = array_merge( $user_data, $membership_data );

		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_peepso_triggers_last_data( $data ) {
		global $wpdb;

		$context                  = [];
		$context['response_type'] = 'sample';

		$user_data = WordPress::get_sample_user_context();

		$post_data = [
			'post_id'      => '1',
			'activity_id'  => '2',
			'post_author'  => '1',
			'post_content' => 'New sample post...!',
			'post_title'   => 'Sample Post',
			'post_excerpt' => 'sample',
			'post_status'  => 'publish',
			'post_type'    => 'peepso-post',
		];

		$post = $wpdb->get_row( "SELECT act_id, act_owner_id, act_external_id FROM {$wpdb->prefix}peepso_activities ORDER BY act_id DESC LIMIT 1" );

		if ( ! empty( $post ) ) {
			$post_data = PeepSo::get_pp_activity_context( (int) $post->act_external_id, (int) $post->act_id );
			$user_data = WordPress::get_user_context( $post->act_owner_id );

			$context['response_type'] = 'live';
		}

		$context['pluggable_data'] = array_merge( $user_data, $post_data );

		return $context;
	}

	/**
	 * Get last data for trigger
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_restrict_content_pro_triggers_last_data( $data ) {
		$context                  = [];
		$context['response_type'] = 'sample';

		$user_data = WordPress::get_sample_user_context();

		$membership_data = [
			'membership_level_id'          => '190',
			'membership_level'             => 'Sample Membership',
			'membership_initial_payment'   => '0.00',
			'membership_recurring_payment' => '0.00',
			'membership_expiry_date'       => 'January 22, 2023',
		];

		$customer_id   = (int) ( isset( $data['filter']['membership_customer_id']['value'] ) ? $data['filter']['membership_customer_id']['value'] : '-1' );
		$membership_id = (int) ( isset( $data['filter']['membership_level_id']['value'] ) ? $data['filter']['membership_level_id']['value'] : '-1' );

		$args = [
			'status'  => 'expired',
			'number'  => 1,
			'orderby' => 'id',
		];

		if ( -1 !== $customer_id ) {
			$args['customer_id'] = $customer_id;
		}

		if ( -1 !== $membership_id ) {
			$args['object_id'] = $membership_id;
		}

		$memberships = rcp_get_memberships( $args );
		if ( count( $memberships ) > 0 ) {
			$membership_data = RestrictContent::get_rcp_membership_detail_context( $memberships[0] );
			$user_data       = WordPress::get_user_context( $memberships[0]->get_user_id() );

			$context['response_type'] = 'live';
		}

		$context['pluggable_data'] = array_merge( $user_data, $membership_data );

		return $context;
	}

	/**
	 * Get last data for trigger
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_events_calendar_triggers_last_data( $data ) {
		$context                  = [];
		$context['response_type'] = 'sample';

		$event_data = [
			'event'     => [
				'ID'                    => 58,
				'post_author'           => 1,
				'post_date'             => '2023-01-19 09:27:58',
				'post_date_gmt'         => '2023-01-19 09:27:58',
				'post_content'          => '',
				'post_title'            => 'New event',
				'post_excerpt'          => '',
				'post_status'           => 'publish',
				'comment_status'        => 'open',
				'ping_status'           => 'closed',
				'post_password'         => '',
				'post_name'             => 'new-event',
				'to_ping'               => '',
				'pinged'                => '',
				'post_modified'         => '2023-01-19 09:44:25',
				'post_modified_gmt'     => '2023-01-19 09:44:25',
				'post_content_filtered' => '',
				'post_parent'           => 0,
				'guid'                  => 'http://connector.com/?post_type=tribe_events&#038;p=58',
				'menu_order'            => -1,
				'post_type'             => 'tribe_events',
				'post_mime_type'        => '',
				'comment_count'         => 0,
				'filter'                => 'raw',
			],
			'attendies' => [
				'order_id'           => 68,
				'purchaser_name'     => 'sapna Rana',
				'purchaser_email'    => 'sapnar@bsf.io',
				'provider'           => 'Tribe__Tickets__RSVP',
				'provider_slug'      => 'rsvp',
				'purchase_time'      => '2023-01-19 09:48:43',
				'optout'             => 1,
				'ticket'             => 'Prime',
				'attendee_id'        => 68,
				'security'           => '2cefc3b53e',
				'product_id'         => 65,
				'check_in'           => '',
				'order_status'       => 'yes',
				'order_status_label' => 'Going',
				'user_id'            => 1,
				'ticket_sent'        => 1,
				'event_id'           => 58,
				'ticket_name'        => 'Prime',
				'holder_name'        => 'sapna Rana',
				'holder_email'       => 'sapnar@bsf.io',
				'ticket_id'          => 68,
				'qr_ticket_id'       => 68,
				'security_code'      => '2cefc3b53e',
				'attendee_meta'      => '',
				'is_subscribed'      => '',
				'is_purchaser'       => 1,
				'ticket_exists'      => 1,
			],
		];

		$event_id = (int) ( isset( $data['filter']['event_id']['value'] ) ? $data['filter']['event_id']['value'] : '-1' );

		$args = [
			'post_type'   => 'tribe_rsvp_attendees',
			'orderby'     => 'ID',
			'order'       => 'DESC',
			'post_status' => 'publish',
			'numberposts' => 1,
		];

		if ( -1 !== $event_id ) {
			$args['meta_query'] = [
				[
					'key'   => '_tribe_rsvp_event',
					'value' => $event_id,
				],
			];
		}

		$attendees = get_posts( $args );

		if ( count( $attendees ) > 0 ) {
			$attendee    = $attendees[0];
			$attendee_id = $attendee->ID;

			$product_id = get_post_meta( $attendee_id, '_tribe_rsvp_product', true );
			$order_id   = get_post_meta( $attendee_id, '_tribe_rsvp_order', true );

			$event_data               = TheEventCalendar::get_event_context( $product_id, $order_id );
			$context['response_type'] = 'live';
		}

		$context['pluggable_data'] = $event_data;

		return $context;
	}

	/**
	 * Get last data for trigger
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_woo_commerce_triggers_last_data( $data ) {
		$context                  = [];
		$context['response_type'] = 'sample';
		$user_data                = WordPress::get_sample_user_context();

		$product_data['product'] = [
			'id'                => '169',
			'name'              => 'Sample Product',
			'description'       => 'This is description of sample product.',
			'short_description' => 'This is short description of sample product.',
			'image_url'         => SURE_TRIGGERS_URL . 'assets/images/sample.svg',
			'slug'              => 'sample-product',
			'status'            => 'publish',
			'type'              => 'simple',
			'price'             => '89',
			'featured'          => '0',
			'sku'               => 'hoodie-blue-sm',
			'regular_price'     => '90',
			'sale_price'        => '89',
			'total_sales'       => '21',
			'category'          => 'Uncategorized',
			'tags'              => 'sample, new, 2022',
		];

		$comment_data = [
			'comment_id' => '1',
			'comment'    => 'This is a sample comment..!',
		];

		$order_data = [
			'order_id'             => '500',
			'total_order_value'    => '45',
			'currency'             => 'USD',
			'shipping_total'       => '5',
			'order_payment_method' => 'cod',
			'billing_firstname'    => 'John',
			'billing_lastname'     => 'Doe',
			'billing_company'      => 'BSF',
			'billing_address_1'    => '1004 Beaumont',
			'billing_address_2'    => '',
			'billing_city'         => 'Casper',
			'billing_state'        => 'Wyoming',
			'billing_postcode'     => '82601',
			'billing_country'      => 'US',
			'billing_email'        => 'john_doe@bsf.io',
			'billing_phone'        => '(307) 7626541',
			'shipping_firstname'   => 'John',
			'shipping_lastname'    => 'Doe',
			'shipping_company'     => 'BSF',
			'shipping_address_1'   => '1004 Beaumont',
			'shipping_address_2'   => '',
			'shipping_city'        => 'Casper',
			'shipping_state'       => 'Wyoming',
			'shipping_postcode'    => '82601',
			'shipping_country'     => 'US',
			'coupon_codes'         => 'e3mstekq, f24sjakb',
			'total_items_in_order' => '1',
			'user_id'              => '1',
		];

		$variation_data = [
			'product_variation_id' => '626',
			'product_variation'    => 'Color: Silver',
		];

		$order_sample_data = json_decode( '{"id":37,"parent_id":0,"status":"processing","currency":"USD","version":"7.3.0","prices_include_tax":false,"date_created":{"date":"2023-01-18 08:00:49.000000","timezone_type":1,"timezone":"+00:00"},"date_modified":{"date":"2023-01-18 08:00:50.000000","timezone_type":1,"timezone":"+00:00"},"discount_total":"0","discount_tax":"0","shipping_total":"0","shipping_tax":"0","cart_tax":"0","total":"22.00","total_tax":"0","customer_id":1,"order_key":"wc_order_VdLfjJ9vP7pDs","billing":{"first_name":"John","last_name":"Rana","company":"","address_1":"test","address_2":"","city":"Mohali","state":"AL","postcode":"12344","country":"US","email":"test@example.com","phone":"13232323"},"shipping":{"first_name":"","last_name":"","company":"","address_1":"","address_2":"","city":"","state":"","postcode":"","country":"","phone":""},"payment_method":"cod","payment_method_title":"Cash on delivery","transaction_id":"","customer_ip_address":"::1","customer_user_agent":"Mozilla\/5.0 (X11; Linux x86_64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/108.0.0.0 Safari\/537.36","created_via":"checkout","customer_note":"","date_completed":null,"date_paid":null,"cart_hash":"10b8e2799df0f88e1506edc0f3ed99c9","order_stock_reduced":true,"download_permissions_granted":true,"new_order_email_sent":true,"recorded_sales":true,"recorded_coupon_usage_counts":true,"number":"37","meta_data":[{"id":204,"key":"is_vat_exempt","value":"no"}],"line_items":{"id":"2, 3","order_id":"37, 37","name":"Variable product - Red, Test product","product_id":"34, 31","variation_id":"35, 0","quantity":"1, 1","tax_class":", ","subtotal":"12, 10","subtotal_tax":"0, 0","total":"12, 10","total_tax":"0, 0","taxes":", ","meta_data":", "},"tax_lines":[],"shipping_lines":[],"fee_lines":[],"coupon_lines":[],"products":[{"id":2,"order_id":37,"name":"Variable product - Red","product_id":34,"variation_id":35,"quantity":1,"tax_class":"","subtotal":"12","subtotal_tax":"0","total":"12","total_tax":"0","taxes":{"total":[],"subtotal":[]},"meta_data":{"19":{"key":"color","value":"Red","display_key":"Color","display_value":"<p>Red<\/p>\n"}}},{"id":3,"order_id":37,"name":"Test product","product_id":31,"variation_id":0,"quantity":1,"tax_class":"","subtotal":"10","subtotal_tax":"0","total":"10","total_tax":"0","taxes":{"total":[],"subtotal":[]},"meta_data":[]}],"quantity":"1, 1","wp_user_id":1,"user_login":"john","display_name":"john smith","user_firstname":"John","user_lastname":"Smith","user_email":"test@example.com","user_role":["subscriber"]}', true ); //phpcs:ignore

		$product_id = (int) ( isset( $data['filter']['product_id']['value'] ) ? $data['filter']['product_id']['value'] : -1 );
		$term       = isset( $data['search_term'] ) ? $data['search_term'] : '';

		if ( in_array( $term, [ 'product_added_to_cart', 'product_viewed' ], true ) ) {
			if ( -1 === $product_id ) {
				$args     = [
					'post_type'   => 'product',
					'orderby'     => 'ID',
					'order'       => 'DESC',
					'post_status' => 'publish',
					'numberposts' => 1,
				];
				$products = get_posts( $args );

				if ( count( $products ) > 0 ) {
					$product_id = $products[0]->ID;
				}
			}

			if ( -1 !== $product_id ) {
				$post                       = get_post( $product_id );
				$user_data                  = WordPress::get_user_context( $post->post_author );
				$product_data['product_id'] = $product_id;
				$product_data['product']    = WooCommerce::get_product_context( $product_id );
				unset( $product_data['product']['id'] ); //phpcs:ignore
				$context['response_type'] = 'live';
			}

			if ( 'product_added_to_cart' === $term ) {
				$product_data['product_quantity'] = 1;
			}

			$context['pluggable_data'] = array_merge( $product_data, $user_data );

		} elseif ( 'product_reviewed' === $term ) {
			$comment_args = [
				'number'  => 1,
				'type'    => 'review',
				'orderby' => 'comment_ID',
				'post_id' => -1 !== $product_id ? $product_id : 0,
			];

			$comments = get_comments( $comment_args );

			if ( count( $comments ) > 0 ) {
				$comment                  = $comments[0];
				$comment_data             = [
					'comment_id' => $comment->comment_ID,
					'comment'    => $comment->comment_content,
				];
				$product_data             = WooCommerce::get_product_context( $comment->comment_post_ID );
				$user_data                = WordPress::get_user_context( $comment->user_id );
				$context['response_type'] = 'live';
			}

			$context['pluggable_data'] = array_merge( $product_data, $user_data, $comment_data );

		} elseif ( 'product_purchased' === $term ) {
			$order_id                 = 0;
			$product_data['quantity'] = '1';
			if ( -1 !== $product_id ) {
				$order_ids = ( new Utilities() )->get_orders_ids_by_product_id( $product_id );
				if ( count( $order_ids ) > 0 ) {
					$order_id = $order_ids[0];
				}
			} else {
				$orders = wc_get_orders( [ 'numberposts' => 1 ] );
				if ( count( $orders ) > 0 ) {
					$order_id = $orders[0]->get_id();
				}
			}

			if ( 0 !== $order_id ) {
				$order = wc_get_order( $order_id );

				if ( $order ) {
					$user_id = $order->get_customer_id();
					$items   = $order->get_items();

					$product_ids = [];

					$iteration = 0;
					foreach ( $items as $item ) {
						$item_id = $item->get_product_id();

						if ( -1 === $product_id && 0 === $iteration ) {
							$product_ids[] = $item_id;
							break;
						} elseif ( $item_id === $product_id ) {
							$product_ids[] = $item_id;
							break;
						}

						$iteration++;
					}
					$order_data                         = WooCommerce::get_order_context( $order_id );
					$user_data                          = WordPress::get_user_context( $user_id );
					$order_data['total_items_in_order'] = count( $product_ids );

					$context['response_type'] = 'live';
				}
			}

			$context['pluggable_data'] = array_merge( $order_data, $product_data, $user_data );

		} elseif ( 'variable_product_purchased' === $term ) {
			$product_variation_id = (int) ( isset( $data['filter']['product_variation_id']['value'] ) ? $data['filter']['product_variation_id']['value'] : -1 );
			$order_ids            = ( new Utilities() )->get_orders_ids_by_product_id( $product_id );

			foreach ( $order_ids as $order_id ) {
				$order = wc_get_order( $order_id );

				if ( $order ) {
					$user_id            = $order->get_customer_id();
					$items              = $order->get_items();
					$product_variations = [];

					$iteration = 0;
					foreach ( $items as $item ) {
						$variation_id = $item->get_variation_id();

						if ( -1 === $product_variation_id && 0 === $iteration ) {
							$product_variations[] = $variation_id;
							break;
						} elseif ( $variation_id === $product_variation_id ) {
							$product_variations[] = $variation_id;
							break;
						}

						$iteration++;
					}

					if ( count( $product_variations ) > 0 ) {
						$product_data   = WooCommerce::get_product_context( $product_variation_id );
						$order_data     = WooCommerce::get_order_context( $order_id );
						$user_data      = WordPress::get_user_context( $user_id );
						$variation_data = [
							'product_variation_id' => $product_variations[0],
							'product_variation'    => get_the_excerpt( $product_variations[0] ),
						];

						$context['response_type'] = 'live';
						break;
					}
				}
			}

			$context['pluggable_data'] = array_merge( $order_data, $user_data, $variation_data );

		} elseif ( 'variable_subscription_purchased' === $term ) {
			$product_data['quantity']       = '1';
			$product_data['product_name']   = 'Sample Product';
			$product_data['billing_period'] = '2021-2022';

			$context['pluggable_data'] = array_merge( $order_data, $product_data, $user_data );

			$subscription_order_id = 0;
			$order_ids             = [];

			if ( -1 !== $product_id ) {
				$order_ids = ( new Utilities() )->get_orders_ids_by_product_id( $product_id );

			} else {
				$orders = wc_get_orders( [] );
				if ( count( $orders ) > 0 ) {
					$order_ids[] = $orders[0]->get_id();
				}
			}

			foreach ( $order_ids as $order_id ) {
				$query_args          = [
					'post_type'      => 'shop_subscription',
					'orderby'        => 'ID',
					'order'          => 'DESC',
					'post_status'    => 'wc-active',
					'posts_per_page' => 1,
					'post_parent'    => $order_id,
				];
				$query_result        = new WP_Query( $query_args );
				$subscription_orders = $query_result->get_posts();

				if ( count( $subscription_orders ) > 0 ) {
					$subscription_order_id = $subscription_orders[0]->ID;
					break;
				}
			}

			if ( 0 !== $subscription_order_id ) {
				$subscription = wcs_get_subscription( $subscription_order_id );
				if ( $subscription instanceof WC_Subscription ) {
					$last_order_id = $subscription->get_last_order();
					if ( ! empty( $last_order_id ) && $last_order_id === $subscription->get_parent_id() ) {
						$user_id = wc_get_order( $last_order_id )->get_customer_id();
						$items   = $subscription->get_items();

						foreach ( $items as $item ) {
							$product = $item->get_product();
							if ( class_exists( '\WC_Subscriptions_Product' ) && WC_Subscriptions_Product::is_subscription( $product ) ) {
								if ( $product->is_type( [ 'subscription', 'subscription_variation', 'variable-subscription' ] ) ) {

									$product_data = WooCommerce::get_variable_subscription_product_context( $item, $last_order_id );
									$user_data    = WordPress::get_user_context( $user_id );

									$context['response_type']  = 'live';
									$context['pluggable_data'] = array_merge( $product_data, $user_data );
								}
							}
						}
					}
				}
			}
		} elseif ( 'order_created' === $term ) {
			$orders = wc_get_orders( [ 'numberposts' => 1 ] );
			if ( count( $orders ) > 0 ) {
				$order_id = $orders[0]->get_id();
			}
			$order                     = wc_get_order( $order_id );
			$user_id                   = $order->get_customer_id();
			$order_sample_data         = array_merge(
				WooCommerce::get_order_context( $order_id ),
				WordPress::get_user_context( $user_id )
			);
			$context['response_type']  = 'live';
			$context['pluggable_data'] = $order_sample_data;

		}

		return $context;
	}

	/**
	 * Search LMS data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_lifter_lms_last_data( $data ) {
		global $wpdb;
		$post_type = $data['post_type'];
		$meta_key  = '_is_complete';
		$trigger   = $data['search_term'];
		$context   = [];
		if ( 'lifterlms_purchase_course' === $trigger ) {
			$product_type = 'course';
			$post_id      = $data['filter']['course_id']['value'];
		} elseif ( 'lifterlms_purchase_membership' === $trigger ) {
			$product_type = 'membership';
			$post_id      = $data['filter']['membership_id']['value'];
		} elseif ( 'lifterlms_lesson_completed' === $trigger ) {
			$post_id = $data['filter']['lesson']['value'];
		} elseif ( 'lifterlms_course_completed' === $trigger ) {
			$post_id = $data['filter']['course']['value'];
		}

		$where = 'postmeta.post_id = "' . $post_id . '" AND';

		if ( 'llms_order' === $post_type ) {
			if ( -1 === $post_id ) {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}posts as posts JOIN {$wpdb->prefix}postmeta as postmeta ON posts.ID=postmeta.post_id WHERE posts.post_type ='llms_order' AND posts.post_status= 'llms-completed' AND postmeta.meta_value=%s AND postmeta.meta_key= '_llms_product_type'", $product_type ) );
			} else {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}posts as posts JOIN {$wpdb->prefix}postmeta as postmeta ON posts.ID=postmeta.post_id WHERE posts.post_type ='llms_order' AND posts.post_status= 'llms-completed' AND postmeta.meta_value=%s AND postmeta.meta_key= '_llms_product_id'", $post_id ) );
			}
		} else {
			if ( -1 === $post_id ) {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}lifterlms_user_postmeta  as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.post_id WHERE postmeta.meta_value='yes' AND postmeta.meta_key=%s AND posts.post_type=%s", $meta_key, $post_type ) );
			} else {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}lifterlms_user_postmeta  as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.post_id WHERE postmeta.post_id = %s AND postmeta.meta_value='yes' AND postmeta.meta_key=%s AND posts.post_type=%s", $post_id, $meta_key, $post_type ) );
			}
		}

		$response = [];
		if ( ! empty( $result ) ) {
			$result_post_id = $result[0]->post_id;
			$result_user_id = $result[0]->user_id;

			switch ( $trigger ) {
				case 'lifterlms_lesson_completed':
					$context = array_merge(
						WordPress::get_user_context( $result_user_id ),
						LifterLMS::get_lms_lesson_context( $result_post_id )
					);

					$context['course'] = get_the_title( get_post_meta( $result_post_id, '_llms_parent_course', true ) );
					if ( '' !== ( get_post_meta( $result_post_id, '_llms_parent_section', true ) ) ) {
						$context['parent_section'] = get_the_title( get_post_meta( $result_post_id, '_llms_parent_section', true ) );
					}
					break;
				case 'lifterlms_course_completed':
					$context = array_merge(
						WordPress::get_user_context( $result_user_id ),
						LifterLMS::get_lms_course_context( $result_post_id )
					);
					break;
				case 'lifterlms_purchase_course':
					$user_id                      = get_post_meta( $result_post_id, '_llms_user_id', true );
					$context['course_id']         = get_post_meta( $result_post_id, '_llms_product_id', true );
					$context['course_name']       = get_post_meta( $result_post_id, '_llms_product_title', true );
					$context['course_amount']     = get_post_meta( $result_post_id, '_llms_original_total', true );
					$context['currency']          = get_post_meta( $result_post_id, '_llms_currency', true );
					$context ['order']            = WordPress::get_post_context( $result_post_id );
					$context['order_type']        = get_post_meta( $result_post_id, '_llms_order_type', true );
					$context['trial_offer']       = get_post_meta( $result_post_id, '_llms_trial_offer', true );
					$context['billing_frequency'] = get_post_meta( $result_post_id, '_llms_billing_frequency', true );
					$context                      = array_merge( $context, WordPress::get_user_context( $user_id ) );
					break;
				case 'lifterlms_purchase_membership':
					$user_id                      = get_post_meta( $result_post_id, '_llms_user_id', true );
					$context['membership_id']     = get_post_meta( $result_post_id, '_llms_product_id', true );
					$context['membership_name']   = get_post_meta( $result_post_id, '_llms_product_title', true );
					$context['membership_amount'] = get_post_meta( $result_post_id, '_llms_original_total', true );
					$context['currency']          = get_post_meta( $result_post_id, '_llms_currency', true );
					$context ['order']            = WordPress::get_post_context( $result_post_id );
					$context['order_type']        = get_post_meta( $result_post_id, '_llms_order_type', true );
					$context['trial_offer']       = get_post_meta( $result_post_id, '_llms_trial_offer', true );
					$context['billing_frequency'] = get_post_meta( $result_post_id, '_llms_billing_frequency', true );
					$context                      = array_merge( $context, WordPress::get_user_context( $user_id ) );
					break;
				default:
					return;

			}
			$response['pluggable_data'] = $context;
			$response['response_type']  = 'live';

		}

		return $response;

	}

	/**
	 * Search SM data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_suremember_last_data( $data ) {
		global $wpdb;
		$post_type = $data['post_type'];
		$meta_key  = '_is_complete';
		$trigger   = $data['search_term'];
		$post_id   = $data['filter']['group_id']['value'];

		if ( 'suremember_updated_group' === $trigger ) {
			if ( -1 === $post_id ) {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}posts as posts WHERE posts.post_type=%s", $post_type ) );
			} else {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}posts as posts WHERE posts.ID=%s AND posts.post_type=%s", $post_id, $post_type ) );
			}
		} else {
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}usermeta as usermeta WHERE usermeta.meta_key = %s", 'suremembers_user_access_group_' . $post_id ) );
		}

		$response = [];

		if ( ! empty( $result ) ) {
			$context = [];
			switch ( $trigger ) {
				case 'suremember_updated_group':
					$group_id                                   = $result[0]->ID;
					$suremembers_post['rules']                  = get_post_meta( $group_id, 'suremembers_plan_include', true );
					$suremembers_post['exclude']                = get_post_meta( $group_id, 'suremembers_plan_exclude', true ); //phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_exclude
					$suremembers_post['suremembers_user_roles'] = get_post_meta( $group_id, 'suremembers_user_roles', true );
					$suremembers_post['title']                  = get_the_title( $group_id );
					$suremembers_post['restrict']               = get_post_meta( $group_id, 'suremembers_plan_rules', true )['restrict'];
					$context['group']                           = array_merge( WordPress::get_post_context( $group_id ), $suremembers_post );
					$context['group_id']                        = $group_id;
					unset( $context['group']['ID'] );
					$response['pluggable_data'] = $context;
					$response['response_type']  = 'live';
					break;
				case 'suremember_user_added_in_group':
					foreach ( $result as $res ) {
						$meta_value = unserialize( $res->meta_value );
						if ( 'active' === $meta_value['status'] ) {
							$context                    = WordPress::get_user_context( $res->user_id );
							$context['group']           = WordPress::get_post_context( $post_id );
							$response['pluggable_data'] = $context;
							$response['response_type']  = 'live';
						}
					}
					break;
				case 'suremember_user_removed_from_group':
					foreach ( $result as $res ) {
						$meta_value = unserialize( $res->meta_value );
						if ( 'revoked' === $meta_value['status'] ) {
							$context                    = WordPress::get_user_context( $res->user_id );
							$context['group']           = WordPress::get_post_context( $post_id );
							$response['pluggable_data'] = $context;
							$response['response_type']  = 'live';
						}
					}
					break;
				default:
					return;

			}
		}

		return $response;

	}

	/**
	 * Search CartFlows data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_cartflows_last_data( $data ) {
		global $wpdb;
		$trigger = $data['search_term'];
		$context = [];
		if ( 'cartflows_offer_accepted' === $trigger ) {
			$result = $wpdb->get_results( "SELECT * FROM  {$wpdb->prefix}posts as posts  JOIN {$wpdb->prefix}postmeta as postmeta ON posts.ID=postmeta.post_id WHERE posts.post_type ='shop_order' AND postmeta.meta_value='upsell' AND postmeta.meta_key= '_cartflows_offer_type'" );
		}
		$response = [];
		if ( ! empty( $result ) ) {
			$context                    = [];
			$order_upsell_id            = $result[0]->post_id;
			$step_id                    = get_post_meta( $order_upsell_id, '_cartflows_offer_step_id', true );
			$order_id                   = get_post_meta( $order_upsell_id, '_cartflows_offer_parent_id', true );
			$order                      = wc_get_order( $order_id );
			$upsell_order               = wc_get_order( $order_upsell_id );
			$variation_id               = $upsell_order->get_items()[0]['product_id'];
			$input_qty                  = $upsell_order->get_items()[0]['quantity'];
			$offer_product              = wcf_pro()->utils->get_offer_data( $step_id, $variation_id, $input_qty, $order_id );
			$user_id                    = get_post_meta( $order_upsell_id, '_customer_user', true );
			$context                    = WordPress::get_user_context( $user_id );
			$context['order']           = $order->get_data();
			$context['upsell']          = $offer_product;
			$response['pluggable_data'] = $context;
			$response['response_type']  = 'live';
		}

		return $response;

	}


	/**
	 * Fetch user context.
	 *
	 * @param int $initiator_id initiator id.
	 * @param int $friend_id friend id.
	 * @return array
	 */
	public function get_user_context( $initiator_id, $friend_id ) {
		$context = WordPress::get_user_context( $initiator_id );

		$friend_context = WordPress::get_user_context( $friend_id );

		$avatar = get_avatar_url( $initiator_id );

		$context['avatar_url'] = ( $avatar ) ? $avatar : '';

		$context['friend_id']         = $friend_id;
		$context['friend_first_name'] = $friend_context['user_firstname'];
		$context['friend_last_name']  = $friend_context['user_lastname'];
		$context['friend_email']      = $friend_context['user_email'];

		$friend_avatar                = get_avatar_url( $friend_id );
		$context['friend_avatar_url'] = $friend_avatar;
		return $context;
	}

	/**
	 * Search BP data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_bp_friendships( $data ) {
		global $wpdb, $bp;
		$context     = [];
		$friendships = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM %s LIMIT 1', $bp->friends->table_name ), ARRAY_A );
		if ( ! empty( $friendships ) ) {
			$friendship                = $friendships[0];
			$initiator_id              = $friendship['initiator_user_id'];
			$friend_user_id            = $friendship['friend_user_id'];
			$context['pluggable_data'] = $this->get_user_context( $initiator_id, $friend_user_id );
			$context['response_type']  = 'live';
		} else {
			$context['pluggable_data'] = [
				'wp_user_id'        => 4,
				'user_login'        => 'katy1ßßßß',
				'display_name'      => 'Katy Smith',
				'user_firstname'    => 'Katy',
				'user_lastname'     => 'Smith',
				'user_email'        => 'katy1@gmail.com',
				'user_role'         => [ 'subscriber' ],
				'avatar_url'        => 'http://pqr.com/avatar',
				'friend_id'         => 1,
				'friend_first_name' => 'John',
				'friend_last_name'  => 'Wick',
				'friend_email'      => 'john@gmail.com',
				'friend_avatar_url' => 'http://abc.com/avatar',
			];
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * Search BP data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_bp_groups( $data ) {
		global $wpdb, $bp;
		$context    = [];
		$group_data = [];
		$args       = [
			'orderby' => 'user_nicename',
			'order'   => 'ASC',
			'number'  => 1,
		];

		$users = get_users( $args );

		if ( isset( $data['filter']['group_id']['value'] ) ) {
			$group_id         = $data['filter']['group_id']['value'];
			$args['group_id'] = $group_id;
			if ( $group_id > 0 ) {
				$group                           = groups_get_group( $group_id );
				$group_data['group_id']          = ( property_exists( $group, 'id' ) ) ? (int) $group->id : '';
				$group_data['group_name']        = ( property_exists( $group, 'name' ) ) ? $group->name : '';
				$group_data['group_description'] = ( property_exists( $group, 'description' ) ) ? $group->description : '';
			} else {
				$groups             = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM %s LIMIT 1', $bp->groups->table_name ) );
				$context['groupss'] = $groups;
				if ( ! empty( $groups ) ) {
					foreach ( $groups as $group ) {
						$group_data['group_id']          = $group->id;
						$group_data['group_name']        = $group->name;
						$group_data['group_description'] = $group->description;
					}
				}
			}
		}

		if ( ! empty( $users ) ) {
			$user           = $users[0];
			$pluggable_data = $group_data;

			$avatar                           = get_avatar_url( $user->ID );
			$pluggable_data['wp_user_id']     = $user->ID;
			$pluggable_data['avatar_url']     = ( $avatar ) ? $avatar : '';
			$pluggable_data['user_login']     = $user->user_login;
			$pluggable_data['display_name']   = $user->display_name;
			$pluggable_data['user_firstname'] = $user->user_firstname;
			$pluggable_data['user_lastname']  = $user->user_lastname;
			$pluggable_data['user_email']     = $user->user_email;
			$pluggable_data['user_role']      = $user->roles;
			$context['pluggable_data']        = $pluggable_data;
			$context['response_type']         = 'live';
		} else {
			$context['pluggable_data'] = [
				'wp_user_id'        => 1,
				'user_login'        => 'admin',
				'display_name'      => 'Test User',
				'user_firstname'    => 'Test',
				'user_lastname'     => 'User',
				'user_email'        => 'testuser@gmail.com',
				'user_role'         => [ 'subscriber' ],
				'group_id'          => 112,
				'group_name'        => 'Test Group',
				'group_description' => 'Test Group Description',
			];
			$context['response_type']  = 'sample';
		}

		return $context;
	}

	/**
	 * Search complete courses.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_complete_course( $data ) {
		global $wpdb;
		$context = [];

		if ( isset( $data['filter']['sfwd_course_id']['value'] ) ) {
			$course_id = $data['filter']['sfwd_course_id']['value'];
		}
		if ( -1 === $course_id ) {
			$courses = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}learndash_user_activity as activity JOIN {$wpdb->prefix}posts as post ON activity.post_id=post.ID WHERE activity.activity_type ='course' AND activity.activity_status= %d AND activity.course_id= %d", 1, $course_id ) );
		} else {
			$courses = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}learndash_user_activity as activity JOIN {$wpdb->prefix}posts as post ON activity.post_id=post.ID  WHERE activity.activity_type ='course' AND activity.activity_status= %d AND activity.post_id= %d AND activity.course_id= %d", 1, $course_id, $course_id ) );
		}

		if ( ! empty( $courses ) ) {
			$course                                   = $courses[0];
			$course_data['course_name']               = $course->post_title;
			$course_data['sfwd_course_id']            = $course->ID;
			$course_data['course_url']                = get_permalink( $course->ID );
			$course_data['course_featured_image_id']  = get_post_meta( $course->ID, '_thumbnail_id', true );
			$course_data['course_featured_image_url'] = get_the_post_thumbnail_url( $course->ID );
			$context['response_type']                 = 'live';
		} else {
			$course_data['course_name']               = 'Test Course';
			$course_data['sfwd_course_id']            = 112;
			$course_data['course_url']                = 'https://abc.com/test-course';
			$course_data['course_featured_image_id']  = 113;
			$course_data['course_featured_image_url'] = 'https://pqr.com/test-course-img';
			$context['response_type']                 = 'sample';
		}

		$users_data = $this->search_pluggables_add_user_role( [] );
		$user_data  = $users_data['pluggable_data'];

		$context['pluggable_data'] = array_merge( $course_data, $user_data );
		return $context;
	}

	/**
	 * Search lessons.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_complete_lesson( $data ) {
		global $wpdb;
		$context = [];

		if ( isset( $data['filter']['sfwd_lesson_id']['value'] ) ) {
			$lesson_id = $data['filter']['sfwd_lesson_id']['value'];
			$course_id = $data['filter']['sfwd_course_id']['value'];
		}
		$course         = get_post( $course_id );
		$pluggable_data = LearnDash::get_course_context( $course );

		if ( -1 === $lesson_id ) {
			$lessons = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}learndash_user_activity as activity JOIN {$wpdb->prefix}posts as post ON activity.post_id=post.ID WHERE activity.activity_type ='lesson' AND activity.activity_status= %d AND activity.course_id= %d", 1, $course_id ) );
		} else {
			$lessons = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}learndash_user_activity as activity JOIN {$wpdb->prefix}posts as post ON activity.post_id=post.ID  WHERE activity.activity_type ='lesson' AND activity.activity_status= %d AND activity.post_id= %d AND activity.course_id= %d", 1, $lesson_id, $course_id ) );
		}

		if ( ! empty( $lessons ) ) {
			$lesson = $lessons[0];

			$pluggable_data['lesson_name']               = $lesson->post_title;
			$pluggable_data['sfwd_lesson_id']            = $lesson->ID;
			$pluggable_data['lesson_url']                = get_permalink( $lesson->ID );
			$pluggable_data['lesson_featured_image_id']  = get_post_meta( $lesson->ID, '_thumbnail_id', true );
			$pluggable_data['lesson_featured_image_url'] = get_the_post_thumbnail_url( $lesson->ID );
			$context['response_type']                    = 'live';
		} else {
			$pluggable_data['lesson_name']               = 'Test Lesson';
			$pluggable_data['sfwd_lesson_id']            = 114;
			$pluggable_data['lesson_url']                = 'https://abc.com/test-lesson';
			$pluggable_data['lesson_featured_image_id']  = 116;
			$pluggable_data['lesson_featured_image_url'] = 'https://pqr.com/test-lesson-img';
			$context['response_type']                    = 'sample';
		}

		$context['pluggable_data'] = $pluggable_data;
		return $context;
	}

	/**
	 * Search topics.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_complete_topic( $data ) {
		global $wpdb;
		$context = [];

		if ( isset( $data['filter']['sfwd_topic_id']['value'] ) ) {
			$topic_id  = $data['filter']['sfwd_topic_id']['value'];
			$course_id = $data['filter']['sfwd_course_id']['value'];
		}
		$course         = get_post( $course_id );
		$pluggable_data = LearnDash::get_course_context( $course );

		if ( -1 === $topic_id ) {
			$topics = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}learndash_user_activity as activity JOIN {$wpdb->prefix}posts as post ON activity.post_id=post.ID WHERE activity.activity_type ='topic' AND activity.activity_status= %d AND activity.course_id= %d", 1, $course_id ) );
		} else {
			$topics = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM  {$wpdb->prefix}learndash_user_activity as activity JOIN {$wpdb->prefix}posts as post ON activity.post_id=post.ID  WHERE activity.activity_type ='topic' AND activity.activity_status= %d AND activity.post_id= %d AND activity.course_id= %d", 1, $topic_id, $course_id ) );
		}

		if ( ! empty( $topics ) ) {
			$topic = $topics[0];

			$pluggable_data['topic_name']               = $topic->post_title;
			$pluggable_data['sfwd_topic_id']            = $topic->ID;
			$pluggable_data['topic_url']                = get_permalink( $topic->ID );
			$pluggable_data['topic_featured_image_id']  = get_post_meta( $topic->ID, '_thumbnail_id', true );
			$pluggable_data['topic_featured_image_url'] = get_the_post_thumbnail_url( $topic->ID );
			$context['response_type']                   = 'live';
		} else {
			$pluggable_data['topic_name']               = 'Test Topic';
			$pluggable_data['sfwd_topic_id']            = 117;
			$pluggable_data['topic_url']                = 'https://abc.com/test-topic';
			$pluggable_data['topic_featured_image_id']  = 118;
			$pluggable_data['topic_featured_image_url'] = 'https://pqr.com/test-topic-img';
			$context['response_type']                   = 'sample';
		}

		$context['pluggable_data'] = $pluggable_data;
		return $context;
	}

	/**
	 * Search purchase courses.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_pluggables_purchase_course( $data ) {
		$context                  = [];
		$context['response_type'] = 'sample';

		$purchase_data = [
			'course_product_id'   => '1',
			'course_product_name' => 'Sample Course',
			'currency'            => 'USD',
			'total_amount'        => '100',
			'first_name'          => 'John',
			'last_name'           => 'Doe',
			'email'               => 'john_doe@bsf.io',
			'phone'               => '+923007626541',
		];

		$product_id = (int) ( isset( $data['filter']['course_product_id']['value'] ) ? $data['filter']['course_product_id']['value'] : '-1' );
		$order_id   = 0;

		if ( -1 !== $product_id ) {
			$order_ids = ( new Utilities() )->get_orders_ids_by_product_id( $product_id );

			if ( count( $order_ids ) > 0 ) {
				$order_id = $order_ids[0];
			}
		} else {
			$orders = wc_get_orders( [] );
			if ( count( $orders ) > 0 ) {
				foreach ( $orders as $order ) {
					$items = $order->get_items();

					if ( count( $items ) > 1 ) {
						continue;
					}

					foreach ( $items as $item ) {
						if ( ! empty( get_post_meta( $item->get_product_id(), '_related_course', true ) ) ) {
							$order_id = $order->get_id();
							break;
						}
					}
				}
			}
		}

		if ( 0 !== $order_id ) {
			$order = wc_get_order( $order_id );

			if ( $order ) {

				$purchase_data = LearnDash::get_purchase_course_context( $order );

				$context['response_type'] = 'live';
			}
		}

		$context['pluggable_data'] = $purchase_data;

		return $context;
	}

	/**
	 * Fetch BB templates.
	 *
	 * @return array
	 */
	public function get_beaver_builder_templates() {
		$allowed_types = [ 'subscribe-form', 'contact-form' ];
		$templates     = [];
		$all_templates = get_posts(
			[
				'post_type'      => 'fl-builder-template',
				'meta_key'       => '_fl_builder_data',
				'posts_per_page' => -1,
			]
		);
		$posts         = get_posts(
			[
				'post_type'      => 'any',
				'meta_key'       => '_fl_builder_data',
				'posts_per_page' => -1,
			]
		);
		$posts         = array_merge( $all_templates, $posts );

		if ( ! empty( $posts ) ) {
			foreach ( $posts as $post ) {
				$meta = get_post_meta( $post->ID, '_fl_builder_data', true );
				foreach ( (array) $meta as $node_id => $node ) {
					if ( isset( $node->type ) && 'module' === $node->type ) {
						$settings = $node->settings;
						if ( in_array( $settings->type, $allowed_types, true ) ) {
							$label = $post->post_title;
							if ( '' !== $settings->node_label ) {
								$label .= ' - ' . $settings->node_label;
							}
							$templates[] = [
								'label' => $label,
								'value' => $node_id,
							];
						}
					}
				}
			}
		}
		return $templates;
	}

	/**
	 * Search beaver builder forms.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_beaver_builder_forms( $data ) {
		$templates = $this->get_beaver_builder_templates();
		return [
			'options' => $templates,
			'hasMore' => false,
		];
	}

	/**
	 * Search fluentcrm fields.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_fluentcrm_custom_fields( $data ) {
		$context           = [];
		$custom_fields     = ( new CustomContactField() )->getGlobalFields()['fields'];
		$context['fields'] = $custom_fields;
		return $context;
	}

	/**
	 * Fetch WP JOB Manager Last Data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_wp_job_manger_last_data( $data ) {
		global $wpdb;
		$job_type = $data['filter']['job_type']['value'];
		$args     = [
			'posts_per_page' => 1,
			'post_type'      => 'job_listing',
			'orderby'        => 'id',
			'order'          => 'DESC',
		];

		if ( -1 !== $job_type ) {
			$args['tax_query'] = [              // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				[
					'taxonomy' => 'job_listing_type',
					'field'    => 'term_id',
					'terms'    => $job_type,
				],
			];
		}
		$posts = get_posts( $args );
		if ( empty( $posts ) ) {
			$context = json_decode( '{"response_type":"sample","pluggable_data":{"ID":145,"wpjob_author":"1","wpjob_date":"2023-01-22 17:38:03","wpjob_date_gmt":"2023-01-22 17:38:03","wpjob_content":"","wpjob_title":"PHP Developer","wpjob_excerpt":"","wpjob_status":"publish","comment_status":"closed","ping_status":"closed","wpjob_password":"","wpjob_name":"project-manager","to_ping":"","pinged":"","wpjob_modified":"2023-01-23 03:23:35","wpjob_modified_gmt":"2023-01-23 03:23:35","wpjob_content_filtered":"","wpjob_parent":0,"guid":"http:\/\/connector.com\/?post_type=job_listing&#038;p=145","menu_order":-1,"wpjob_type":"job_listing","wpjob_mime_type":"","comment_count":"0","filter":"raw","_filled":["0"],"_featured":["1"],"_tribe_ticket_capacity":["0"],"_tribe_ticket_version":["5.5.6"],"_edit_lock":["1674444219:1"],"_job_expires":["2023-02-21"],"_tracked_submitted":["1674409083"],"_edit_last":["1"],"_job_location":[""],"_application":["johnsmith@bexample.com"],"_company_name":["test"],"_company_website":[""],"_company_tagline":[""],"_company_twitter":[""],"_company_video":[""],"_remote_position":["1"],"_llms_reviews_enabled":[""],"_llms_display_reviews":[""],"_llms_num_reviews":["0"],"_llms_multiple_reviews_disabled":[""],"wp_user_id":1,"user_login":"john","display_name":"john","user_firstname":"john","user_lastname":"smith","user_email":"johnsmith@bexample.com","user_role":["administrator","subscriber","tutor_instructor"]}}', true );
			return $context;
		}

		$post         = $posts[0];
		$post_content = WordPress::get_post_context( $post->ID );
		$post_meta    = WordPress::get_post_meta( $post->ID );
		$job_data     = array_merge( $post_content, $post_meta, WordPress::get_user_context( $post->post_author ) );
		foreach ( $job_data as $key => $job ) {
			$newkey = str_replace( 'post', 'wpjob', $key );
			unset( $job_data[ $key ] );
			$job_data[ $newkey ] = $job;
		}
		$context['response_type']  = 'live';
		$context['pluggable_data'] = $job_data;
		return $context;

	}

	/**
	 * Get Amelia Appointment Category.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_amelia_category_list( $data ) {

		global $wpdb;

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$categories = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT SQL_CALC_FOUND_ROWS id, name FROM {$wpdb->prefix}amelia_categories WHERE status = %s ORDER BY name ASC LIMIT %d OFFSET %d",
				[ 'visible', $limit, $offset ]
			),
			OBJECT
		);

		$categories_count = $wpdb->get_var( 'SELECT FOUND_ROWS();' );

		$options = [];
		if ( ! empty( $categories ) ) {
			foreach ( $categories as $category ) {
				$options[] = [
					'label' => $category->name,
					'value' => $category->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => $categories_count > $limit && $categories_count > $offset,
		];

	}

	/**
	 * Get Amelia Appointment Services.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_amelia_service_list( $data ) {

		global $wpdb;

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$services = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT SQL_CALC_FOUND_ROWS id, name FROM {$wpdb->prefix}amelia_services 
				WHERE categoryId = %d AND status = %s 
				ORDER BY name ASC LIMIT %d OFFSET %d",
				[ $data['dynamic'], 'visible', $limit, $offset ]
			),
			OBJECT
		);

		$services_count = $wpdb->get_var( 'SELECT FOUND_ROWS();' );

		$options = [];
		if ( ! empty( $services ) ) {
			foreach ( $services as $category ) {
				$options[] = [
					'label' => $category->name,
					'value' => $category->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => $services_count > $limit && $services_count > $offset,
		];

	}

	/**
	 * Get Amelia Events.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_amelia_events_list( $data ) {

		global $wpdb;

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$events = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT SQL_CALC_FOUND_ROWS id, name from {$wpdb->prefix}amelia_events WHERE status = %s ORDER BY name ASC LIMIT %d OFFSET %d",
				[ 'approved', $limit, $offset ]
			),
			OBJECT
		);

		$list_count = $wpdb->get_var( 'SELECT FOUND_ROWS();' );

		$options = [];
		if ( ! empty( $events ) ) {
			foreach ( $events as $event ) {
				$options[] = [
					'label' => $event->name,
					'value' => $event->id,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => $list_count > $limit && $list_count > $offset,
		];

	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_amelia_appointment_booked_triggers_last_data( $data ) {
		global $wpdb;

		$context = [];

		$appointment_category = $data['filter']['amelia_category_list']['value'];
		$appointment_service  = $data['filter']['amelia_service_list']['value'];

		if ( -1 === $appointment_service ) {
			// If service exists as per category selected.
			$service_exist = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT id, name, description FROM ' . $wpdb->prefix . 'amelia_services WHERE categoryId = %d',
					[ $appointment_category ]
				),
				ARRAY_A
			);

			if ( empty( $service_exist ) ) {
				$result = [];
			} else {
				$result = $wpdb->get_row(
					'SELECT appointments.*, customer.* FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer INNER JOIN ' . $wpdb->prefix . 'amelia_appointments as appointments ON customer.appointmentId=appointments.id WHERE customer.appointmentId = ( SELECT max(id) FROM ' . $wpdb->prefix . 'amelia_appointments )',
					ARRAY_A
				);
			}
		} else {
			$result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT appointments.*, customer.* FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer INNER JOIN ' . $wpdb->prefix . 'amelia_appointments as appointments ON customer.appointmentId=appointments.id WHERE customer.appointmentId = ( SELECT max(id) FROM ' . $wpdb->prefix . 'amelia_appointments ) AND appointments.serviceId = %d',
					[ $appointment_service ]
				),
				ARRAY_A
			);
		}

		if ( ! empty( $result ) ) {

			$payment_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_payments WHERE customerBookingId = %d',
					[ $result['id'] ]
				),
				ARRAY_A
			);

			$customer_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_users WHERE id = %d',
					[ $result['customerId'] ]
				),
				ARRAY_A
			);

			$service_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT name AS serviceName, description AS serviceDescription, categoryId FROM ' . $wpdb->prefix . 'amelia_services WHERE id = %d',
					[ $result['serviceId'] ]
				),
				ARRAY_A
			);

			$category_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT name AS categoryName FROM ' . $wpdb->prefix . 'amelia_categories WHERE id = %d',
					[ $service_result['categoryId'] ]
				),
				ARRAY_A
			);

			if ( $result['couponId'] ) {
				$coupon_result = $wpdb->get_row(
					$wpdb->prepare(
						'SELECT code AS couponCode, expirationDate AS couponExpirationDate FROM ' . $wpdb->prefix . 'amelia_coupons WHERE id = %d',
						[ $result['couponId'] ]
					),
					ARRAY_A
				);
			} else {
				$coupon_result = [];
			}

			if ( ! empty( $result['customFields'] ) ) {
				$custom_fields = json_decode( $result['customFields'], true );
				
				$fields_arr = [];
				foreach ( (array) $custom_fields as $fields ) {
					if ( is_array( $fields ) ) {
						$fields_arr[ $fields['label'] ] = $fields['value'];
					}
				}
				unset( $result['customFields'] );
			} else {
				$fields_arr = [];
			}

			$context['pluggable_data'] = array_merge( $result, $fields_arr, $payment_result, $customer_result, $service_result, $category_result, $coupon_result );
			$context['response_type']  = 'live';
		} else {

			$context = json_decode( '{"response_type":"sample","pluggable_data":{"id":"1","status":"visible","bookingStart":"2023-02-28 13:00:00","bookingEnd":"2023-02-28 14:00:00","notifyParticipants":"1","serviceId":"4","packageId":null,"providerId":"2","locationId":null,"internalNotes":"","googleCalendarEventId":null,"googleMeetUrl":null,"outlookCalendarEventId":null,"zoomMeeting":null,"lessonSpace":null,"parentId":null,"appointmentId":"1","customerId":"1","price":"15","persons":"1","couponId":null,"token":"02cf0988c6","info":"{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"1 (234) 789\",\"locale\":\"en_US\",\"timeZone\":\"Asia\\\/Kolkata\",\"urlParams\":null}","utcOffset":null,"aggregatedPrice":"1","packageCustomerServiceId":null,"duration":"3600","created":"2023-02-08 11:16:03","actionsCompleted":"1","Do You Know Automation?":"Yes","When Are You Coming?":"2023-04-20","Upload Something":"","Tell Us About You!":"Hey there!","customerBookingId":"103","amount":"0","dateTime":"2023-02-28 13:00:00","gateway":"onSite","gatewayTitle":"","data":"","packageCustomerId":null,"entity":"appointment","wcOrderId":null,"type":"customer","externalId":"89","firstName":"test","lastName":"test","email":"test@test.com","birthday":null,"phone":"1 (234) 789","gender":null,"note":null,"description":null,"pictureFullPath":null,"pictureThumbPath":null,"password":null,"usedTokens":null,"zoomUserId":null,"countryPhoneIso":"us","translations":"{\"defaultLanguage\":\"en_US\"}","timeZone":null,"serviceName":"demo service","serviceDescription":"","categoryId":"2","categoryName":"New Category1"}}', true );
		}

		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_amelia_new_event_attendee_triggers_last_data( $data ) {
		global $wpdb;

		$context = [];

		$event_selected = $data['filter']['amelia_events_list']['value'];

		if ( -1 === $event_selected ) {
			$result = $wpdb->get_row(
				'SELECT * 
				FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer 
				INNER JOIN ' . $wpdb->prefix . 'amelia_customer_bookings_to_events_periods as event_period 
				ON customer.id = event_period.customerBookingId 
				WHERE event_period.customerBookingId = ( Select max(customerBookingId) From ' . $wpdb->prefix . 'amelia_customer_bookings_to_events_periods )',
				ARRAY_A
			);
		} else {
			$result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * 
					FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer 
					INNER JOIN ' . $wpdb->prefix . 'amelia_customer_bookings_to_events_periods as event_period 
					ON customer.id = event_period.customerBookingId 
					WHERE event_period.customerBookingId = ( Select max(customerBookingId) From ' . $wpdb->prefix . 'amelia_customer_bookings_to_events_periods ) AND eventPeriodId = %d',
					[ $event_selected ]
				),
				ARRAY_A
			);
		}

		if ( ! empty( $result ) ) {

			$event = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_events WHERE id = %d',
					[ $result['eventPeriodId'] ]
				),
				ARRAY_A
			);

			$customer_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_users WHERE id = %d',
					[ $result['customerId'] ]
				),
				ARRAY_A
			);

			if ( $result['couponId'] ) {
				$coupon_result = $wpdb->get_row(
					$wpdb->prepare(
						'SELECT code AS couponCode, expirationDate AS couponExpirationDate FROM ' . $wpdb->prefix . 'amelia_coupons WHERE id = %d',
						[ $result['couponId'] ]
					),
					ARRAY_A
				);
			} else {
				$coupon_result = [];
			}

			if ( ! empty( $result['customFields'] ) ) {
				$custom_fields = json_decode( $result['customFields'], true );
				
				$fields_arr = [];
				foreach ( (array) $custom_fields as $fields ) {
					if ( is_array( $fields ) ) {
						$fields_arr[ $fields['label'] ] = $fields['value'];
					}
				}
				unset( $result['customFields'] );
			} else {
				$fields_arr = [];
			}

			$context['pluggable_data'] = array_merge( $result, $fields_arr, $event, $customer_result, $coupon_result );
			$context['response_type']  = 'live';
		} else {

			$context = json_decode( '{"response_type":"sample","pluggable_data":{""id":"1","appointmentId":null,"customerId":"1","status":"visible","price":"10","persons":"1","couponId":null,"token":"6485b07ce9","info":"{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"+213551223123\",\"locale\":\"en_US\",\"timeZone\":\"Asia\\\/Kolkata\",\"urlParams\":null}","utcOffset":null,"aggregatedPrice":"1","packageCustomerServiceId":null,"duration":null,"created":"2023-02-02 06:35:18","actionsCompleted":"1","Do You Know Automation?":"Yes","When Are You Coming?":"2023-04-20","Upload Something":"","Tell Us About You!":"Hey there!","customerBookingId":"105","eventPeriodId":"5","parentId":null,"name":"Testing Event 5","bookingOpens":null,"bookingCloses":"2023-02-09 08:00:00","bookingOpensRec":"same","bookingClosesRec":"same","ticketRangeRec":"calculate","recurringCycle":null,"recurringOrder":null,"recurringInterval":null,"recurringMonthly":null,"monthlyDate":null,"monthlyOnRepeat":null,"monthlyOnDay":null,"recurringUntil":null,"maxCapacity":"12","maxCustomCapacity":null,"maxExtraPeople":null,"locationId":null,"customLocation":"test","description":null,"color":"#1788FB","show":"1","notifyParticipants":"1","settings":"{\"payments\":{\"onSite\":true,\"payPal\":{\"enabled\":false},\"stripe\":{\"enabled\":false},\"mollie\":{\"enabled\":false},\"razorpay\":{\"enabled\":false}},\"general\":{\"minimumTimeRequirementPriorToCanceling\":null,\"redirectUrlAfterAppointment\":null},\"zoom\":{\"enabled\":false},\"lessonSpace\":{\"enabled\":false}}","zoomUserId":null,"bringingAnyone":"1","bookMultipleTimes":"1","translations":"{\"defaultLanguage\":\"en_US\"}","depositPayment":"disabled","depositPerPerson":"1","fullPayment":"0","deposit":"0","customPricing":"0","organizerId":"2","closeAfterMin":null,"closeAfterMinBookings":"0","type":"customer","externalId":"91","firstName":"test","lastName":"test","email":"test@test.com","birthday":null,"phone":"+213551223123","gender":null,"note":null,"pictureFullPath":null,"pictureThumbPath":null,"password":null,"usedTokens":null,"countryPhoneIso":"dz","timeZone":null}}', true );
		}

		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_amelia_appointment_rescheduled_triggers_last_data( $data ) {
		global $wpdb;

		$context = [];

		$appointment_category = $data['filter']['amelia_category_list']['value'];
		$appointment_service  = $data['filter']['amelia_service_list']['value'];

		if ( -1 === $appointment_service ) {
			// If service exists as per category selected.
			$service_exist = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT id, name, description FROM ' . $wpdb->prefix . 'amelia_services WHERE categoryId = %d',
					[ $appointment_category ]
				),
				ARRAY_A
			);

			if ( empty( $service_exist ) ) {
				$result = [];
			} else {
				$result = $wpdb->get_row(
					'SELECT appointments.*, customer.* FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer INNER JOIN ' . $wpdb->prefix . 'amelia_appointments as appointments ON customer.appointmentId=appointments.id WHERE customer.appointmentId = ( SELECT max(id) FROM ' . $wpdb->prefix . 'amelia_appointments )',
					ARRAY_A
				);
			}
		} else {
			$result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT appointments.*, customer.* FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer INNER JOIN ' . $wpdb->prefix . 'amelia_appointments as appointments ON customer.appointmentId=appointments.id WHERE customer.appointmentId = ( SELECT max(id) FROM ' . $wpdb->prefix . 'amelia_appointments ) AND appointments.serviceId = %d',
					[ $appointment_service ]
				),
				ARRAY_A
			);
		}

		if ( ! empty( $result ) ) {

			$payment_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_payments WHERE customerBookingId = %d',
					[ $result['id'] ]
				),
				ARRAY_A
			);

			$customer_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_users WHERE id = %d',
					[ $result['customerId'] ]
				),
				ARRAY_A
			);

			$service_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT name AS serviceName, description AS serviceDescription, categoryId FROM ' . $wpdb->prefix . 'amelia_services WHERE id = %d',
					[ $result['serviceId'] ]
				),
				ARRAY_A
			);

			$category_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT name AS categoryName FROM ' . $wpdb->prefix . 'amelia_categories WHERE id = %d',
					[ $service_result['categoryId'] ]
				),
				ARRAY_A
			);

			if ( $result['couponId'] ) {
				$coupon_result = $wpdb->get_row(
					$wpdb->prepare(
						'SELECT code AS couponCode, expirationDate AS couponExpirationDate FROM ' . $wpdb->prefix . 'amelia_coupons WHERE id = %d',
						[ $result['couponId'] ]
					),
					ARRAY_A
				);
			} else {
				$coupon_result = [];
			}

			if ( ! empty( $result['customFields'] ) ) {
				$custom_fields = json_decode( $result['customFields'], true );
				
				$fields_arr = [];
				foreach ( (array) $custom_fields as $fields ) {
					if ( is_array( $fields ) ) {
						$fields_arr[ $fields['label'] ] = $fields['value'];
					}
				}
				unset( $result['customFields'] );
			} else {
				$fields_arr = [];
			}

			$appointment_data['isRescheduled'] = '1';
			$context['pluggable_data']         = array_merge( $result, $fields_arr, $appointment_data, $payment_result, $customer_result, $service_result, $category_result, $coupon_result );
			$context['response_type']          = 'live';
		} else {

			$context = json_decode( '{"response_type":"sample","pluggable_data":{"id":"1","status":"visible","bookingStart":"2023-02-28 15:30:00","bookingEnd":"2023-02-28 16:30:00","notifyParticipants":"1","serviceId":"4","packageId":null,"providerId":"2","locationId":null,"internalNotes":"","googleCalendarEventId":null,"googleMeetUrl":null,"outlookCalendarEventId":null,"zoomMeeting":null,"lessonSpace":null,"parentId":null,"appointmentId":"54","customerId":"1","price":"15","persons":"1","couponId":null,"token":"02cf0988c6","info":"{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"1 (234) 789\",\"locale\":\"en_US\",\"timeZone\":\"Asia\\\/Kolkata\",\"urlParams\":null}","utcOffset":null,"aggregatedPrice":"1","packageCustomerServiceId":null,"duration":"3600","created":"2023-02-08 11:16:03","actionsCompleted":"1","Do You Know Automation?":"Yes","When Are You Coming?":"2023-04-20","Upload Something":"","Tell Us About You!":"Hey there!","isRescheduled":"1","customerBookingId":"103","amount":"0","dateTime":"2023-02-28 15:30:00","gateway":"onSite","gatewayTitle":"","data":"","packageCustomerId":null,"entity":"appointment","wcOrderId":null,"type":"customer","externalId":"89","firstName":"test","lastName":"test","email":"test@test.com","birthday":null,"phone":"1 (234) 789","gender":null,"note":null,"description":null,"pictureFullPath":null,"pictureThumbPath":null,"password":null,"usedTokens":null,"zoomUserId":null,"countryPhoneIso":"us","translations":"{\"defaultLanguage\":\"en_US\"}","timeZone":null,"serviceName":"demo service","serviceDescription":"","categoryId":"2","categoryName":"New Category1"}}', true );
		}

		return $context;
	}


	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_amelia_appointment_cancelled_triggers_last_data( $data ) {
		global $wpdb;

		$context = [];

		$appointment_category = $data['filter']['amelia_category_list']['value'];
		$appointment_service  = $data['filter']['amelia_service_list']['value'];

		if ( -1 === $appointment_service ) {
			// If service exists as per category selected.
			$service_exist = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT id, name, description FROM ' . $wpdb->prefix . 'amelia_services WHERE categoryId = %d',
					[ $appointment_category ]
				),
				ARRAY_A
			);

			if ( empty( $service_exist ) ) {
				$result = [];
			} else {
				$result = $wpdb->get_row(
					$wpdb->prepare(
						'SELECT appointments.*, customer.* FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer INNER JOIN ' . $wpdb->prefix . 'amelia_appointments as appointments ON customer.appointmentId=appointments.id WHERE appointments.status = %s order by RAND() DESC LIMIT 1',
						[ 'canceled' ]
					),
					ARRAY_A
				);
			}
		} else {
			$result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT appointments.*, customer.* FROM ' . $wpdb->prefix . 'amelia_customer_bookings as customer INNER JOIN ' . $wpdb->prefix . 'amelia_appointments as appointments ON customer.appointmentId=appointments.id WHERE appointments.status = %s AND appointments.serviceId = %d order by RAND() DESC LIMIT 1',
					[ 'canceled', $appointment_service ]
				),
				ARRAY_A
			);
		}

		if ( ! empty( $result ) ) {

			$payment_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_payments WHERE customerBookingId = %d',
					[ $result['id'] ]
				),
				ARRAY_A
			);

			$customer_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT * FROM ' . $wpdb->prefix . 'amelia_users WHERE id = %d',
					[ $result['customerId'] ]
				),
				ARRAY_A
			);

			$service_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT name AS serviceName, description AS serviceDescription, categoryId FROM ' . $wpdb->prefix . 'amelia_services WHERE id = %d',
					[ $result['serviceId'] ]
				),
				ARRAY_A
			);

			$category_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT name AS categoryName FROM ' . $wpdb->prefix . 'amelia_categories WHERE id = %d',
					[ $service_result['categoryId'] ]
				),
				ARRAY_A
			);

			if ( $result['couponId'] ) {
				$coupon_result = $wpdb->get_row(
					$wpdb->prepare(
						'SELECT code AS couponCode, expirationDate AS couponExpirationDate FROM ' . $wpdb->prefix . 'amelia_coupons WHERE id = %d',
						[ $result['couponId'] ]
					),
					ARRAY_A
				);
			} else {
				$coupon_result = [];
			}

			if ( ! empty( $result['customFields'] ) ) {
				$custom_fields = json_decode( $result['customFields'], true );
				
				$fields_arr = [];
				foreach ( (array) $custom_fields as $fields ) {
					if ( is_array( $fields ) ) {
						$fields_arr[ $fields['label'] ] = $fields['value'];
					}
				}
				unset( $result['customFields'] );
			} else {
				$fields_arr = [];
			}

			$context['pluggable_data'] = array_merge( $result, $fields_arr, $payment_result, $customer_result, $service_result, $category_result, $coupon_result );
			$context['response_type']  = 'live';
		} else {

			$context = json_decode( '{"response_type":"sample","pluggable_data":{"id":"1","status":"visible","bookingStart":"2023-02-28 15:30:00","bookingEnd":"2023-02-28 16:30:00","notifyParticipants":"1","serviceId":"4","packageId":null,"providerId":"2","locationId":null,"internalNotes":"","googleCalendarEventId":null,"googleMeetUrl":null,"outlookCalendarEventId":null,"zoomMeeting":null,"lessonSpace":null,"parentId":null,"appointmentId":"54","customerId":"1","price":"15","persons":"1","couponId":null,"token":"02cf0988c6","info":"{\"firstName\":\"test\",\"lastName\":\"test\",\"phone\":\"1 (234) 789\",\"locale\":\"en_US\",\"timeZone\":\"Asia\\\/Kolkata\",\"urlParams\":null}","utcOffset":null,"aggregatedPrice":"1","packageCustomerServiceId":null,"duration":"3600","created":"2023-02-08 11:16:03","actionsCompleted":"1","Do You Know Automation?":"Yes","When Are You Coming?":"2023-04-20","Upload Something":"","Tell Us About You!":"Hey there!","customerBookingId":"103","amount":"0","dateTime":"2023-02-28 15:30:00","gateway":"onSite","gatewayTitle":"","data":"","packageCustomerId":null,"entity":"appointment","wcOrderId":null,"type":"customer","externalId":"89","firstName":"test","lastName":"test","email":"test@test.com","birthday":null,"phone":"1 (234) 789","gender":null,"note":null,"description":null,"pictureFullPath":null,"pictureThumbPath":null,"password":null,"usedTokens":null,"zoomUserId":null,"countryPhoneIso":"us","translations":"{\"defaultLanguage\":\"en_US\"}","timeZone":null,"serviceName":"demo service","serviceDescription":"","categoryId":"2","categoryName":"New Category1"}}', true );
		}

		return $context;
	}

	/**
	 * Get MailPoet Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_mailpoet_forms( $data ) {
		if ( ! class_exists( '\MailPoet\API\API' ) ) {
			return;
		}

		global $wpdb;

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$forms = $wpdb->get_results(
			$wpdb->prepare(
				'SELECT SQL_CALC_FOUND_ROWS * FROM ' . $wpdb->prefix . 'mailpoet_forms WHERE `deleted_at` IS NULL AND `status` = %s ORDER BY id LIMIT %d OFFSET %d',
				[ 'enabled', $limit, $offset ]
			)
		);

		$form_count = $wpdb->get_var( 'SELECT FOUND_ROWS();' );

		$options = [];

		if ( ! empty( $forms ) ) {
			if ( is_array( $forms ) ) {
				foreach ( $forms as $form ) {
					$options[] = [
						'label' => $form->name,
						'value' => $form->id,
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => $form_count > $limit && $form_count > $offset,
		];

	}

	/**
	 * Get MailPoet List.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_mailpoet_list( $data ) {
		if ( ! class_exists( '\MailPoet\API\API' ) ) {
			return;
		}

		$mailpoet = \MailPoet\API\API::MP( 'v1' );
		$lists    = $mailpoet->getLists();

		$options = [];

		if ( ! empty( $lists ) ) {
			if ( is_array( $lists ) ) {
				foreach ( $lists as $list ) {
					$options[] = [
						'label' => $list['name'],
						'value' => $list['id'],
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get MailPoet Subscriber Status.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_mailpoet_subscriber_status( $data ) {
		if ( ! class_exists( '\MailPoet\API\API' ) ) {
			return;
		}

		$subscriber_status = [
			'subscribed'   => 'Subscribed',
			'unconfirmed'  => 'Unconfirmed',
			'unsubscribed' => 'Unsubscribed',
			'inactive'     => 'Inactive',
			'bounced'      => 'Bounced',
		];

		$options = [];
		foreach ( $subscriber_status as $key => $status ) {
			$options[] = [
				'label' => $status,
				'value' => $key,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get MailPoet Subscribers.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_mailpoet_subscribers( $data ) {
		if ( ! class_exists( '\MailPoet\API\API' ) ) {
			return;
		}

		global $wpdb;

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$subscribers = $wpdb->get_results(
			$wpdb->prepare(
				'SELECT SQL_CALC_FOUND_ROWS id,email FROM ' . $wpdb->prefix . 'mailpoet_subscribers ORDER BY id DESC LIMIT %d OFFSET %d',
				[ $limit, $offset ]
			)
		);

		$subscribers_count = $wpdb->get_var( 'SELECT FOUND_ROWS();' );

		$options = [];

		if ( ! empty( $subscribers ) ) {
			if ( is_array( $subscribers ) ) {
				foreach ( $subscribers as $subscriber ) {
					$options[] = [
						'label' => $subscriber->email,
						'value' => $subscriber->id,
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => $subscribers_count > $limit && $subscribers_count > $offset,
		];
	}

	/**
	 * Get ConvertPro Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_convertpro_form_list( $data ) {
		if ( ! class_exists( '\Cp_V2_Loader' ) ) {
			return;
		}

		$cp_popups_inst = CP_V2_Popups::get_instance();
		$popups         = $cp_popups_inst->get_all();

		$form_count = count( $popups );

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$options = [];

		if ( ! empty( $popups ) ) {
			if ( is_array( $popups ) ) {
				foreach ( $popups as $form ) {
					$options[] = [
						'label' => $form->post_title,
						'value' => $form->ID,
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => $form_count > $limit && $form_count > $offset,
		];

	}

	/**
	 * Get ProjectHuddle Websites.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_project_huddle_websites( $data ) {

		$sites = new WP_Query(
			[
				'post_type'      => 'ph-website',
				'posts_per_page' => - 1,
				'fields'         => 'ids',
			]
		);

		$site_ids = (array) $sites->posts;

		$options = [];
		if ( ! empty( $site_ids ) ) {
			if ( is_array( $site_ids ) ) {
				foreach ( $site_ids as $site_id ) {
					$options[] = [
						'label' => get_the_title( $site_id ),
						'value' => $site_id,
					];
				}
			}
		}
		return [
			'options' => $options,
			'hasMore' => false,
		];

	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return mixed
	 */
	public function search_project_huddle_comment_triggers_last_data( $data ) {
		global $wpdb;

		$context = [];

		if ( -1 !== $data['dynamic'] ) {
			$threads = get_posts(
				[
					'post_type'      => 'phw_comment_loc',
					'posts_per_page' => 1,
					'meta_value'     => $data['dynamic'],
					'meta_key'       => 'project_id',
					'orderby'        => 'asc',
				]
			);
		} else {
			$threads = [];
		}

		if ( ! empty( $threads ) ) {
			$comment_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT  ' . $wpdb->prefix . 'comments.comment_ID
					FROM ' . $wpdb->prefix . 'comments 
					WHERE ( ( comment_approved = "0" OR comment_approved = "1" ) ) AND comment_type IN ("ph_comment") AND comment_post_ID = %d
					ORDER BY ' . $wpdb->prefix . 'comments.comment_date_gmt DESC
					LIMIT 0,1',
					$threads[0]->ID
				),
				ARRAY_A
			);

			if ( ! empty( $comment_result ) ) {
				$comment_id                  = get_comment( $comment_result['comment_ID'], ARRAY_A ); 
				$comments['comment_ID']      = isset( $comment_id['comment_ID'] ) ? $comment_id['comment_ID'] : '';
				$comments['comment_post_ID'] = isset( $comment_id['comment_post_ID'] ) ? $comment_id['comment_post_ID'] : '';

				$comments['comment_author'] = isset( $comment_id['comment_author'] ) ? $comment_id['comment_author'] : '';

				$comments['comment_author_email'] = isset( $comment_id['comment_author_email'] ) ? $comment_id['comment_author_email'] : '';

				$comments['comment_date'] = isset( $comment_id['comment_date'] ) ? $comment_id['comment_date'] : '';

				$comments['comment_content'] = isset( $comment_id['comment_content'] ) ? $comment_id['comment_content'] : '';

				$comments['comment_type'] = isset( $comment_id['comment_type'] ) ? $comment_id['comment_type'] : '';

				$context['pluggable_data'] = $comments;
				$context['response_type']  = 'live';
			} else {
				$context = json_decode( '{"response_type":"sample","pluggable_data":{"comment_ID":"1","comment_post_ID":"1","comment_author":"test","comment_author_email":"test@test.com","comment_date":"2023-03-27 13:44:26","comment_content":"<p>Leave comment<\/p>","comment_type":"ph_comment"}}', true );
			}
		} else {
			$context = json_decode( '{"response_type":"sample","pluggable_data":{"comment_ID":"1","comment_post_ID":"1","comment_author":"test","comment_author_email":"test@test.com","comment_date":"2023-03-27 13:44:26","comment_content":"<p>Leave comment<\/p>","comment_type":"ph_comment"}}', true );
		}

		return $context;
	}

	/**
	 * Get last data for trigger.
	 *
	 * @param array $data data.
	 * @return mixed
	 */
	public function search_project_huddle_resolved_comment_triggers_last_data( $data ) {
		global $wpdb;

		$context = [];

		$get_comments = $wpdb->get_row(
			'SELECT  ' . $wpdb->prefix . 'comments.comment_ID, ' . $wpdb->prefix . 'comments.comment_content
			FROM ' . $wpdb->prefix . 'comments 
			WHERE ( ( comment_approved = "0" OR comment_approved = "1" ) ) AND comment_type IN ("ph_status") AND comment_content = "Resolved"
			ORDER BY ' . $wpdb->prefix . 'comments.comment_date_gmt DESC
			LIMIT 0,1'
		);

		if ( ! empty( $get_comments ) ) {
			$comment_id     = get_comment( $get_comments->comment_ID, ARRAY_A ); 
			$comment_result = $wpdb->get_row(
				$wpdb->prepare(
					'SELECT  ' . $wpdb->prefix . 'comments.comment_ID
					FROM ' . $wpdb->prefix . 'comments 
					WHERE ( ( comment_approved = "0" OR comment_approved = "1" ) ) AND comment_type IN ("ph_comment") AND comment_post_ID = %d
					ORDER BY ' . $wpdb->prefix . 'comments.comment_date_gmt DESC
					LIMIT 0,1',
					isset( $comment_id['comment_post_ID'] ) ? $comment_id['comment_post_ID'] : ''
				),
				ARRAY_A
			);
			
			$actual_comment                   = get_comment( $comment_result['comment_ID'], ARRAY_A );  
			$comments['comment_ID']           = isset( $actual_comment['comment_ID'] ) ? $actual_comment['comment_ID'] : '';
			$comments['comment_post_ID']      = isset( $actual_comment['comment_post_ID'] ) ? $actual_comment['comment_post_ID'] : '';
			$comments['comment_author']       = isset( $actual_comment['comment_author'] ) ? $actual_comment['comment_author'] : '';
			$comments['comment_author_email'] = isset( $actual_comment['comment_author_email'] ) ? $actual_comment['comment_author_email'] : '';
			$comments['comment_date']         = isset( $actual_comment['comment_date'] ) ? $actual_comment['comment_date'] : '';
			$comments['comment_content']      = isset( $actual_comment['comment_content'] ) ? $actual_comment['comment_content'] : '';
			$comments['comment_type']         = isset( $actual_comment['comment_type'] ) ? $actual_comment['comment_type'] : '';
			$comments['comment_status']       = $get_comments->comment_content;
			$context['pluggable_data']        = $comments;
			$context['response_type']         = 'live';
		} else {
			$context = json_decode( '{"response_type":"sample","pluggable_data":{"comment_ID":"1","comment_post_ID":"1","comment_author":"test","comment_author_email":"test@test.com","comment_date":"2023-03-27 13:44:26","comment_content":"<p>Leave comment<\/p>","comment_type":"ph_comment","comment_status":"Resolved"}}', true );
		}

		return $context;
	}

	/**
	 * Get MasterStudy LMS Courses.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_ms_lms_courses( $data ) {

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$args = [
			'post_type'      => 'stm-courses',
			'posts_per_page' => $limit,
			'offset'         => $offset,
			'orderby'        => 'title',
			'order'          => 'ASC',
			'post_status'    => 'publish',
		];

		$courses = get_posts( $args );

		$course_count = count( $courses );

		$options = [];
		if ( ! empty( $courses ) ) {
			if ( is_array( $courses ) ) {
				foreach ( $courses as $course ) {
					$options[] = [
						'label' => $course->post_title,
						'value' => $course->ID,
					];
				}
			}
		}
		return [
			'options' => $options,
			'hasMore' => $course_count > $limit && $course_count > $offset,
		];

	}

	/**
	 * Get MasterStudy LMS Lessons.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_ms_lms_lessons( $data ) {

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$args = [
			'post_type'      => 'stm-lessons',
			'posts_per_page' => $limit,
			'offset'         => $offset,
			'orderby'        => 'title',
			'order'          => 'ASC',
			'post_status'    => 'publish',
		];

		$lessons = get_posts( $args );

		$lessons_count = count( $lessons );

		$options = [];
		if ( ! empty( $lessons ) ) {
			if ( is_array( $lessons ) ) {
				foreach ( $lessons as $lesson ) {
					$options[] = [
						'label' => $lesson->post_title,
						'value' => $lesson->ID,
					];
				}
			}
		}
		return [
			'options' => $options,
			'hasMore' => $lessons_count > $limit && $lessons_count > $offset,
		];

	}

	/**
	 * Search MasterStudy LMS data.
	 *
	 * @param array $data data.
	 * @return array|void
	 */
	public function search_ms_lms_last_data( $data ) {
		global $wpdb;
		$post_type = $data['post_type'];
		$trigger   = $data['search_term'];
		$context   = [];
		
		if ( 'stm_lms_course_completed' === $trigger ) {
			$post_id = $data['filter']['course']['value'];
			if ( -1 === $post_id ) {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}stm_lms_user_courses as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.course_id WHERE postmeta.progress_percent=100 AND posts.post_type=%s order by postmeta.user_course_id DESC LIMIT 1", $post_type ) );
			} else {
				$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}stm_lms_user_courses as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.course_id WHERE postmeta.course_id = %s AND postmeta.progress_percent=100 AND posts.post_type=%s order by postmeta.user_course_id DESC LIMIT 1", $post_id, $post_type ) );
			}
		} elseif ( 'stm_lesson_passed' === $trigger ) {
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}stm_lms_user_lessons as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.lesson_id WHERE posts.post_type=%s order by postmeta.user_lesson_id DESC LIMIT 1", $post_type ) );
		} elseif ( 'stm_quiz_passed' === $trigger ) {
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}stm_lms_user_quizzes as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.quiz_id WHERE postmeta.status='passed' AND posts.post_type=%s order by postmeta.user_quiz_id DESC LIMIT 1", $post_type ) );
		} elseif ( 'stm_quiz_failed' === $trigger ) {
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}stm_lms_user_quizzes as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.quiz_id WHERE postmeta.status='failed' AND posts.post_type=%s order by postmeta.user_quiz_id DESC LIMIT 1", $post_type ) );
		} elseif ( 'stm_lms_user_enroll_course' === $trigger ) {
			$result = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}stm_lms_user_courses as postmeta JOIN {$wpdb->prefix}posts as posts ON posts.ID=postmeta.course_id WHERE postmeta.status='enrolled' AND posts.post_type=%s order by postmeta.user_course_id DESC LIMIT 1", $post_type ) );
		}

		if ( ! empty( $result ) ) {

			switch ( $trigger ) {
				case 'stm_lms_course_completed':
					$result_course_id = $result[0]->course_id;
					$result_user_id   = $result[0]->user_id;
					$course           = get_the_title( $result_course_id );
					$course_link      = get_the_permalink( $result_course_id );
					$featured_image   = get_the_post_thumbnail_url( $result_course_id );

					$data         = [
						'course_id'             => $result_course_id,
						'course_title'          => $course,
						'course_link'           => $course_link,
						'course_featured_image' => $featured_image,
						'course_progress'       => $result[0]->progress_percent,
					];
					$context_data = array_merge(
						WordPress::get_user_context( $result_user_id ),
						$data
					);
					break;
				case 'stm_lesson_passed':
					$result_lesson_id = $result[0]->lesson_id;
					$result_user_id   = $result[0]->user_id;
					$lesson           = get_the_title( $result_lesson_id );
					$lesson_link      = get_the_permalink( $result_lesson_id );

					$data         = [
						'lesson_id'    => $result_lesson_id,
						'lesson_title' => $lesson,
						'lesson_link'  => $lesson_link,
					];
					$context_data = array_merge(
						WordPress::get_user_context( $result_user_id ),
						$data
					);
					break;
				case 'stm_quiz_passed':
					$result_quiz_id = $result[0]->quiz_id;
					$result_user_id = $result[0]->user_id;
					$quiz_title     = get_the_title( $result_quiz_id );
					$quiz_link      = get_the_permalink( $result_quiz_id );

					$data         = [
						'quiz_id'    => $result_quiz_id,
						'quiz_title' => $quiz_title,
						'quiz_link'  => $quiz_link,
						'quiz_score' => $result[0]->progress,
						'result'     => 'passed',
					];
					$context_data = array_merge(
						WordPress::get_user_context( $result_user_id ),
						$data
					);
					break;
				case 'stm_quiz_failed':
					$result_quiz_id = $result[0]->quiz_id;
					$result_user_id = $result[0]->user_id;
					$quiz_title     = get_the_title( $result_quiz_id );
					$quiz_link      = get_the_permalink( $result_quiz_id );

					$data         = [
						'quiz_id'    => $result_quiz_id,
						'quiz_title' => $quiz_title,
						'quiz_link'  => $quiz_link,
						'quiz_score' => $result[0]->progress,
						'result'     => 'failed',
					];
					$context_data = array_merge(
						WordPress::get_user_context( $result_user_id ),
						$data
					);
					break;
				case 'stm_lms_user_enroll_course':
					$result_course_id = $result[0]->course_id;
					$result_user_id   = $result[0]->user_id;
					
					$course         = get_the_title( $result_course_id );
					$course_link    = get_the_permalink( $result_course_id );
					$featured_image = get_the_post_thumbnail_url( $result_course_id );

					$data         = [
						'course_id'             => $result_course_id,
						'course_title'          => $course,
						'course_link'           => $course_link,
						'course_featured_image' => $featured_image,
					];
					$context_data = array_merge(
						WordPress::get_user_context( $result_user_id ),
						$data
					);
					break;
				default:
					return;
			}
			$context['pluggable_data'] = $context_data;
			$context['response_type']  = 'live';
		}

		return $context;

	}

	/**
	 * Prepare Ultimate Member user_roles.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_um_user_roles( $data ) {
		if ( function_exists( 'get_editable_roles' ) ) {
			$roles = get_editable_roles();
		} else {
			$roles = wp_roles()->roles;
			$roles = apply_filters( 'editable_roles', $roles );
		}

		$options = [];
		foreach ( $roles as $role => $details ) {

			$options[] = [
				'label' => $details['name'],
				'value' => $role,
			];

		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Prepare Ultimate Member forms_list.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_um_forms_list( $data ) {

		$page   = $data['page'];
		$limit  = Utilities::get_search_page_limit();
		$offset = $limit * ( $page - 1 );

		$args = [
			'posts_per_page' => $limit,
			'offset'         => $offset,
			'orderby'        => 'title',
			'order'          => 'ASC',
			'post_type'      => 'um_form',
			'post_status'    => 'publish',
			'fields'         => 'ids',
		];

		$forms_list = get_posts( $args );

		$forms_list_count = count( $forms_list );

		$options = [];
		if ( ! empty( $forms_list ) ) {
			foreach ( $forms_list as $form ) {
				$options[] = [
					'label' => get_the_title( $form ),
					'value' => $form,
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => $forms_list_count > $limit && $forms_list_count > $offset,
		];
	}

	/**
	 * Get last data for Ultimate Member Login trigger.
	 *
	 * @param array $data data.
	 * @return mixed
	 */
	public function search_ultimate_member_user_logsin( $data ) {
		$context = [];
		$args    = [
			'orderby'  => 'meta_value',
			'meta_key' => '_um_last_login',
			'order'    => 'DESC',
			'number'   => 1,
		];
		$users   = get_users( $args );

		if ( ! empty( $users ) ) {
			$user                      = $users[0];
			$pluggable_data            = WordPress::get_user_context( $user->ID );
			$context['pluggable_data'] = $pluggable_data;
			$context['response_type']  = 'live';
		} else {
			$role                      = 'subscriber';
			$context['pluggable_data'] = [
				'wp_user_id'     => 1,
				'user_login'     => 'test',
				'display_name'   => 'Test User',
				'user_firstname' => 'Test',
				'user_lastname'  => 'User',
				'user_email'     => 'testuser@gmail.com',
				'user_role'      => [ $role ],
			];
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * Get last data for Ultimate Member Register trigger.
	 *
	 * @param array $data data.
	 * @return mixed
	 */
	public function search_ultimate_member_user_registers( $data ) {
		$context = [];
		$args    = [
			'orderby'  => 'meta_value',
			'meta_key' => 'um_user_profile_url_slug_user_login',
			'order'    => 'DESC',
			'number'   => 1,
		];
		$users   = get_users( $args );

		if ( ! empty( $users ) ) {
			$user                      = $users[0];
			$pluggable_data            = WordPress::get_user_context( $user->ID );
			$context['pluggable_data'] = $pluggable_data;
			$context['response_type']  = 'live';
		} else {
			$role                      = 'subscriber';
			$context['pluggable_data'] = [
				'wp_user_id'     => 1,
				'user_login'     => 'test',
				'display_name'   => 'Test User',
				'user_firstname' => 'Test',
				'user_lastname'  => 'User',
				'user_email'     => 'testuser@gmail.com',
				'user_role'      => [ $role ],
			];
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * Get last data for Ultimate Member Register trigger.
	 *
	 * @param array $data data.
	 * @return mixed
	 */
	public function search_ultimate_member_user_inactive( $data ) {
		$context = [];
		$args    = [
			'orderby'    => 'user_id',
			'meta_key'   => 'account_status',
			'meta_value' => 'inactive',
			'order'      => 'ASC',
			'number'     => 1,
		];
		$users   = get_users( $args );

		if ( ! empty( $users ) ) {
			$user                                  = $users[0];
			$pluggable_data                        = [];
			$pluggable_data[]                      = WordPress::get_user_context( $user->ID );
			$pluggable_data['user_account_status'] = 'inactive';
			$context['pluggable_data']             = $pluggable_data;
			$context['response_type']              = 'live';
		} else {
			$role                      = 'subscriber';
			$context['pluggable_data'] = [
				'wp_user_id'          => 1,
				'user_login'          => 'test',
				'display_name'        => 'Test User',
				'user_firstname'      => 'Test',
				'user_lastname'       => 'User',
				'user_email'          => 'testuser@gmail.com',
				'user_role'           => [ $role ],
				'user_account_status' => 'inactive',
			];
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * Get last data for Ultimate Member Change Role trigger.
	 *
	 * @param array $data data.
	 * @return mixed
	 */
	public function search_ultimate_member_user_role_change( $data ) {
		$context = [];
		
		$role = $data['filter']['role']['value'];
		
		$args  = [
			'number' => 1,
			'role'   => $role,
		];
		$users = get_users( $args );
		shuffle( $users );
		if ( ! empty( $users ) ) {
			$user                      = $users[0];
			$pluggable_data            = WordPress::get_user_context( $user->ID );
			$context['pluggable_data'] = $pluggable_data;
			$context['response_type']  = 'live';
		} else {
			$role                      = isset( $args['role'] ) ? $args['role'] : 'subscriber';
			$context['pluggable_data'] = [
				'wp_user_id'          => 1,
				'user_login'          => 'test',
				'display_name'        => 'Test User',
				'user_firstname'      => 'Test',
				'user_lastname'       => 'User',
				'user_email'          => 'testuser@gmail.com',
				'user_role'           => [ $role ],
				'user_account_status' => 'inactive',
			];
			$context['response_type']  = 'sample';
		}
		return $context;
	}

	/**
	 * Get JetEngine WP Posttypes.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_je_posttype_list( $data ) {

		$post_types = get_post_types( [ 'public' => true ], 'object' );
		$post_types = apply_filters( 'suretriggers_post_types', $post_types );
		if ( isset( $post_types['attachment'] ) ) {
			unset( $post_types['attachment'] );
		}

		$options = [];
		foreach ( $post_types as $post_type => $details ) {
			$options[] = [
				'label' => $details->label,
				'value' => $post_type,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get JetEngine WP fields.
	 *
	 * @param array $data data.
	 *
	 * @return array
	 */
	public function search_je_field_list( $data ) {

		$post_type = $data['dynamic'];

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

		$post_fields_count = count( $post_fields );

		$options = [];
		if ( ! empty( $post_fields ) ) {
			if ( is_array( $post_fields ) ) {
				foreach ( $post_fields as $post_field ) {
					if ( in_array( $post_type, $post_field['args']['allowed_post_type'], true ) ) {
						foreach ( $post_field['meta_fields']  as $meta_field ) {
							$options[] = [
								'label' => $meta_field['title'],
								'value' => $meta_field['name'],
							];
						}
					}
				}
			}
		}
		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Search Last Updated Field Data.
	 *
	 * @param array $data data.
	 * @return array
	 */
	public function search_jet_engine_field_data( $data ) {
		global $wpdb;

		$context = [];

		$string = '%' . $data['filter']['field_id']['value'] . '%';

		$result = $wpdb->get_results(
			$wpdb->prepare(
				'SELECT post_id FROM ' . $wpdb->prefix . 'postmeta WHERE meta_key LIKE %s',
				[ $string ]
			),
			ARRAY_A
		);

		$ids = [];

		if ( ! empty( $result ) ) {
			foreach ( $result as $val ) {
				$ids[] = $val['post_id'];
			}
		}
		
		$lastupdated_args = [
			'orderby'        => 'modified',
			'post__in'       => $ids,
			'posts_per_page' => 1,
		];
		$lastupdated_loop = get_posts( $lastupdated_args );

		$response = [];
		if ( ! empty( $result ) ) {
			$context['post'] = $lastupdated_loop[0];
			
			$meta_value = get_post_meta( $lastupdated_loop[0]->ID, sprintf( '%s', $data['filter']['field_id']['value'] ), true );
			$meta_key   = sprintf( '%s', $data['filter']['field_id']['value'] );

			$context[ $meta_key ] = $meta_value;          

			$response['pluggable_data'] = $context;
			$response['response_type']  = 'live';
		}
		
		return $response;

	}

	/**
	 * Get Formidable Forms.
	 *
	 * @param array $data data.
	 *
	 * @return array|void
	 */
	public function search_formidable_form_list( $data ) {
		if ( ! class_exists( 'FrmForm' ) ) {
			return;
		}

		$query                = [
			[
				'or'               => 1,
				'parent_form_id'   => null,
				'parent_form_id <' => 1,
			],
		];
		$query['is_template'] = 0;
		$query['status !']    = 'trash';
		$forms_list           = FrmForm::getAll( $query, '', ' 0, 10' );

		$options = [];

		if ( ! empty( $forms_list ) ) {
			if ( is_array( $forms_list ) ) {
				foreach ( $forms_list as $form ) {
					$options[] = [
						'label' => $form->name,
						'value' => $form->id,
					];
				}
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get JetFormBuilder Form List.
	 *
	 * @param array $data data.
	 *
	 * @return array|void
	 */
	public function search_jetform_list( $data ) {
		if ( ! class_exists( '\Jet_Form_Builder\Classes\Tools' ) ) {
			return;
		}

		$forms = \Jet_Form_Builder\Classes\Tools::get_forms_list_for_js();

		$options = [];
		foreach ( $forms as $form ) {

			if ( ! empty( $form['value'] ) ) {
				$options[] = [
					'label' => esc_html( $form['label'] ),
					'value' => esc_attr( $form['value'] ),
				];
			}
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

	/**
	 * Get Forminator Form List.
	 *
	 * @param array $data data.
	 *
	 * @return array|void
	 */
	public function search_forminator_form_list( $data ) {
		if ( ! class_exists( 'Forminator_API' ) ) {
			return;
		}

		$forms = Forminator_API::get_forms( null, 1, 10 );

		$options = [];
		foreach ( $forms as $form ) {
			$options[] = [
				'label' => isset( $form->settings ) && isset( $form->settings['form_name'] ) ? $form->settings['form_name'] : $form->name,
				'value' => $form->id,
			];
		}

		return [
			'options' => $options,
			'hasMore' => false,
		];
	}

}

GlobalSearchController::get_instance();
