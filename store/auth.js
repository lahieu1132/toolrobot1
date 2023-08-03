// store/auth.js
import { defineStore } from 'pinia'
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
  actions: {
    async login(email, password) {
      try {
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem("user", JSON.stringify(user))
        this.isAuthenticated = true;
        this.user = { ...user };
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      localStorage.removeItem("user")
      this.isAuthenticated = false;
      this.user = null;
      
    },
    checkLogin() {
      if(JSON.parse(localStorage.getItem("user"))) {
        this.isAuthenticated = true
        navigateTo('/')
      }
    }
  },
});
