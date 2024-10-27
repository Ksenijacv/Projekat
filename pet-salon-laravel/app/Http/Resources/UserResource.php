<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
         /*
        resursi se menjaju da ne ide resource pa nesto, nego direktno preko this
        */
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];

        if ($this->is_worker) {
            $data['is_worker'] = 'Ovaj korisnik je radnik u salonu za pse.';
        } else {
            $data['is_worker'] = 'Ovo je obican korisnik koji koristi usluge salona.';
        }

        return $data;
    }
}
