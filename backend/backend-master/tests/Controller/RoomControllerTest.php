<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RoomControllerTest extends WebTestCase
{
    public function testAdd() {
        $client = static::createClient();
        $crawler = $client->request('GET', '/room/add');

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('h1', 'Create new Room');
        $client->followRedirects();

        $crawler = $client->submitForm('Save', [
            'room[name]' => "test",
            'room[capacity]' => 98
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertSelectorTextContains('td#1', 'test');
    }
}