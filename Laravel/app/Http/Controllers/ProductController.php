<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    
    public function list(Request $request)
{
    $user = auth()->user();

    $products = Product::where('user_id', $user->id)
                       ->orderBy('id', 'desc')
                       ->paginate(5);

    return response()->json($products);
}

    // Create a new product
    public function create(Request $request)
    {
        $user = auth()->user(); 

        $request->validate([
            'product_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0'
        ]);

        $product = Product::create([
            'product_name' => $request->product_name,
            'category' => $request->category,
            'price' => $request->price,
            'user_id' => $user->id 
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    // Update a product 
    public function update(Request $request, $id)
    {
        $user = auth()->user();
        $product = Product::where('id', $id)->where('user_id', $user->id)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found or unauthorized'], 404);
        }

        $request->validate([
            'product_name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric'
        ]);

        $product->update([
            'product_name' => $request->product_name,
            'category' => $request->category,
            'price' => $request->price
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ], 200);
    }

    // Delete a product 
    public function delete($id)
    {
        $user = auth()->user();
        $product = Product::where('id', $id)->where('user_id', $user->id)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found or unauthorized'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
