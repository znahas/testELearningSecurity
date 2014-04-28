<?php

namespace UserBundle\Form\Type;

use FOS\UserBundle\Form\Type\ChangePasswordFormType;
use Symfony\Component\Form\FormBuilderInterface;

class OverwritePasswordFormType extends ChangePasswordFormType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder->add('plainPassword', 'repeated', array(
            'type'            => 'password',
            'options'         => array('translation_domain' => 'FOSUserBundle'),
            'first_options'   => array('label' => 'form.new_password'),
            'second_options'  => array('label' => 'form.new_password_confirmation'),
            'invalid_message' => 'fos_user.password.mismatch',
        ));
    }
}
