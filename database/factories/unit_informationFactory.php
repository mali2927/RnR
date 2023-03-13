<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\unit_information;

class unit_informationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'unitNumber' => $this->faker->name,
            'receiveDate' => $this->faker->date,
            'initialFault' => $this->faker->name,
            'deliverDate' => $this->faker->date,
            'moreFaults' => $this->faker->name,
            'unit_image' => $this->faker->name,
        ];
    }
}