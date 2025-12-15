<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\NominateController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WaitingListController;
use App\Http\Controllers\PartnersController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\PromoterController;


Route::get('/', [HomeController::class, 'index']);
Route::get('/home', [HomeController::class, 'index']);

Route::get('/article/{id}/{title}', [ArticlesController::class, 'read']);

Route::get('/nominate', [NominateController::class, 'index']);
Route::get('/nominate/category/{id}/{title}', [NominateController::class, 'category']);
Route::get('/api/verify-mobile/{id}/{mobile}', [NominateController::class, 'verifyMobile']);
Route::post('/api/process-deposit', [NominateController::class, 'processDeposit']);
Route::get('/api/check-status/{categoryId}/{mobile}/{name}/{chargeId}', [NominateController::class, 'checkStatus']);

Route::get('/vote', [VoteController::class, 'index']);
Route::get('/vote/verify-mobile/{id}/{mobile}', [VoteController::class, 'verifyMobile']);
Route::post('/vote/verify', [VoteController::class, 'verifyFingerPrint']);
Route::get('/vote/category/{id}/{title}', [VoteController::class, 'category']);
Route::post('/vote/process-payment', [VoteController::class, 'processPayment']);
Route::post('/vote/check-status', [VoteController::class, 'checkStatus']);
Route::get('/vote/check-balance', [VoteController::class, 'checkBalancePage']);
Route::post('/api/check-balance', [VoteController::class, 'checkBalance']);

Route::get('/waiting-list',  [WaitingListController::class, 'index']);
Route::post('/waiting-list-form', [WaitingListController::class, 'store']);
Route::get('waiting-list/verify/{token}', [WaitingListController::class, 'verify']);

Route::get('/buy-ticket', [TicketController::class, 'index'])->name('show.buy-ticket');
Route::post('/buy-ticket', [TicketController::class, 'generateTicket'])->name('buy-ticket');
Route::post('/api/process-ticket-payment', [TicketController::class, 'processPayment']);
Route::post('/api/verify-ticket-payment', [TicketController::class, 'verifyPayment']);
Route::get('/verify-payment', [TicketController::class, 'verifyPayment']);

//login
Route::get('/login', [UsersController::class, 'index'])->name('show.login');
Route::post('/login', [UsersController::class, 'login'])->name('login');
Route::get('/forgot-password', function () {
    return view('auth.forgot-password');
});
Route::post('/forgot-password', [UsersController::class, 'forgotPassword'])->name('forgot-password');
Route::get('/reset-password/{token}', [UsersController::class, 'showResetForm'])->name('show.reset-password');
Route::post('/reset-password', [UsersController::class, 'resetPassword'])->name('reset-password');


Route::group(['middleware' => 'auth', 'prefix' => 'admin'], function () {
    //dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/api/kpis', [DashboardController::class, 'kpis'])->name('admin.kpis');

    //users
    Route::get('/users/add', function () {
        return view('admin.add-user');
    })->name('show.add-user');

    Route::get('/users', [UsersController::class, 'users'])->name('users');
    Route::post('/users/add', [UsersController::class, 'store'])->name('add-user');
    Route::get('/users/edit/{id}', [UsersController::class, 'showEdit'])->name('show.edit-user');
    Route::post('/users/edit/{id}', [UsersController::class, 'edit'])->name('edit-user');
    Route::get('/users/delete/{id}', [UsersController::class, 'delete'])->name('delete-user');
    Route::get('/logout', [UsersController::class, 'logout'])->name('logout');

    //sponsors
    Route::get('/sponsors', [PartnersController::class, 'index'])->name('admin.sponsors');
    Route::get('/sponsors/add', [PartnersController::class, 'showAddSponsor'])->name('admin.show.add-sponsor');
    Route::post('/sponsors/add', [PartnersController::class, 'create'])->name('admin.add-sponsor');
    Route::get('/sponsors/delete/{id}', [PartnersController::class, 'destroy'])->name('admin.delete-sponsor');

    //articles
    Route::get('/articles', [ArticlesController::class, 'adminIndex'])->name('admin.articles');
    Route::get('/articles/add', [ArticlesController::class, 'showAddArticle'])->name('admin.show.add-article');
    Route::post('/articles/add', [ArticlesController::class, 'store'])->name('admin.add-article');
    Route::get('/articles/edit/{id}', [ArticlesController::class, 'showEditArticle'])->name('admin.show.edit-article');
    Route::post('/articles/edit/{id}', [ArticlesController::class, 'update'])->name('admin.edit-article');
    Route::get('/articles/delete/{id}', [ArticlesController::class, 'destroy'])->name('admin.delete-article');
    
    //nominations
    Route::get('/nominations', [NominateController::class, 'nominees'])->name('admin.nominations');
    Route::post('/fetch-nominees', [NominateController::class, 'fetchNominees'])->name('fetch.nominees');

    //nominees
    Route::get('/nominees', [VoteController::class, 'nominees'])->name('admin.nominees');
    Route::get('/nominees/add', [VoteController::class, 'create'])->name('admin.show.add-nominee');
    Route::post('/nominees/add', [VoteController::class, 'store'])->name('admin.add-nominee');
    Route::get('/nominees/fetch/{category_id}', [VoteController::class, 'getCategoryData'])->name('admin.retrieve.category-data');
    Route::get('/api/nominees-data', [VoteController::class, 'nomineesData'])->name('api.nominees-data');
    Route::get('/nominees/edit/{nominee_id}', [VoteController::class, 'edit'])->name('admin.show.edit-nominee');
    Route::post('/nominees/edit/{nominee_id}', [VoteController::class, 'update'])->name('admin.edit-nominee');
    Route::get('/nominees/delete/{nominee_id}', [VoteController::class, 'destroy'])->name('admin.delete-nominee');

    //votes
    Route::get('/votes', [VoteController::class, 'votes'])->name('admin.votes');
    Route::get('/api/vote-data', [VoteController::class, 'getVoteData'])->name('api.retrieve.vote-data');

    //tickets
    Route::get('/tickets', [TicketController::class, 'tickets'])->name('admin.tickets');
    Route::get('/tickets/roots', [TicketController::class, 'rootstickets'])->name('admin.roots');
    Route::get('/tickets/delete/{id}', [TicketController::class, 'destroy'])->name('admin.delete-ticket');
    Route::get('/tickets/generate', function () {
        return view('admin.generate-ticket');
    })->name('admin.show.generate-ticket');
    Route::post('/tickets/generate', [TicketController::class, 'generateTicketAdmin'])->name('admin.generate-ticket');
    Route::get('/tickets/scan', [TicketController::class, 'showScanTicket'])->name('admin.show.scan-tickets');
    Route::get('/tickets/dashboard', [TicketController::class, 'dashboard'])->name('admin.ticket-dashboard');
    Route::get('/tickets/approved-tickets', [TicketController::class, 'approvedTickets'])->name('admin.approved-tickets');
    Route::get('/tickets/get-ticket-data', [TicketController::class, 'getTicketData'])->name('admin.get-ticket-data');
    Route::get('/tickets/check-qr-code/{ticketId}/{ticketType}', [TicketController::class, 'checkQrCode'])->name('admin.check-qr-code');
    Route::post('/tickets/approve', [TicketController::class, 'approveTicket'])->name('admin.tickets.approve');

    //promoters
    Route::get('/promoters', [PromoterController::class, 'index'])->name('admin.promoters');
    Route::get('/promoters/add', function(){
        return view('admin.add-promoter');
    })->name('admin.show.add-promoter');
    Route::post('/promoters/add', [PromoterController::class, 'store'])->name('admin.add-promoter');
    Route::get('/promoters/edit/{id}', [PromoterController::class, 'edit'])->name('admin.show.edit-promoter');
    Route::post('/promoters/edit/{id}', [PromoterController::class, 'update'])->name('admin.edit-promoter');
    Route::get('/promoters/delete/{id}', [PromoterController::class, 'destroy'])->name('admin.delete-promoter');
});
