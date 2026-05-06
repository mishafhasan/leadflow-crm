import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Lead, Note } from '@/types';
import { initialLeads, initialNotes, users } from '@/utils/data';

interface LeadsContextType {
  leads: Lead[];
  notes: Note[];
  addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => Lead;
  updateLead: (id: string, data: Partial<Lead>) => Lead | null;
  deleteLead: (id: string) => boolean;
  addNote: (leadId: string, content: string, userId: string) => Note;
  getLeadNotes: (leadId: string) => Note[];
  getLeadById: (id: string) => Lead | undefined;
  getUserName: (userId: string) => string;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

let leadIdCounter = initialLeads.length + 1;
let noteIdCounter = initialNotes.length + 1;

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const getUserName = useCallback((userId: string): string => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  }, []);

  const addLead = useCallback((leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Lead => {
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...leadData,
      id: `l${leadIdCounter++}`,
      created_at: now,
      updated_at: now,
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  }, []);

  const updateLead = useCallback((id: string, data: Partial<Lead>): Lead | null => {
    let updated: Lead | null = null;
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        updated = { ...l, ...data, updated_at: new Date().toISOString() };
        return updated;
      }
      return l;
    }));
    return updated;
  }, []);

  const deleteLead = useCallback((id: string): boolean => {
    const exists = leads.some(l => l.id === id);
    if (!exists) return false;
    setLeads(prev => prev.filter(l => l.id !== id));
    setNotes(prev => prev.filter(n => n.lead_id !== id));
    return true;
  }, [leads]);

  const addNote = useCallback((leadId: string, content: string, userId: string): Note => {
    const newNote: Note = {
      id: `n${noteIdCounter++}`,
      lead_id: leadId,
      content,
      created_by: userId,
      created_at: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return { ...newNote, created_by_name: getUserName(userId) };
  }, [getUserName]);

  const getLeadNotes = useCallback((leadId: string): Note[] => {
    return notes
      .filter(n => n.lead_id === leadId)
      .map(n => ({ ...n, created_by_name: getUserName(n.created_by) }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [notes, getUserName]);

  const getLeadById = useCallback((id: string): Lead | undefined => {
    return leads.find(l => l.id === id);
  }, [leads]);

  const value = useMemo(() => ({
    leads,
    notes,
    addLead,
    updateLead,
    deleteLead,
    addNote,
    getLeadNotes,
    getLeadById,
    getUserName,
  }), [leads, notes, addLead, updateLead, deleteLead, addNote, getLeadNotes, getLeadById, getUserName]);

  return (
    <LeadsContext.Provider value={value}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads(): LeadsContextType {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider');
  return ctx;
}
