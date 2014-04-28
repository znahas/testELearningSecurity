Included
============
1. Symfony and the required bundles
2. User Bundle
3. javascript files
4. CSS files
5. Implemented message creation using AJAX

Not included
============
1. Country and cities

Installation
============

  1. Run composer to install all the vendors bundles

          $ php composer.phar install

  2. Create your (mysql) database


  3. Run the doctrine migrations to create all your tables

          $ php console doctrine:migrations:migrate

  4. Run the doctrine fixtures to load sample database data

          $ php console  doctrine:fixtures:load
