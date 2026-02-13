"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { transversalService } from "@/lib/services/transversal";
import { Option, SearchOption } from "@/interfaces/form";
import { phoneCodesItems  } from "@/lib/constants/phone_code";


interface ConfigDataContextType {
  documentTypes: Option[];
  businessTypes: Option[];
  businessSeniority: Option[];
  cities: Option[];
  phoneCodes: Option[];
  loading: boolean;
}

const ConfigDataContext = createContext<ConfigDataContextType | undefined>(undefined);

export function ConfigDataProvider({ children }: { children: React.ReactNode }) {
  const [documentTypes, setDocumentTypes] = useState<Option[]>([]);
  const [businessTypes, setBusinessTypes] = useState<Option[] | SearchOption[]>([]);
  const [businessSeniority, setBusinessSeniority] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [phoneCodes, setPhoneCodes] = useState(phoneCodesItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        // Cargamos los datos estáticos del servicio
        const docs = transversalService.getAllDocumentTypes();
        const busSeniority = transversalService.getAllBusinessSeniority();
        const cities = transversalService.getAllCities(1);
        const ciiu = transversalService.getAllCiiuCodes();
        setCities(cities);
        setDocumentTypes(docs);
        setBusinessTypes(ciiu);
        setBusinessSeniority(busSeniority);
       
      } catch (error) {
        console.error("Failed to load configuration data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

 

 

  const value = {
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    phoneCodes,
    loading,
  };

  return (
    <ConfigDataContext.Provider value={value}>
      {children}
    </ConfigDataContext.Provider>
  );
}

export function useConfigData() {
  const context = useContext(ConfigDataContext);
  if (context === undefined) {
    throw new Error("useConfigData must be used within a ConfigDataProvider");
  }
  return context;
}