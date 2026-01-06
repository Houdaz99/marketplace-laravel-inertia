<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DateTacheValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   public function handle($request, Closure $next): \Symfony\Component\HttpFoundation\Response
{
    $projet = Projet::find($request->projet_id);

    if ($projet && $request->date_tache < $projet->date_demarrage) {
        return redirect()->route('tache.create')->withErrors([
            'date_tache' => 'Erreur : la date de la tâche ne peut pas être antérieure à la date de démarrage du projet.'
        ]);
    }

    return $next($request);
}

}
