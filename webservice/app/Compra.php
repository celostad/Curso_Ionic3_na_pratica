<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    protected $fillable = [
        'data',
        'total',
        'status'
    ];

    public function user()
    {
      return $this->belongsTo('App\User');
    }

    public function produtos()
    {
      return $this->hasMany('App\Produto');
    }
}
