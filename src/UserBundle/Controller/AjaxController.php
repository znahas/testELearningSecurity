<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use UserBundle\Entity\Message;
use UserBundle\Entity\User;
use UserBundle\Form\Type\MessageFormType;


/**
 * @Route("/ajax/message")
 */
class AjaxController extends Controller
{

    /**
     * @Route("/showModalMessage")
     * @Template("UserBundle:Partial:modal.template.html.twig")
     * @Secure(roles="ROLE_USER")
     */
    public function showModalMessageAction()
    {
        $message = new Message();
        /** @var $user User */
        $user = $this->get('security.context')->getToken()->getUser();

        $message->setUser($user);
        $form = $this->createForm(new MessageFormType(), $message);

        $modal = array(
            'header' => 'Add new message',
            'form'   => $form->createView(),
            'action' => $this->generateUrl('user_message_new'),
        );

        return array(
            'modal' => $modal,
        );
    }
}
