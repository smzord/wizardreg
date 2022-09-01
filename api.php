<?php
//Start session to store the access_token generated from Salesforce OAuth and other necessary values
session_start();
header('Access-Control-Allow-Origin: smzord.github.io');
//Set Content-Type for Response from Our API
header("Content-Type:application/x-www-form-urlencoded");
$baseUrl = "https://welink1--partial.sandbox.my.salesforce-sites.com/welinkreg/services/apexrest/welinkRegistration";
//Check Request Type
if ($_POST) {
	//print_r($_REQUEST);die;
	if ($_REQUEST['action'] == 'access-token') {
		/**
		 * @description Method to fetch the access_token from Salesforce
		 */
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $baseUrl,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "action=" . $_REQUEST['action'] . "",
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
				"content-type: application/x-www-form-urlencoded"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			echo $response;
		}
		die;
	} else if ($_REQUEST['action'] == 'validate-address') {
		/**
		 * @description Method to validate address
		 */
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $baseUrl,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "address=" . $_REQUEST['address'] . "&action=" . $_REQUEST['action'] . "",
			CURLOPT_HTTPHEADER => array(
				"authorization: Bearer " . $_REQUEST['token'] . "",
				"cache-control: no-cache",
				"content-type: application/x-www-form-urlencoded"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			echo $response;
		}
		die;
	} else if ($_REQUEST['action'] == 'create-lead') {
		/**
		 * @description Method to Create Lead record on SF System
		 */
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $baseUrl,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "action=" . $_REQUEST['action'] . "&FirstName=" . $_REQUEST['FirstName'] . "&LastName=" . $_REQUEST['LastName'] . "&Email=" . $_REQUEST['Email'] . "&Phone=" . $_REQUEST['Phone'] . "",
			CURLOPT_HTTPHEADER => array(
				"authorization: Bearer " . $_REQUEST['token'] . "",
				"cache-control: no-cache",
				"content-type: application/x-www-form-urlencoded"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			echo $response;
		}
		die;
	} else if ($_REQUEST['action'] == 'plans') {
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $baseUrl,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "action=".$_REQUEST['action']."",
			CURLOPT_HTTPHEADER => array(
				"authorization: Bearer " . $_REQUEST['token'] . "",
				"cache-control: no-cache",
				"content-type: application/x-www-form-urlencoded",
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			echo $response;
		}
	} else if ($_REQUEST['action'] == 'create-subscription') {
		/**
		 * @description Method to Create Subscription record with related objects
		 */
		$params = "action=" . $_REQUEST['action'];
		foreach($_REQUEST as $k => $v){
			if($k!='action'){
				$params .= '&'.$k.'='.$v;
			}
		}
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => $baseUrl,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => $params,
			CURLOPT_HTTPHEADER => array(
				"authorization: Bearer " . $_REQUEST['token'] . "",
				"cache-control: no-cache",
				"content-type: application/x-www-form-urlencoded"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			echo $response;
		}
		die;
	} else {
		response(400, "Invalid Request", NULL);
	}
} else {
	response(400, "Invalid Method", NULL);
}

/**
 * @description Method to parse the response
 */
function response($status, $status_message, $data)
{
	header("HTTP/1.1 " . $status);
	$response['status'] = $status;
	$response['status_message'] = $status_message;
	$response['data'] = $data;
	$json_response = json_encode($response);
	echo $json_response;
	die;
}
