<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
class ClearVoteMobileTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clear-vote-mobile-table';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear the vote_mobile table every 24 hours';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::table('vote_mobile')->truncate();
        $this->info('vote_mobile table cleared!');
    }
}
