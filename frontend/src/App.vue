<template>
  <div class="app">
    <header class="header">
      <div class="container nav">
        <RouterLink to="/" class="logo">MercApp</RouterLink>

        <nav class="menu">
          <RouterLink to="/">Catálogo</RouterLink>
          <RouterLink to="/cart">Carrito</RouterLink>
          <RouterLink to="/about">Acerca de</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container main-content">
      <RouterView />
    </main>
  </div>
</template>