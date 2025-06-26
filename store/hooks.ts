import { useDispatch, useSelector, useStore } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// Typescript will now know about the types of `dispatch` and `state`
// export const useAppDispatch = useDispatch.withTypes();
// export const useAppSelector = useSelector.withTypes();
// export const useAppStore = useStore.withTypes();

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
