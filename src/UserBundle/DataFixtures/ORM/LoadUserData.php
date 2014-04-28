<?php

namespace UserBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use UserBundle\Entity\Message;
use UserBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * {@inheritDoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $userManager = $this->container->get('fos_user.user_manager');

        // Admin
        /** @var $admin User */
        $admin = $userManager->createUser();
        $admin->setUsername('admin');
        $admin->setEmail('admin@rien.com');
        $admin->setFirstname('Admin');
        $admin->setLastname('Lastname');
        $admin->addRole('ROLE_ADMIN');
        $admin->setEnabled(true);

        // password
        $encoder = $this->container->get('security.encoder_factory')->getEncoder($admin);

        $admin->setPassword($encoder->encodePassword('admin', $admin->getSalt()));

        $userManager->updateUser($admin);

        // User 1
        /** @var $user1 User */
        $user1 = $userManager->createUser();
        $user1->setUsername('user1');
        $user1->setEmail('user1@user1.com');
        $user1->setFirstname('user1');
        $user1->setLastname('Lastname');
        $user1->addRole('ROLE_USER');
        $user1->setEnabled(true);

        // password
        $encoder = $this->container->get('security.encoder_factory')->getEncoder($user1);

        $user1->setPassword($encoder->encodePassword('user1', $user1->getSalt()));

        $userManager->updateUser($user1);


        // user 2
        /** @var $user2 User */
        $user2 = $userManager->createUser();
        $user2->setUsername('user2');
        $user2->setEmail('user2@user2.com');
        $user2->setFirstname('user2');
        $user2->setLastname('Lastname');
        $user2->addRole('ROLE_USER');
        $user2->setEnabled(true);

        // password
        $encoder = $this->container->get('security.encoder_factory')->getEncoder($user2);

        $user2->setPassword($encoder->encodePassword('user2', $user2->getSalt()));

        $userManager->updateUser($user2);

        //Messages
        $message = new Message();
        $message->setUser($user1);
        $message->setContent('test 1');
        $manager->persist($message);

        $message = new Message();
        $message->setUser($user2);
        $message->setContent('test 2');
        $manager->persist($message);

        $message = new Message();
        $message->setUser($user1);
        $message->setContent('test 3');
        $manager->persist($message);

        $message = new Message();
        $message->setUser($user2);
        $message->setContent('test 4');
        $manager->persist($message);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 3;
    }
}
