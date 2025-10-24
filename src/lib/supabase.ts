import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      forms: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          schema: FormSchema;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string;
          schema: FormSchema;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          schema?: FormSchema;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          form_id: string;
          user_id: string | null;
          data: Record<string, any>;
          created_at: string;
        };
        Insert: {
          id?: string;
          form_id: string;
          user_id?: string | null;
          data: Record<string, any>;
          created_at?: string;
        };
        Update: {
          id?: string;
          form_id?: string;
          user_id?: string | null;
          data?: Record<string, any>;
          created_at?: string;
        };
      };
    };
  };
};

export type FormFieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'date';

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormSchema {
  fields: FormField[];
}

export type Form = Database['public']['Tables']['forms']['Row'];
export type Submission = Database['public']['Tables']['submissions']['Row'];
