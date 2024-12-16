import React, {
  type PropsWithChildren,
  createContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { ApiService } from '@hr-app/hr-services';
import { Department } from '@hr-app/shared-types';

export interface AppState {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDepartments: () => Promise<void>;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const apiService = new ApiService();

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const departmentsData = await apiService.getDepartments();
      setDepartments(departmentsData);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      departments,
      setDepartments,
      loading,
      setLoading,
      fetchDepartments,
    }),
    [departments, loading, fetchDepartments]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
