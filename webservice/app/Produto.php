<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $fillable = [
        'user_id',
        'curso_id',
        'titulo',
        'valor'
    ];

    public function compra()
    {
      return $this->belongsTo('App\Compra');
    }

    public function curso()
    {
      return $this->belongsTo('App\Curso');
    }

    public function user()
    {
      return $this->belongsTo('App\User');
    }
}
