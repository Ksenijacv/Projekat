<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        #dodajemo bcrypt da bi radio login admina
        User::create([
            'name'=>"Ana Nikolic",
            'email'=>"ananikolic@gmail.com",
            'password' =>   bcrypt("ana01"),
            'is_worker' => true,
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Milos Bikovic",
            'email'=>"milosbikovic@gmail.com",
            'password' =>   bcrypt("milos01"),
            'is_worker' => true,
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Marija Cosic",
            'email'=>"marijacosic@gmail.com",
            'password' =>  bcrypt("marija01"),
            'is_worker' => true,
            'remember_token' => Str::random(10),
        ]);

        User::factory()->times(3)->create();
    }
}
