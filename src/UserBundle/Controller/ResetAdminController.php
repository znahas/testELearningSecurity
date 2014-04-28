<?php

namespace UserBundle\Controller;

use UserBundle\Entity\User;
use UserBundle\Form\Type\OverwritePasswordFormType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\EventDispatcher\GenericEvent;
use Symfony\Component\HttpFoundation\Request;
use JMS\SecurityExtraBundle\Annotation\Secure;


class ResetAdminController extends Controller
{

    /**
     * @Route("/overwrite-password/{id}", requirements={"id" = "\d+"})
     * @Secure(roles="ROLE_MOD_USER_WRITE")
     * @Template()
     */
    public function overwritePasswordAction(Request $request, User $user)
    {
        $form = $this->createForm(new OverwritePasswordFormType('UserBundle\Entity\User'), $user);

        if ($request->isMethod('POST')) {
            $form->handleRequest($request);

            if ($form->isValid()) {

                $this->get('fos_user.user_manager')->updateUser($user);

                $dispatcher = $this->container->get('event_dispatcher');
                $dispatcher->dispatch('user.password.overwrite', new GenericEvent('', array('user' => $user)));

                $this->get('session')->getFlashBag()->add('success', 'Password has been changed.');
            }
        }

        return array(
            'form' => $form->createView(),
        );
    }
}
