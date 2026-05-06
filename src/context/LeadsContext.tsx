import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Lead, Note } from '@/types';
import { leadsApi, notesApi } from '@/services/api';

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  fetchLeads: (filters?: Record<string, string>) => Promise<void>;
  addLead: (data: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => Promise<Lead>;
  updateLead: (id: string, data: Partial<Lead>) => Promise<Lead | null>;
  deleteLead: (id: string) => Promise<boolean>;
  addNote: (leadId: string, content: string) => Promise<Note>;
  getLeadNotes: (leadId: string) => Promise<Note[]>;
  getLeadById: (id: string) => Promise<Lead | undefined>;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = useCallback(async (filters?: Record<string, string>) => {
    setLoading(true);
    try {
      const data = await leadsApi.getAll(filters);
      setLeads(data.leads);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addLead = useCallback(async (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> => {
    const data = await leadsApi.create(leadData);
    setLeads(prev => [data.lead, ...prev]);
    return data.lead;
  }, []);

  const updateLead = useCallback(async (id: string, leadData: Partial<Lead>): Promise<Lead | null> => {
    const data = await leadsApi.update(id, leadData);
    setLeads(prev => prev.map(l => l.id === id ? data.lead : l));
    return data.lead;
  }, []);

  const deleteLead = useCallback(async (id: string): Promise<boolean> => {
    await leadsApi.delete(id);
    setLeads(prev => prev.filter(l => l.id !== id));
    return true;
  }, []);

  const getLeadById = useCallback(async (id: string): Promise<Lead | undefined> => {
    const data = await leadsApi.getById(id);
    return data.lead;
  }, []);

  const getLeadNotes = useCallback(async (leadId: string): Promise<Note[]> => {
    const data = await notesApi.getByLead(leadId);
    return data.notes;
  }, []);

  const addNote = useCallback(async (leadId: string, content: string): Promise<Note> => {
    const data = await notesApi.add(leadId, content);
    return data.note;
  }, []);

  return (
    <LeadsContext.Provider value={{
      leads, loading, fetchLeads, addLead, updateLead,
      deleteLead, addNote, getLeadNotes, getLeadById,
    }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads(): LeadsContextType {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider');
  return ctx;
}
