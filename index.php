<?php

session_start();

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

$routes = array(
    'index' => array(
        'controller' => 'Users',
        'action' => 'index'
    ),
    'profile' => array(
        'controller' => 'Users',
        'action' => 'profile'
    ),
        'register' => array(
        'controller' => 'Users',
        'action' => 'register'
    ),
        'login' => array(
        'controller' => 'Users',
        'action' => 'index'
    ),
        'logout' => array(
        'controller' => 'Users',
        'action' => 'logout'
    ),
        'newproject' => array(
        'controller' => 'Pages',
        'action' => 'newproject'
    ),
        'scrum' => array(
        'controller' => 'Pages',
        'action' => 'scrum'
    ),
        'whiteboard' => array(
        'controller' => 'Pages',
        'action' => 'whiteboard'
    ),
        'createproject' => array(
        'controller' => 'Pages',
        'action' => 'createproject'
    )    
);

if(empty($_GET['page'])){
	$_GET['page'] = 'index';
}

if(empty($routes[$_GET['page']])) {
  header('Location: index.php');
  exit();
}

$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';

require_once WWW_ROOT . 'controller' . DS . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();
