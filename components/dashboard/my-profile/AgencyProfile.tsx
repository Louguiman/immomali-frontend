"use client";
import React from "react";
import { useSelector } from "react-redux";
import AgencyProfileForm from "./AgencyProfileForm";

type Agency = {
  id: string | number;
  // Add other fields as needed
};

type User = {
  agency?: Agency;
  // Add other fields as needed
};

const AgencyProfile: React.FC = () => {
  const user: User | null = useSelector((state: { auth: { user: User | null } }) => state.auth.user); // Récupérer l'utilisateur connecté

  if (!user) {
    return <div>No user...</div>; // Gérer le cas où l'utilisateur n'est pas encore chargé
  }
  if (!user?.agency) {
    return <div>No agency...</div>; // Gérer le cas où l'utilisateur n'a pas d'agence
  }
  // Vérifier si l'utilisateur a une agence avant de rendre le formulaire
  return <AgencyProfileForm agencyId={user?.agency?.id} />;
}

export default AgencyProfile;
