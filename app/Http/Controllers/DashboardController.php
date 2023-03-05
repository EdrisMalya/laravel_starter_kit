<?php

namespace App\Http\Controllers;

use App\Events\Test;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function testEvent()
    {
        event(new Test('This message is from test event'));

        return Inertia::render('Dashboard');
    }
}
