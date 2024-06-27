<template>
  <h1>Bienvenue sur le bon investisseur</h1>
  <p>
    <strong>Vous êtes ici:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/loan">Calculateur de prêt</RouterLink><br />
    <RouterLink to="/metal">Calculateur de prime</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>