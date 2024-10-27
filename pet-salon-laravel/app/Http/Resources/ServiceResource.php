<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
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
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'trajanje' => $this->trajanje,
            'tezina' => $this->tezina,
        ];
    }
}
