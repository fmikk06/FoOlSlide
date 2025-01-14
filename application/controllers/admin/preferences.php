<?php

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Preferences extends Admin_Controller
{
	function __construct()
	{
		parent::__construct();

		// preferences are settable only by admins!
		$this->tank_auth->is_admin() or redirect('admin');

		// set controller title
		$this->viewdata['controller_title'] = _("Preferences");
	}


	/*
	 * Just redirects to general
	 * 
	 * @author Woxxy
	 */
	function index()
	{
		redirect('/admin/preferences/general');
	}


	/*
	 * _submit is a private function that submits to the "preferences" table.
	 * entries that don't exist are created. the preferences table could get very large
	 * but it's not really an issue as long as the variables are kept all different.
	 * 
	 * @author Woxxy
	 */
	function _submit($post, $form)
	{
		foreach ($form as $key => $item)
		{

			if (isset($post[$item[1]['name']]))
				$value = $post[$item[1]['name']];
			else
				$value = NULL;

			$this->db->from('preferences');
			$this->db->where(array('name' => $item[1]['name']));
			if ($this->db->count_all_results() == 1)
			{
				$this->db->update('preferences', array('value' => $value), array('name' => $item[1]['name']));
			}
			else
			{
				$this->db->insert('preferences', array('name' => $item[1]['name'], 'value' => $value));
			}
		}

		$CI = & get_instance();
		$array = $CI->db->get('preferences')->result_array();
		$result = array();
		foreach ($array as $item)
		{
			$result[$item['name']] = $item['value'];
		}
		$CI->fs_options = $result;
		set_notice('notice', _('Settings changed.'));
	}


	/*
	 * Generic info influcencing all of FoOlSlide
	 * 
	 * @author Woxxy
	 */
	function general()
	{
		$this->viewdata["function_title"] = _("General");


		$form = array();

		// build the array for the form
		$form[] = array(
			_('Site title'),
			array(
				'type' => 'input',
				'name' => 'fs_gen_site_title',
				'id' => 'site_title',
				'maxlength' => '200',
				'placeholder' => _('comic reader'),
				'preferences' => 'fs_gen',
				'help' => _('Title that appears on top of your Slide')
			)
		);

		$form[] = array(
			_('Back URL'),
			array(
				'type' => 'input',
				'name' => 'fs_gen_back_url',
				'id' => 'back_url',
				'maxlength' => '200',
				'placeholder' => 'http://',
				'preferences' => 'fs_gen',
				'help' => _('Small link that appears near title in public pages')
			)
		);

		$form[] = array(
			_('Default team'),
			array(
				'type' => 'input',
				'name' => 'fs_gen_default_team',
				'id' => 'default_team',
				'maxlength' => '200',
				'placeholder' => 'Anonymous',
				'preferences' => 'fs_gen',
				'help' => _('Default team for widgets and releases')
			)
		);


		$form[] = array(
			_('Default release language'),
			array(
				'type' => 'language',
				'name' => 'fs_gen_default_lang',
				'preferences' => 'fs_gen',
				'help' => _('Change the default release language, so you don\'t have to change it from English every time')
			)
		);

		$form[] = array(
			_('Default software language'),
			array(
				'type' => 'dropdowner',
				'name' => 'fs_gen_lang',
				'values' => array('' => 'English', 'cs_CZ.utf8' => 'Czech', 'fr_FR.utf8' => 'French', 'de_DE.utf8' => 'German', 'it_IT.utf8' => 'Italian', 'pl_PL.utf8' => 'Polish', 'pt_PT.utf8' => 'Portuguese', 'pt_BR.utf8' => 'Portuguese (Brazil)', 'ru_RU.utf8' => 'Russian', 'es_ES.utf8' => 'Spanish', 'tr_TR.utf8' => 'Turkish'),
				'preferences' => 'fs_gen',
				'help' => _('Changes the overall language of the FoOlSlide software. If you can\'t find your language, you can contribute by translating on <a href="https://www.transifex.net/projects/p/foolslide/resource/defaultpot/">our transifex project</a>')
			)
		);

		if ($post = $this->input->post())
		{
			$this->_submit($post, $form);
		}

		// create a form
		$table = tabler($form, FALSE);
		$data['table'] = $table;

		// print out
		$this->viewdata["main_content_view"] = $this->load->view("admin/preferences/general.php", $data, TRUE);
		$this->load->view("admin/default.php", $this->viewdata);
	}


	/*
	 * Allows setting basic variables for theme.
	 * Does not yet allow adding more variables from current theme.
	 * 
	 * @author Woxxy
	 */
	function theme()
	{
		$this->viewdata["function_title"] = _("Theme");


		$form = array();

		$form[] = array(
			_('Select theme'),
			array(
				'type' => 'themes',
				'name' => 'fs_theme_dir',
				'placeholder' => '',
				'preferences' => 'fs_gen'
			)
		);
		
		$form[] = array(
			_('Pre-header text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_theme_preheader_text',
				'placeholder' => '',
				'preferences' => 'fs_gen',
				'help' => _("This allows adding HTML code before the header navigation block.")
			)
		);
		
		$form[] = array(
			_('Header text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_theme_header_text',
				'placeholder' => '',
				'preferences' => 'fs_gen',
				'help' => _("You can use this area to add text, a banner or any HTML in the header, where the navigation links are")
			)
		);

		$form[] = array(
			_('Footer text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_gen_footer_text',
				'placeholder' => '',
				'preferences' => 'fs_gen',
				'help' => _('Add text in the footer, place where to write disclaimers. Don\'t write things like "All Rights Reserved©", especially if what you upload is not yours. If you\'re releasing your own work, consider using <a href="http://creativecommons.org/">Creative Commons licenses</a> to protect it. Remember that in 2011 sharing means power!')
			)
		);

		$form[] = array(
			_('Header code'),
			array(
				'type' => 'textarea',
				'name' => 'fs_theme_header_code',
				'placeholder' => '',
				'preferences' => 'fs_gen',
				'help' => _("This allows you to add code inside the HEAD of the HTML.")
			)
		);

		$form[] = array(
			_('Footer code'),
			array(
				'type' => 'textarea',
				'name' => 'fs_theme_footer_code',
				'placeholder' => '',
				'preferences' => 'fs_gen',
				'help' => _("This allows you to add code after the BODY.")
			)
		);

		if ($post = $this->input->post())
		{
			$this->_submit($post, $form);
		}

		// create the form
		$table = tabler($form, FALSE);
		$data['table'] = $table;

		// print out
		$this->viewdata["main_content_view"] = $this->load->view("admin/preferences/general.php", $data, TRUE);
		$this->load->view("admin/default.php", $this->viewdata);
	}


	/*
	 * Code boxes to add the ads' code, supporting top and bottom ads
	 * 
	 * @author Woxxy
	 */
	function advertising()
	{
		$this->viewdata["function_title"] = _("Advertising");

		$form = array();


		$form[] = array(
			_('Top banner'),
			array(
				'type' => 'textarea',
				'name' => 'fs_ads_top_banner',
				'help' => _('Insert the HTML provided by your advertiser'),
				'preferences' => 'fs_ads'
			)
		);

		$form[] = array(
			_('Reload every pageview?'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_ads_top_banner_reload',
				'placeholder' => '',
				'preferences' => 'fs_ads',
				'help' => _('Reload the advertising. Useful for ProjectWonderful.com. Use it without violating the TOS of your advertiser.')
			)
		);


		$form[] = array(
			_('Active'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_ads_top_banner_active',
				'placeholder' => '',
				'preferences' => 'fs_ads'
			)
		);

		$form[] = array(
			_('Bottom banner'),
			array(
				'type' => 'textarea',
				'name' => 'fs_ads_bottom_banner',
				'help' => _('Insert the HTML provided by your advertiser'),
				'preferences' => 'fs_ads'
			)
		);

		$form[] = array(
			_('Reload every pageview?'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_ads_bottom_banner_reload',
				'placeholder' => '',
				'preferences' => 'fs_ads',
				'help' => _('Reload the advertising. Useful for ProjectWonderful.com. Use it without violating the TOS of your advertiser.')
			)
		);


		$form[] = array(
			_('Active'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_ads_bottom_banner_active',
				'placeholder' => '',
				'preferences' => 'fs_ads'
			)
		);

		if ($post = $this->input->post())
		{
			$this->_submit($post, $form);

			// this code is necessary to keep the ad well centered inside iframes
			$ad_before = '<!DOCTYPE html>
						<html>
						  <head>
							<title>FoOlSlide ads</title>
							<style>body{margin:0; padding:0; overflow:hidden;}</style>
							<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
						  </head>
						  <body>';
			$ad_after = '</body>
						</html>';

			// available ads
			$ads = array('fs_ads_top_banner' => 'ads_top.html', 'fs_ads_bottom_banner' => 'ads_bottom.html');

			// write an HTML file, so calling it will use less processor power than calling the database via Codeigniter
			// this recreates the files every time one saves
			foreach ($ads as $ad => $adfile)
			{
				if (!write_file('./content/ads/' . $adfile, $ad_before . $this->input->post($ad) . $ad_after))
				{
					log_message('error', 'preferences.php/advertising: couldn\'t update HTML files');
					set_notice('error', _('Couldn\'t save the advertising code in the HTML'));
				}
			}
		}

		// create the form
		$table = tabler($form, FALSE);
		$data['table'] = $table;

		// print out
		$this->viewdata["main_content_view"] = $this->load->view("admin/preferences/general.php", $data, TRUE);
		$this->load->view("admin/default.php", $this->viewdata);
	}


	function registration()
	{
		$this->viewdata["function_title"] = _("Registration");


		$form = array();


		$form[] = array(
			_('Disable registration'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_reg_disabled',
				'id' => 'disable_reg',
				'preferences' => 'fs_reg',
				'help' => _('Disable registration in case you\'re not expecting any')
			)
		);

		$form[] = array(
			_('Disable activation email'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_reg_email_disabled',
				'id' => 'disable_reg',
				'preferences' => 'fs_reg',
				'help' => _('Disable the necessity to proceed with an activation after registering')
			)
		);

		$form[] = array(
			_('reCaptcha public key'),
			array(
				'type' => 'input',
				'name' => 'fs_reg_recaptcha_public',
				'id' => 'captcha_public',
				'maxlength' => '200',
				'preferences' => 'fs_reg',
				'help' => _('Use <a href="http://www.google.com/recaptcha">reCaptcha</a> service, avoid hellish captchas!')
			)
		);

		$form[] = array(
			_('reCaptcha secret key'),
			array(
				'type' => 'input',
				'name' => 'fs_reg_recaptcha_secret',
				'preferences' => 'fs_reg',
				'help' => _('You must insert both public and secret key if you want to use reCaptcha')
			)
		);

		if ($post = $this->input->post())
		{
			$this->_submit($post, $form);
		}

		// prepare form
		$table = tabler($form, FALSE);
		$data['table'] = $table;

		// print out
		$this->viewdata["main_content_view"] = $this->load->view("admin/preferences/general.php", $data, TRUE);
		$this->load->view("admin/default.php", $this->viewdata);
	}


	/*
	 * Reader configuration
	 * 
	 * @author Woxxy
	 */
	function reader()
	{
		$this->viewdata["function_title"] = _("Reading");


		$form = array();


		$form[] = array(
			_('Enable direct downloads'),
			array(
				'type' => 'checkbox',
				'name' => 'fs_dl_enabled',
				'id' => 'enable_dl',
				'preferences' => 'fs_dl',
				'help' => _('Direct downloads usually increase the bandwidth usage by one-third. The issue is wheter you have enough space to keep both images and ZIPs. FoOlSlide tries to avoid dealing with the problem by using on-the-fly ZIP compression and caching.')
			)
		);

		$form[] = array(
			_('Maximum direct download cache in Megabyte'),
			array(
				'type' => 'input',
				'name' => 'fs_dl_archive_max',
				'id' => 'max_dl',
				'preferences' => 'fs_dl',
				'help' => _('Over this size, the ZIPs that have been downloaded the furthest in time will be removed. If you insert a very large number, the ZIPs will be cached indefinitely.')
			)
		);

		if ($post = $this->input->post())
		{
			$this->_submit($post, $form);
		}

		// create form
		$table = tabler($form, FALSE);
		$data['table'] = $table;

		// print out
		$this->viewdata["main_content_view"] = $this->load->view("admin/preferences/general.php", $data, TRUE);
		$this->load->view("admin/default.php", $this->viewdata);
	}
	
	
	
	/*
	 * Generic info influcencing all of FoOlSlide
	 * 
	 * @author Woxxy
	 */
	function slideshow()
	{
		$this->viewdata["function_title"] = _("Slideshow");


		$form = array();

		// build the array for the form
		$form[] = array(
			_('1st Image URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_src_1',
				'placeholder' => _('Activate by inserting an URL'),
				'preferences' => 'fs_gen',
				'help' => _('Image URL (don\'t forget "http://"). Suggested size: 690px width, 280px height')
			)
		);
		
		$form[] = array(
			_('1st URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_url_1',
				'placeholder' => _('Not required'),
				'preferences' => 'fs_gen',
				'help' => _('Link URL (don\'t forget "http://")')
			)
		);

		$form[] = array(
			_('1st Display text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_slsh_text_1',
				'preferences' => 'fs_gen',
				'help' => _('Text that appears on bottom of the image. HTML accepted')
			)
		);
		
		$form[] = array(
			_('2nd Image URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_src_2',
				'placeholder' => _('Activate by inserting an URL'),
				'preferences' => 'fs_gen',
				'help' => _('Image URL (don\'t forget "http://"). Suggested size: 690px width, 280px height')
			)
		);
		
		$form[] = array(
			_('2nd URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_url_2',
				'placeholder' => _('Not required'),
				'preferences' => 'fs_gen',
				'help' => _('Link URL (don\'t forget "http://")')
			)
		);

		$form[] = array(
			_('2nd Display text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_slsh_text_2',
				'preferences' => 'fs_gen',
				'help' => _('Text that appears on bottom of the image. HTML accepted')
			)
		);
		
		$form[] = array(
			_('3rd Image URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_src_3',
				'placeholder' => _('Activate by inserting an URL'),
				'preferences' => 'fs_gen',
				'help' => _('Image URL (don\'t forget "http://"). Suggested size: 690px width, 280px height')
			)
		);
		
		$form[] = array(
			_('3rd URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_url_3',
				'placeholder' => _('Not required'),
				'preferences' => 'fs_gen',
				'help' => _('Link URL (don\'t forget "http://")')
			)
		);

		$form[] = array(
			_('3rd Display text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_slsh_text_3',
				'preferences' => 'fs_gen',
				'help' => _('Text that appears on bottom of the image. HTML accepted')
			)
		);
		
		$form[] = array(
			_('4th Image URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_src_4',
				'placeholder' => _('Activate by inserting an URL'),
				'preferences' => 'fs_gen',
				'help' => _('Image URL (don\'t forget "http://"). Suggested size: 690px width, 280px height')
			)
		);
		
		$form[] = array(
			_('4th URL'),
			array(
				'type' => 'input',
				'name' => 'fs_slsh_url_4',
				'placeholder' => _('Not required'),
				'preferences' => 'fs_gen',
				'help' => _('Link URL (don\'t forget "http://")')
			)
		);

		$form[] = array(
			_('4th Display text'),
			array(
				'type' => 'textarea',
				'name' => 'fs_slsh_text_4',
				'preferences' => 'fs_gen',
				'help' => _('Text that appears on bottom of the image. HTML accepted')
			)
		);

		if ($post = $this->input->post())
		{
			$this->_submit($post, $form);
		}

		// create a form
		$table = tabler($form, FALSE);
		$data['table'] = $table;

		// print out
		$this->viewdata["main_content_view"] = $this->load->view("admin/preferences/general.php", $data, TRUE);
		$this->load->view("admin/default.php", $this->viewdata);
	}


}