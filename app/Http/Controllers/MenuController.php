<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;

class MenuController extends Controller
{
    public function index()
    { 
        $menus = Menu::with('children')
            ->whereNull('parent_id')
            ->orderBy('sort_number')
            ->get();
        
        return Inertia::render('menus/Index', [ //menus/Index
            'menus' => $menus
        ]);
    }


    public function create()
    {
        $parents = Menu::whereNull('parent_id')->get();

        return Inertia::render('menus/Create', [
            'parents' => $parents
        ]);
    }


    public function save(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'url'         => 'nullable|string|max:255',
            'icon'        => 'nullable|string|max:255',
            'parent_id'   => 'nullable|exists:menus,id',
            'status'      => 'required|in:Active,Inactive',
            'sort_number' => 'nullable|integer|min:0'
        ]);

        Menu::create($request->only('name', 'url', 'icon', 'parent_id', 'status', 'sort_number'));

        return redirect()->route('all-menu')->with('success', 'Menu created successfully!');
    }

   public function edit(Menu $menu)
{
    $parents = Menu::whereNull('parent_id')
        ->where('id', '!=', $menu->id)
        ->get();

    return Inertia::render('menus/Edit', [
        'menu' => $menu,
        'parents' => $parents,
    ]);
}


    public function update(Request $request, Menu $menu){
        $request->validate([
            'name'=> 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'icon'=> 'nullable|string|max:255',
            'status'=> 'required|in:Active,Inactive',
        ]);
        $menu->update($request->all());
        return redirect()->route('all-menu');
    }
  
    public function destroy(Menu $menu){
        $menu->delete();
        return redirect()->route('all-menu');
    }

    
}