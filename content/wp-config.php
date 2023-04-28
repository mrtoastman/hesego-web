<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'hesego-wp' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '4mHDDOFw2Y844D' );

/** Database hostname */
define( 'DB_HOST', 'db' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'FD! 15)N0xXYfOFF0K,0VIRj]:u%QXt1Hex^B.r~qHmKeBX0ilGes)jW;q/GqDoY' );
define( 'SECURE_AUTH_KEY',  'D9%tg*9|KPBhD%~uy{O&)Z1N/e~b*LvUxr|nVL[wAA%tO)g0*m#ZImLT:fBpNe9o' );
define( 'LOGGED_IN_KEY',    'Os-~P6mY@58~YX&oQF)+rL?{m}NC~&3W:0)gQLp}_;&/cO3SfnCSBSTYQG]kwbc!' );
define( 'NONCE_KEY',        '1R~RfBqo^O;}v1}(@@@=ZiO:[OqWu`xXIRo6vdxK~<[M1%lzbN1yIuKg[^K=b~,K' );
define( 'AUTH_SALT',        'OuTAcD9gKC8m)(h*!W)YSb]Xj2wmAA#%0,E2AN^a<x%`ajf:EF)R.xws67[J9p-w' );
define( 'SECURE_AUTH_SALT', 'f)./^nz$>~J>*?@_V# _=;PB>~PqHt*{P]XRBO?l<;&2kOl_wA{{TwK7-%Yn,h?e' );
define( 'LOGGED_IN_SALT',   'uD!)6_zU;;:EN7B|j6NdDwl-j3MeKSpLNC13WPO..e~F]Bl+:SLG;[92=Uc@i]d;' );
define( 'NONCE_SALT',       'DBh$#?c$<`BehQ}(#bw<k+$eBgB5cDKB;FVe3Fn6-|P&fc%_Dj1=VlxZbhe)4`N$' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */
define( 'FS_METHOD', 'direct' );




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
