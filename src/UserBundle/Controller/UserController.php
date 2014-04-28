<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use JMS\SecurityExtraBundle\Annotation\Secure;
use UserBundle\Entity\User;

/**
 * @Route("/users")
 */
class UserController extends Controller
{

    /**
     * @Route("/{id}/show")
     * @Template()
     * @Secure(roles="ROLE_USER")
     */
    public function showAction(User $user)
    {

        return array(
            'user' => $user,
        );
    }

}
