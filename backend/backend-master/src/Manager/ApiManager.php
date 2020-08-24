<?php


namespace App\Manager;


use http\Client\Request;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\Validator\Constraints\Date;

class ApiManager
{
    const API_URL = 'https://jours-feries-france.antoine-augusti.fr/api/';

    protected $entityManager;

    /**
     * IvantiManager constructor.
     * @param $entityManager
     */
    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getDataFromApi($year)
    {
        if (null == $year){
            $today = new \DateTime();
            $year = $today->format("Y");
        }

        $client = HttpClient::create();
        $response = $client->request('GET', self::API_URL . $year);

        return $response->toArray();
    }

}