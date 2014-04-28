<?php

namespace UserBundle\Form\Type;

use Symfony\Component\Form\FormBuilderInterface;
use FOS\UserBundle\Form\Type\ProfileFormType as BaseType;

class ProfileFormType extends BaseType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        // add your custom field
        $builder
            ->remove('username')
            ->add('firstname', null, array('label' => 'profile.show.firstname'))
            ->add('lastname', null, array('label' => 'profile.show.lastname'));
    }

    public function getName()
    {
        return 'user_profile';
    }
}
