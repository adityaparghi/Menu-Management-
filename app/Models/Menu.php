<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'url', 'icon', 'parent_id', 'status', 'sort_number',
    ];

    // Parent rel.
    public function parent(){
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    // Children rel.
    public function children(){
        return $this->hasMany(Menu::class, 'parent_id')->orderBy('sort_number');
    }

//     public function childrenRecursive()
// {
//     return $this->hasMany(Menu::class, 'parent_id')
//         ->with('childrenRecursive') // recursion
//         ->orderBy('sort_number');
// }


    public function childrenRecursive() {
        return $this->children()->with('childrenRecursive');
    }

    public function scopeActive($q) {
        return $q->where('status', 'Active');
    }
}
