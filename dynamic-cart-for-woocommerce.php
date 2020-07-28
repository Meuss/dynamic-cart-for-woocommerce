<?php
require_once('dynamic-cart-for-woocommerce.php');
/*
  Plugin Name: Dynamic Cart For WooCommerce
  description: Plugin for 925
  Author: Thomas Miller
  Author URI: https://thomasmiller.ch
*/

// load my vue stuff
function load_vue_scripts()
{
  wp_register_script('vuejs_1', plugin_dir_url(__FILE__) . '/dist/js/app.js', false);
  wp_register_script('vuejs_2', plugin_dir_url(__FILE__) . '/dist/js/chunk-vendors.js', false);
  wp_enqueue_style('vue_styles', plugin_dir_url(__FILE__) . '/dist/css/app.css', false);
}

add_action('wp_enqueue_scripts', 'load_vue_scripts');

// Add shortcode
function my_vue_shortcode()
{
  wp_enqueue_script('vuejs_1');
  wp_enqueue_script('vuejs_2');
  wp_enqueue_style('vue_styles');
  return "<div id='app'></div>";
}

add_shortcode('vuecart', 'my_vue_shortcode');
