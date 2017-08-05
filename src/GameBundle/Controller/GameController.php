<?php
/**
 * Created by PhpStorm.
 * User: vincentdeplais
 * Date: 26/05/2017
 * Time: 23:02
 */

namespace GameBundle\Controller;

use AppBundle\Entity\User;
use GameBundle\Entity\Game;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class GameController extends Controller
{

    public function indexAction()
    {
        return $this->render('GameBundle::index.html.twig');
    }

    public function showAction($game)
    {
        return $this->render('GameBundle:games:' . $game . '.html.twig');
    }

    public function registerAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if ($request->isXmlHttpRequest()) {
            $game = $request->get('game');
            $newScore = $request->get('score');

            $user = $this->get('security.token_storage')->getToken()->getUser();
            $resultUser = $em->getRepository('AppBundle:User')->find($user);

            $resultApp = $user->getGames();

            if(count($resultApp) < 1){
                $newGame = new Game();
                $newGame->setName($game);
                $newGame->setScore($newScore);
                $newGame->setTry(1);
                $newGame->setStartDate(new \DateTime("now"));
                $newGame->setUser($user);
                $user->addGame($newGame);
                $em->persist($newGame);
            } else {
                foreach ($resultApp as &$result) {
                    if ($result->getName() === $game) {
                        $try = $result->getTry();
                        $record = $result->getScore();

                        $result->setTry($try + 1);
                        if ($newScore < $record) {
                            $result->setScore($newScore);
                        }
                    }
                }
            }

            $em->flush();

            return new Response('Score update');
        }
    } // registrationAction

}