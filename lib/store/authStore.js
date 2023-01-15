import create from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  logIn: (user) =>
    set(() => ({
      user: user,
    })),
  logOut: () =>
    set((state) => ({
      user: null,
    })),
}));

export default useAuthStore;
