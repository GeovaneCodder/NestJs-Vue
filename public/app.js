const { createApp } = Vue;

createApp({
  data() {
    return {
      users: [],
      user: null,
      userId: null,
      error: '',
      listError: '',
      loadingAll: false,
      loadingUser: false,
    };
  },
  methods: {
    async loadUsers() {
      this.loadingAll = true;
      this.listError = '';
      this.users = [];

      try {
        const response = await fetch('/users');

        if (!response.ok) {
          throw new Error(`Falha ao carregar usuários (${response.status})`);
        }

        this.users = await response.json();
      } catch (err) {
        this.listError = err.message || 'Erro ao carregar usuários';
      } finally {
        this.loadingAll = false;
      }
    },
    async loadUser() {
      this.loadingUser = true;
      this.error = '';
      this.user = null;

      if (!this.userId) {
        this.error = 'Informe um ID válido';
        this.loadingUser = false;
        return;
      }

      try {
        const response = await fetch(`/users/${this.userId}`);

        if (response.status === 404) {
          throw new Error('Usuário não encontrado');
        }

        if (!response.ok) {
          throw new Error(`Falha na busca (${response.status})`);
        }

        this.user = await response.json();
      } catch (err) {
        this.error = err.message || 'Erro ao buscar usuário';
      } finally {
        this.loadingUser = false;
      }
    },
    formatAddress(address) {
      if (!address) {
        return '-';
      }

      return [address.street, address.suite, address.city, address.zipcode]
        .filter(Boolean)
        .join(', ');
    },
  },
}).mount('#app');
