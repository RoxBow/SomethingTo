<?php
/**
 * Created by PhpStorm.
 * User: vincentdeplais
 * Date: 28/05/2017
 * Time: 13:23
 */

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class UserController extends Controller {

    public function getParent()
    {
        return 'FOSUserBundle';
    }

    public function listAction()
    {
        $repository = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('AppBundle:User');

        $listUser = $repository->findAll();

        return $this->render('user/listUser.html.twig',array("listUser"=> $listUser));

    }
}