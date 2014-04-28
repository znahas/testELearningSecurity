<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use JMS\SecurityExtraBundle\Annotation\Secure;
use UserBundle\Entity\Message;
use UserBundle\Entity\User;
use UserBundle\Form\Type\MessageFormType;


/**
 * @Route("/message")
 */
class MessageController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     * @Secure(roles="ROLE_USER")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $messages = $em->getRepository('UserBundle:Message')->findBy(array(), array('createdAt' => 'DESC'));

        return array('messages' => $messages);
    }

    /**
     * @Route("/new")
     * @Secure(roles="ROLE_USER")
     */
    public function newAction(Request $request)
    {
        $message = new Message();
        /** @var $user User */
        $user = $this->get('security.context')->getToken()->getUser();

        $message->setUser($user);
        $form = $this->createForm(new MessageFormType(), $message);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);

            if ($form->isValid()) {

                $em = $this->getDoctrine()->getManager();

                $em->persist($message);
                $em->flush();

                $this->get('session')->getFlashBag()->add('success', 'Saved.');

                return $this->redirect($this->generateUrl('user_message_index'));
            }
        }

        return array(
            'form' => $form->createView()
        );
    }
}
