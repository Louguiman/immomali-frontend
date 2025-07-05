import { useDispatch, useSelector, useStore } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useAppSelector`
// Typescript will now know about the types of `dispatch` and `state`
// export const useAppDispatch = useDispatch.withTypes();
// export const useAppSelector = useAppSelector.withTypes();
// export const useAppStore = useStore.withTypes();

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
