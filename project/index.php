<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');


/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
include 'db.php';	

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();


/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', 'home');
$app->get('/adduser', 'addUser');


// Home view

function home() {echo "Welcome to the social network !";}

// Add users
function addUser() {
	
$sql = "INSERT INTO users (email, password, fullname, username) VALUES (:email, :password, :fullname, :username)";
  try {
    $db = getDB();
    $stmt = $db->prepare($sql);
      $stmt->bindParam("email", $_GET['email']);
	  $password = hash('sha256', $_GET['password']);
      $stmt->bindParam("password", $password);
      $stmt->bindParam("fullname", $_GET['fullname']);
      $stmt->bindParam("username", $_GET['username']);
      $stmt->execute();
      $db = null;
	  
	  echo json_encode("OK");
	    
  } catch(PDOException $e) {
      echo "Connection Error";
  }
  
}

// Add users


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();